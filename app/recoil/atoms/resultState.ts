import { atom } from 'recoil';
import { ResultDto } from '../../electron/quiz/quiz.entity';

export const resultState = atom<ResultDto | null>({
  key: 'resultState',
  default: null,
});
