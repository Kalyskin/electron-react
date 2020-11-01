import { CreateQuizEntity, QuizCategory } from './quiz.entity';
import { QuizService } from './quiz.service';
import { Controller, IpcRequest } from '../libs/decorators';

@Controller('quiz')
export class QuizController {
  constructor(private readonly quizService: QuizService) {}

  @IpcRequest('/find-by-category')
  findByCategory(category: QuizCategory) {
    console.log('category', category);
    return this.quizService.findByCategory(category);
  }

  @IpcRequest('/create')
  create(dto: CreateQuizEntity) {
    return this.quizService.create(dto);
  }
}
