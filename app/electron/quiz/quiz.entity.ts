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

export interface UserEntity {
  id: number;
  image: string;
  full_name: string;
  rank: string;
  kpp: string;
}

export interface QuizAnswerEntity {
  questionId: number;
  checkedOptions: string[];
}

export type CreateQuizEntity = Omit<QuizEntity, 'id'>;
export type UpdateQuizEntity = Omit<QuizEntity, 'id'>;
export type CreateUserEntity = Omit<UserEntity, 'id'>;

export type UserDto = Omit<UserEntity, 'id' | 'image'>;

export interface CreateUserDto {
  imageData: string;
  userDto: UserDto;
}
