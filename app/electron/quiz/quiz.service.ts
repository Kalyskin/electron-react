import { v4 as uuidv4 } from 'uuid';
import path from 'path';
import { QuizRepository } from './quiz.repository';
import {
  CreateQuizEntity,
  CreateUserDto,
  QuizCategory,
  UpdateQuizEntity,
} from './quiz.entity';
import { saveBase64File } from '../utils/file';
import { USER_IMAGES_PATH } from '../config';

export class QuizService {
  constructor(private readonly repository: QuizRepository) {}

  findByCategory(category: QuizCategory) {
    return this.repository.findByCategory(category);
  }

  createQuiz(dto: CreateQuizEntity) {
    return this.repository.createQuiz(dto);
  }

  updateQuiz(id: number, dto: UpdateQuizEntity) {
    return this.repository.updateQuiz(id, dto);
  }

  deleteQuestion(id: number) {
    return this.repository.deleteQuestion(id);
  }

  async createUser(dto: CreateUserDto) {
    const fileName = `${uuidv4()}.png`;
    const imagePath = path.join(USER_IMAGES_PATH, fileName);
    await saveBase64File(dto.imageData, imagePath);
    return this.repository.createUser({
      full_name: dto.userDto.full_name,
      rank: dto.userDto.rank,
      kpp: dto.userDto.kpp,
      image: fileName,
    });
  }
}
