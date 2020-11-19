import { atom, selector } from 'recoil';
import { QuizCategory, QuizEntity } from '../../electron/quiz/quiz.entity';
import { ipcRequest } from '../../utils/ipcRenderer';
import { shuffle } from '../../utils/array';

export interface CurrentSessionState {
  category: QuizCategory;
  userId: number;
}

export const currentSessionState = atom<CurrentSessionState>({
  key: 'currentSessionState',
  default: {
    category: QuizCategory.NONE,
    userId: 0,
  },
});

export const currentQuestionIndexState = atom<number>({
  key: 'currentQuestionIndexState',
  default: 0,
});

export const questionsState = selector<QuizEntity[]>({
  key: 'questionsState',
  get: async ({ get }) => {
    const currentSession = get(currentSessionState);
    if (currentSession.category === QuizCategory.NONE) return [];
    const questions = await ipcRequest<QuizEntity[]>(
      'quiz/find-by-category',
      currentSession.category
    );
    return shuffle<QuizEntity>(questions);
  },
});

export const currentQuizState = selector<QuizEntity>({
  key: 'currentQuizState',
  get: ({ get }) => {
    const questions = get(questionsState);
    const index = get(currentQuestionIndexState);
    return questions[index];
  },
});
