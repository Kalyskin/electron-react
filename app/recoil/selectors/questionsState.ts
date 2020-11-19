import { atom, selector } from 'recoil';
import { QuizCategory, QuizEntity } from '../../electron/quiz/quiz.entity';
import { ipcRequest } from '../../utils/ipcRenderer';
import { shuffle } from '../../utils/array';

export const currentCategoryState = atom<QuizCategory | null>({
  key: 'currentCategoryState',
  default: null,
});

export const currentQuestionIndexState = atom<number>({
  key: 'currentQuestionIndexState',
  default: 0,
});

export const questionsState = selector<QuizEntity[]>({
  key: 'questionsState',
  get: async ({ get }) => {
    const currentCategory = get(currentCategoryState);
    if (currentCategory) {
      const questions = await ipcRequest<QuizEntity[]>(
        'quiz/find-by-category',
        currentCategory
      );
      return shuffle<QuizEntity>(questions);
    }
    return [];
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
