import { useRecoilState, useRecoilValue } from 'recoil';
import {
  currentQuestionIndexState,
  currentSessionState,
  questionsState,
} from '../recoil/selectors/questionsState';
import { answersState } from '../recoil/atoms/answersState';
import { QuizAnswerEntity, QuizEntity } from '../electron/quiz/quiz.entity';
import { ipcRequest } from '../utils/ipcRenderer';

export const useQuiz = () => {
  const questions = useRecoilValue(questionsState);
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
