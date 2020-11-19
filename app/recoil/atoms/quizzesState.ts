import { atom } from 'recoil';
import { QuizCategory, QuizEntity } from '../../electron/quiz/quiz.entity';

interface QuizzesState {
  items: QuizEntity[];
  category: QuizCategory;
  page: number;
  loading: boolean;
  rowsPerPage: number;
}

export const quizzesState = atom<QuizzesState>({
  key: 'quizzesState',
  default: {
    items: [],
    category: QuizCategory.PT,
    page: 1,
    loading: false,
    rowsPerPage: 10,
  },
});
