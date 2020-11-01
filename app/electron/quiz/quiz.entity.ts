export interface QuizOption {
  text: string;
  score: number;
}
export enum QuizCategory {
  PT = 'PD',
  DTC = 'DTC',
}

export interface QuizEntity {
  id: number;
  category: QuizCategory;
  question: string;
  options: QuizOption[];
}

export type CreateQuizEntity = Omit<QuizEntity, 'id'>;
