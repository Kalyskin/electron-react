import { useRecoilState, useRecoilValue } from 'recoil';
import {
  currentQuestionIndexState,
  questionsState,
} from '../recoil/selectors/questionsState';
import { answersState } from '../recoil/atoms/answersState';
import { QuizAnswerEntity } from '../electron/quiz/quiz.entity';

export const useQuiz = () => {
  const questions = useRecoilValue(questionsState);
  const [quizIndex, setQuizIndex] = useRecoilState(currentQuestionIndexState);
  const [answers, setAnswersState] = useRecoilState(answersState);
  const currentQuiz = questions[quizIndex] || null;
  const answer: QuizAnswerEntity = answers[currentQuiz.id] || {
    questionId: currentQuiz.id,
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

  const nextQuestion = () => {
    if (quizIndex + 1 < questions.length) {
      setQuizIndex(quizIndex + 1);
    }
  };

  const prevQuestion = () => {
    if (quizIndex > 0) {
      setQuizIndex(quizIndex - 1);
    }
  };

  console.log('answer', answer);

  return {
    toggleOption,
    nextQuestion,
    prevQuestion,
    isCheckedOption,
    currentQuiz,
  };
};
