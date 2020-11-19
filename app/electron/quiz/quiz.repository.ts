import * as Knex from 'knex';
import {
  CreateQuizEntity,
  CreateUserEntity,
  QuizCategory,
  QuizEntity,
  QuizOption,
  UpdateQuizEntity,
} from './quiz.entity';

export class QuizRepository {
  private readonly QUIZ_TABLE_NAME = 'quiz';

  private readonly USER_TABLE_NAME = 'user';

  constructor(private readonly db: Knex) {}

  async findByCategory(category: QuizCategory): Promise<QuizEntity[]> {
    const data = await this.db(this.QUIZ_TABLE_NAME).where(
      'category',
      category
    );
    return data.map((item) => {
      return {
        id: <number>item.id,
        category: <QuizCategory>item.category,
        question: <string>item.question,
        options: <QuizOption[]>JSON.parse(item.options),
      };
    });
  }

  async createQuiz(dto: CreateQuizEntity): Promise<number> {
    const [id] = await this.db(this.QUIZ_TABLE_NAME).insert({
      ...dto,
      options: JSON.stringify(dto.options),
    });
    return id;
  }

  async updateQuiz(id: number, dto: UpdateQuizEntity): Promise<void> {
    await this.db(this.QUIZ_TABLE_NAME)
      .where('id', id)
      .update({
        ...dto,
        options: JSON.stringify(dto.options),
      });
  }

  async createUser(dto: CreateUserEntity): Promise<number> {
    const [id] = await this.db(this.USER_TABLE_NAME).insert({
      ...dto,
    });
    return id;
  }

  async deleteQuestion(id: number): Promise<void> {
    await this.db(this.QUIZ_TABLE_NAME).where('id', id).delete();
  }
}
