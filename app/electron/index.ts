import 'reflect-metadata';
import Knex from 'knex';
import { QuizRepository } from './quiz/quiz.repository';
import { QuizService } from './quiz/quiz.service';
import { QuizController } from './quiz/quiz.controller';
import { RouteDefinition } from './libs/RouteDefinition';

const { ipcMain } = require('electron');

export default function startApp(db: Knex) {
  const quizRepository = new QuizRepository(db);
  const quizService = new QuizService(quizRepository);

  [QuizController].forEach((Controller) => {
    // This is our instantiated class
    const instance = new Controller(quizService);
    // The prefix saved to our controller
    const prefix = Reflect.getMetadata('prefix', Controller);
    // Our `routes` array containing all our routes for this controller
    const routes: Array<RouteDefinition> = Reflect.getMetadata(
      'routes',
      Controller
    );

    routes.forEach((route) => {
      const channel = `${prefix}${route.path}`;
      ipcMain.on(`${channel}-message`, (event, data) => {
        const result = instance[route.methodName](JSON.parse(data));

        if (result instanceof Promise) {
          result
            .then((res: never) => {
              console.log(`${channel}-reply`, JSON.stringify(res));
              event.reply(`${channel}-reply`, JSON.stringify(res));
              return res;
            })
            .catch((error) => {
              console.log(`${channel}-error`, JSON.stringify(error));
              event.reply(`${channel}-error`, JSON.stringify(error));
            });
        } else {
          console.log(`${channel}-reply`, JSON.stringify(result));
          event.reply(`${channel}-reply`, JSON.stringify(result));
        }
      });
    });
  });
}
