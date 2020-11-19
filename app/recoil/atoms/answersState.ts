import { atom } from 'recoil';
import { QuizAnswerEntity } from '../../electron/quiz/quiz.entity';

export interface AnswersState {
  [id: number]: QuizAnswerEntity;
}

export const answersState = atom<AnswersState>({
  key: 'answersState',
  default: {},
});
