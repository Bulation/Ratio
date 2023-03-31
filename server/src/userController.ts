import Timer from './timer.js';
import mongodb, { ObjectId } from 'mongodb';
import { Response, Request } from 'express';

export default class UserController {
  timer: Timer;
  db: mongodb.Db;
  constructor(timer: Timer, db: mongodb.Db) {
    this.timer = timer;
    this.timer.startTimer();
    this.db = db;
  }

  async addUser(request: Request, response: Response) {
    const collection = this.db.collection('users'); // получение коллекции из бд
    if (!this.isUserValid(request.body.user)) {
      // если имя пользователя не прошло валидацию, то отправляем 400 статус
      response.sendStatus(400);
      return;
    }
    const userObj = {
      // создание объекта для сохранения данных в бд
      _id: new ObjectId(),
      user: request.body.user,
      time: this.timer.stopTimer()
    };
    await collection.insertOne(userObj); // вставка объекта в бд
    response.send(userObj); // отправляем на фронт созданный объект
  }

  isUserValid(username: string) {
    return username.length >= 2 && typeof username === 'string';
  }

  async getUsers(request: Request, response: Response) {
    const collection = this.db.collection('users');
    const res = await collection.find().toArray();
    response.send(res);
  }

  initTimer(request: Request, response: Response) {
    if (isNaN(Number(request.body.time))) {
      // если пришедшее время не является числом, то отправляем 400 статус
      response.sendStatus(400);
      return;
    }
    this.timer.stopTimer();
    this.timer.startTimer(Number(request.body.time)); // инициализация таймера с пришедшим начальным временем
  }
}
