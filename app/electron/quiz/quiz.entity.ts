export interface QuizOption {
  text: string;
  score: number;
}
export enum QuizCategory {
  PT = 'PD',
  DTC = 'DTC',
  NONE = 'NONE',
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
  userId: number;
  questionId: number;
  checkedOptions: string[];
}

export enum SettingType {
  NUMBER = 'NUMBER',
  STRING = 'STRING',
  JSON = 'JSON',
}

export interface SettingEntity {
  name: string;
  value: string;
  title: string;
  type: SettingType;
}

export interface UpdateSettingEntity {
  name?: string;
  value?: string;
  title?: string;
  type?: SettingType;
}

export type CreateQuizEntity = Omit<QuizEntity, 'id'>;
export type UpdateQuizEntity = Omit<QuizEntity, 'id'>;
export type CreateUserEntity = Omit<UserEntity, 'id'>;

export type UserDto = Omit<UserEntity, 'id' | 'image'>;

export interface CreateUserDto {
  imageData: string;
  userDto: UserDto;
}

export interface ResultDto {
  user: UserEntity;
  category: QuizCategory;
  point: number;
  totalPoint: number;
  percent: number;
}
