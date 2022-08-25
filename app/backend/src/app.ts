import * as express from 'express';
import 'express-async-errors';
import ErrorInterface from './interfaces/errorInterface';
import ThrowingError from './middlewares/errorFile';
import loginRouter from './routes/loginRouter';
import teamsRouter from './routes/teamsRouter';

class App {
  public app: express.Express;
  public throwingError = new ThrowingError();

  constructor() {
    this.app = express();

    this.config();
    // Não remover essa rota
    this.app.get('/', (req, res) => res.json({ ok: true }));
  }

  private config():void {
    const accessControl: express.RequestHandler = (req, res, next) => {
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Methods', 'GET,POST,DELETE,OPTIONS,PUT,PATCH');
      res.header('Access-Control-Allow-Headers', '*');
      next();
    };

    this.app.use(express.json());
    this.app.use(accessControl);
    this.app.use('/login', loginRouter);
    this.app.use('/teams', teamsRouter);
    this.app.use((
      err: ErrorInterface,
      req: express.Request,
      res: express.Response,
      next: express.NextFunction,
    ) => {
      this.throwingError.takeError(err, req, res, next);
    });
  }

  public start(PORT: string | number):void {
    this.app.listen(PORT, () => console.log(`Running on port ${PORT}`));
  }
}

export { App };

// A execução dos testes de cobertura depende dessa exportação
export const { app } = new App();
