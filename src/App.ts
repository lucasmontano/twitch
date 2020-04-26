import express, { Application } from 'express';
import cors from 'cors';
import morgan from 'morgan';
import routes from './routes';

/**
 * @class App
 */
export default class App {
  private app: Application | any;

  public constructor(express: Application | any) {
    this.app = express();

    this.middlewares();
  }

  public get getApp(): Application {
    return this.app;
  }

  private middlewares(): void {
    this.app.use(express.json());
    this.app.use(morgan('dev'));
    this.app.use(cors());
    this.app.use(routes);
  }
}
