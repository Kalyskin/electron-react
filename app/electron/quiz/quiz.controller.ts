import {
  CreateQuizEntity,
  CreateUserDto,
  QuizAnswerEntity,
  QuizCategory,
  UpdateQuizEntity,
  UpdateSettingEntity,
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

  @IpcRequest('/get-by-category')
  getByCategory(category: QuizCategory) {
    return this.quizService.getByCategory(category);
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

  @IpcRequest('/save-answers')
  async saveAnswers(answers: QuizAnswerEntity[]) {
    await this.quizService.createAnswers(answers);
  }

  @IpcRequest('/result')
  result({ userId, category }: { userId: number; category: QuizCategory }) {
    return this.quizService.getResult(userId, category);
  }

  @IpcRequest('/sav-settings')
  async saveSettings(settingEntities: UpdateSettingEntity[]) {
    await Promise.all(
      settingEntities.map(async (setting) => {
        await this.quizService.setSetting(setting);
      })
    );
  }

  @IpcRequest('/settings')
  settings() {
    return this.quizService.findSettings();
  }

  @IpcRequest('/category-settings')
  async getSetting(category: QuizCategory) {
    if (category === QuizCategory.PT) {
      return {
        questionCount: await this.quizService.getSetting('PD_QUESTION_COUNT'),
        minutes: await this.quizService.getSetting('PD_QUIZ_TIME_MINUTES'),
      };
    }
    if (category === QuizCategory.DTC) {
      return {
        questionCount: await this.quizService.getSetting('DTC_QUESTION_COUNT'),
        minutes: await this.quizService.getSetting('DTC_QUIZ_TIME_MINUTES'),
      };
    }
    return null;
  }
}
