import { atom } from 'recoil';
import { QuizCategory, QuizEntity } from '../../electron/quiz/quiz.entity';

export const quizState = atom<QuizEntity>({
  key: 'quizState',
  default: {
    id: 0,
    category: QuizCategory.PT,
    question: '',
    options: [],
  },
});
