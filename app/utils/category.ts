import { QuizCategory } from '../electron/quiz/quiz.entity';

export const categoryTitle = (category: QuizCategory) => {
  switch (category) {
    case QuizCategory.PT:
      return 'Проверка документов (ПД)';
    case QuizCategory.DTC:
      return 'Досмотр транспортных средств (ДТС)';
    default:
      return '';
  }
};
