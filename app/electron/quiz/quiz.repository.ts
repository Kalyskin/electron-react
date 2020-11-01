import * as Knex from 'knex';
import {
  CreateQuizEntity,
  QuizCategory,
  QuizEntity,
  QuizOption,
} from './quiz.entity';

export class QuizRepository {
  private readonly TABLE_NAME = 'quiz';

  constructor(private readonly db: Knex) {}

  async findByCategory(category: QuizCategory): Promise<QuizEntity[]> {
    const data = await this.db(this.TABLE_NAME).where('category', category);
    return data.map((item) => {
      return {
        id: <number>item.id,
        category: <QuizCategory>item.category,
        question: <string>item.question,
        options: <QuizOption[]>JSON.parse(item.options),
      };
    });
  }

  async create(dto: CreateQuizEntity): Promise<number> {
    const [id] = await this.db(this.TABLE_NAME).insert({
      ...dto,
      options: JSON.stringify(dto.options),
    });
    return id;
  }
}
