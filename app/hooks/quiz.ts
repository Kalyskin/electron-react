import { useRecoilState, useRecoilValue } from 'recoil';
import { useCallback, useEffect } from 'react';
import {
  currentQuestionIndexState,
  currentSessionState,
  questionsState,
  quizSettingsState,
} from '../recoil/selectors/questionsState';
import { answersState } from '../recoil/atoms/answersState';
import { QuizAnswerEntity, QuizEntity } from '../electron/quiz/quiz.entity';
import { ipcRequest } from '../utils/ipcRenderer';
import { useTimer } from './timer';
import { useRouter } from './router';
import routes from '../constants/routes.json';

const buildResultPageUrl = (userId: number, category: string) => {
  return routes.RESULT.replace(':userId', String(userId)).replace(
    ':categoryId',
    category
  );
};

export const useQuiz = () => {
  const { navigate } = useRouter();
  const questions = useRecoilValue(questionsState);
  const { minutes } = useRecoilValue(quizSettingsState);
  const currentSession = useRecoilValue(currentSessionState);
  const [quizIndex, setQuizIndex] = useRecoilState(currentQuestionIndexState);
  const [answers, setAnswersState] = useRecoilState(answersState);
  const currentQuiz = questions[quizIndex] || null;
  const answer: QuizAnswerEntity = (currentQuiz && answers[currentQuiz.id]) || {
    userId: currentSession.userId,
    questionId: (currentQuiz && currentQuiz.id) || 0,
    checkedOptions: [],
  };

  const isCheckedOption = (option: string) => {
    return answer.checkedOptions.indexOf(option) > -1;
  };

  const toggleOption = (option: string) => {
    let checkedOptions;
    if (isCheckedOption(option)) {
      checkedOptions = answer.checkedOptions.filter(
        (_option) => _option !== option
      );
    } else {
      checkedOptions = [...answer.checkedOptions, option];
    }

    setAnswersState({
      ...answers,
      [currentQuiz.id]: {
        ...answer,
        checkedOptions,
      },
    });
  };

  const hasNext = () => quizIndex + 1 < questions.length;
  const hasPrev = () => quizIndex > 0;

  const nextQuestion = () => {
    if (hasNext()) {
      setQuizIndex(quizIndex + 1);
      setAnswersState({
        ...answers,
        [currentQuiz.id]: answer,
      });
    }
  };

  const prevQuestion = () => {
    if (hasPrev()) {
      setQuizIndex(quizIndex - 1);
    }
  };

  const saveAnswers = async () => {
    const answersLocal = {
      ...answers,
      [currentQuiz.id]: answer,
    };
    setAnswersState(answersLocal);
    await ipcRequest<QuizEntity[]>(
      'quiz/save-answers',
      Object.values(answersLocal)
    );
  };

  const onTimeIsUp = useCallback(async () => {
    const answersLocal = {
      ...answers,
      [currentQuiz.id]: answer,
    };
    questions.forEach((q) => {
      if (typeof answersLocal[q.id] === 'undefined') {
        answersLocal[q.id] = {
          userId: currentSession.userId,
          questionId: q.id,
          checkedOptions: [],
        };
      }
    });
    setAnswersState(answersLocal);
    await ipcRequest<QuizEntity[]>(
      'quiz/save-answers',
      Object.values(answersLocal)
    );
    navigate(
      buildResultPageUrl(currentSession.userId, currentSession.category)
    );
  }, [
    navigate,
    setAnswersState,
    currentSession,
    currentQuiz,
    answers,
    answer,
    questions,
  ]);

  const { start } = useTimer(onTimeIsUp);

  useEffect(() => {
    start(minutes);
  }, [start, minutes]);

  return {
    hasPrev,
    hasNext,
    toggleOption,
    nextQuestion,
    prevQuestion,
    isCheckedOption,
    saveAnswers,
    currentQuiz,
    currentSession,
  };
};
