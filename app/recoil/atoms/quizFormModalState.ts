import { atom } from 'recoil';

interface QuizFormModalState {
  open: boolean;
}

export const quizFormModalState = atom<QuizFormModalState>({
  key: 'quizFormModalState',
  default: {
    open: false,
  },
});
