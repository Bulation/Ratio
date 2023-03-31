import Timer from './timer.js';
import UserController from './userController.js';
import Express, { Router } from 'express';
import mongodb from 'mongodb';

export class UserRouter {
  userRouter: Router;
  constructor(db: mongodb.Db) {
    const controller = new UserController(new Timer(), db); // инициализация контроллера, с передачей ему таймера и базы данных
    this.userRouter = Express.Router(); // создание роутера
    this.userRouter.post('/record', controller.addUser.bind(controller)); // обработка пост и гет запросов по указанным путям методами контроллера
    this.userRouter.post('/timer', controller.initTimer.bind(controller));
    this.userRouter.get('/record', controller.getUsers.bind(controller));
  }
}
