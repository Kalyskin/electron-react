import { atom } from 'recoil';

interface QuizFormModalState {
  open: boolean;
  edit: boolean;
}

export const quizFormModalState = atom<QuizFormModalState>({
  key: 'quizFormModalState',
  default: {
    open: false,
    edit: false,
  },
});
