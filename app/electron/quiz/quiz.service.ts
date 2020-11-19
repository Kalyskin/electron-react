import { v4 as uuidv4 } from 'uuid';
import path from 'path';
import { QuizRepository } from './quiz.repository';
import {
  CreateQuizEntity,
  CreateUserDto,
  QuizAnswerEntity,
  QuizCategory,
  ResultDto,
  UpdateQuizEntity,
} from './quiz.entity';
import { readBase64Image, saveBase64File } from '../utils/file';
import { USER_IMAGES_PATH } from '../config';

export class QuizService {
  constructor(private readonly repository: QuizRepository) {}

  findByCategory(category: QuizCategory) {
    return this.repository.findQuestionsByCategory(category);
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

  async createAnswers(answers: QuizAnswerEntity[]) {
    await this.repository.removeAnswers(answers);
    await this.repository.createAnswers(answers);
  }

  async getResult(userId: number, category: QuizCategory): Promise<ResultDto> {
    const user = await this.repository.findUserById(userId);
    const answers = await this.repository.findAnswersUserById(userId);
    const questions = await this.repository.findQuestionsByIds(
      answers.map((a) => a.questionId)
    );
    const answersMap = answers.reduce((acc, item) => {
      acc[item.questionId] = item;
      return acc;
    }, {});

    let point = 0;
    const totalPoint = questions.length;

    questions.forEach((q) => {
      const answer: QuizAnswerEntity = answersMap[q.id];
      const optionPoint = q.options.reduce((sum, o) => sum + o.score, 0);
      const correct = q.options.reduce((sum, o) => {
        if (answer.checkedOptions.indexOf(o.text) > -1 && o.score > 0) {
          return sum + 1;
        }
        return sum;
      }, 0);
      const incorrect = q.options.reduce((sum, o) => {
        if (answer.checkedOptions.indexOf(o.text) > -1 && o.score <= 0) {
          return sum + 1;
        }
        return sum;
      }, 0);
      const userPoint = Math.max(correct - incorrect, 0);
      point += userPoint / optionPoint;
    });

    return {
      user: {
        ...user,
        image: await readBase64Image(path.join(USER_IMAGES_PATH, user.image)),
      },
      category,
      point: Math.max(point, 0),
      totalPoint: Math.max(totalPoint, 0),
      percent: Math.max((point / totalPoint) * 100, 0),
    };
  }
}
