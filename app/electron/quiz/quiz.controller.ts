import {
  CreateQuizEntity,
  CreateUserDto,
  QuizCategory,
  UpdateQuizEntity,
} from './quiz.entity';
import { QuizService } from './quiz.service';
import { Controller, IpcRequest } from '../libs/decorators';

@Controller('quiz')
export class QuizController {
  constructor(private readonly quizService: QuizService) {}

  @IpcRequest('/find-by-category')
  findByCategory(category: QuizCategory) {
    return this.quizService.findByCategory(category);
  }

  @IpcRequest('/create')
  createQuestion(dto: CreateQuizEntity) {
    return this.quizService.createQuiz(dto);
  }

  @IpcRequest('/create-user')
  uploadImage(dto: CreateUserDto) {
    return this.quizService.createUser(dto);
  }

  @IpcRequest('/delete-question')
  async deleteQuestion(id: number) {
    await this.quizService.deleteQuestion(id);
  }

  @IpcRequest('/update-question')
  async updateQuestion({ id, dto }: { id: number; dto: UpdateQuizEntity }) {
    await this.quizService.updateQuiz(id, dto);
  }
}
