import * as Knex from 'knex';
import {
  CreateQuizEntity,
  CreateUserEntity,
  QuizAnswerEntity,
  QuizCategory,
  QuizEntity,
  QuizOption,
  SettingEntity,
  UpdateQuizEntity,
  UpdateSettingEntity,
  UserEntity,
} from './quiz.entity';

export class QuizRepository {
  private readonly QUIZ_TABLE_NAME = 'quiz';

  private readonly USER_TABLE_NAME = 'user';

  private readonly ANSWER_TABLE_NAME = 'answer';

  private readonly SETTING_TABLE_NAME = 'setting';

  constructor(private readonly db: Knex) {}

  async findAllQuestionsIds(category: QuizCategory): Promise<number[]> {
    const data = await this.db(this.QUIZ_TABLE_NAME)
      .where('category', category)
      .select('id');
    return data.map((item) => {
      return Number(item.id);
    });
  }

  async findQuestionsByCategory(category: QuizCategory): Promise<QuizEntity[]> {
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

  async findQuestionsByIds(ids: number[]): Promise<QuizEntity[]> {
    const data = await this.db(this.QUIZ_TABLE_NAME).whereIn('id', ids);
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

  async createAnswers(answers: QuizAnswerEntity[]): Promise<void> {
    await this.db(this.ANSWER_TABLE_NAME).insert(
      answers.map(({ checkedOptions, questionId, userId }) => ({
        checkedOptions: JSON.stringify(checkedOptions),
        questionId,
        userId,
      }))
    );
  }

  async removeAnswers(answers: QuizAnswerEntity[]): Promise<void> {
    await Promise.all(
      answers.map(async (answer) => {
        await this.db(this.ANSWER_TABLE_NAME)
          .where('userId', answer.userId)
          .andWhere('questionId', answer.questionId)
          .delete();
      })
    );
  }

  findUserById(userId: number): Promise<UserEntity> {
    return this.db(this.USER_TABLE_NAME).where('id', userId).first();
  }

  findAnswersUserById(userId: number): Promise<QuizAnswerEntity[]> {
    return this.db(this.ANSWER_TABLE_NAME).where('userId', userId);
  }

  findOneSetting(name: string): Promise<SettingEntity> {
    return this.db(this.SETTING_TABLE_NAME)
      .where('name', name)
      .select('*')
      .first();
  }

  async findSettings(): Promise<SettingEntity[]> {
    const data = await this.db(this.SETTING_TABLE_NAME).select('*');
    return data.map(({ type, name, title, value }) => ({
      type,
      name,
      title,
      value,
    }));
  }

  async createOrUpdateSetting(
    dto: UpdateSettingEntity
  ): Promise<QuizAnswerEntity[]> {
    const setting = await this.findOneSetting(dto.name);
    if (setting) {
      return this.db(this.SETTING_TABLE_NAME)
        .where('name', dto.name)
        .update(dto);
    }
    return this.db(this.SETTING_TABLE_NAME).insert(dto);
  }
}
