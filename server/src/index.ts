import mongodb from 'mongodb';
import { Application } from 'express';
import Express from 'express';
import { UserRouter } from './userRouter.js';
import { API_URL, DB_NAME, LOGIN, PASSWORD, PORT } from './constants.js';


export default class Server {
  dbUrl: string;
  port: number;
  app: Application;
  dbName: string;
  db: mongodb.Db;
  constructor(login: string, password: string, port: number, dbName: string) {
    this.dbUrl = `mongodb+srv://${login}:${password}@cluster0.esnvgwf.mongodb.net/test`;
    this.port = port;
    this.app = Express();
    this.app.use(Express.json()); // функция для парсинга приходящих данных в json формате
    this.app.use((req, res, next) => { // инициализация хедеров для разрешения запросов с любых доменов
      res.header('Access-Control-Allow-Origin', '*');
      res.header(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept, Authorization'
      );
      next(); // вызов следующей мидлвар функции
    });
    this.dbName = dbName;
    this.startServer()
  }

  startServer() {
    const mongoClient = new mongodb.MongoClient(this.dbUrl); // создание объекта, содержащего настройки подключения к mongodb
    mongoClient.connect().then((client) => { // подключение к mongodb 
      const dbName = this.dbName;
      const db = client.db(dbName); // подключение к бд
      this.app.listen(this.port); // разворачивание приложения на порту
      this.app.use(API_URL, new UserRouter(db).userRouter); // привязывание роутера по указанному пути
      this.app.use((req, res) => { // привязывание функции, отдающей ошибку 404, если произошел запрос по неверному урл
        res.status(404).send('Not Found');
      });
    }).catch((e) => console.error(e));
  }
}

new Server(LOGIN, PASSWORD, PORT, DB_NAME);