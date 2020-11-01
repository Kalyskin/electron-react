import { QuizRepository } from './quiz.repository';
import { CreateQuizEntity, QuizCategory } from './quiz.entity';

export class QuizService {
  constructor(private readonly repository: QuizRepository) {}

  findByCategory(category: QuizCategory) {
    return this.repository.findByCategory(category);
  }

  create(dto: CreateQuizEntity) {
    return this.repository.create(dto);
  }
}
