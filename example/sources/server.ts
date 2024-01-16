import express, {
  Application,
  ErrorRequestHandler,
  Request,
  Response,
  NextFunction,
} from "express";
import oracledb from "oracledb";
import databaseConfig from "./configs/database.config";
import baseRouter from "./routes/base";
import usersRouter from "./routes/users";

const app: Application = express();
const port = process.env.HTTP_PORT || 3000;

const startServer = async () => {
  let connection;
  let tries = 0;
  const maxTries = 5;

  console.log("Trying to connect to Oracle Database");

  while (tries < maxTries) {
    try {
      console.log(databaseConfig);

      connection = await oracledb.getConnection(databaseConfig);
      console.log("Connected to Oracle Database");
      break;
    } catch (err: any) {
      console.error(err);
      tries++;
      console.log(`Retrying in 5 seconds... (Attempt ${tries} of ${maxTries})`);
      await new Promise((resolve) => setTimeout(resolve, 5000));
    }
  }

  if (tries === maxTries) {
    const errorHandler: ErrorRequestHandler = (
      err: any,
      req: Request,
      res: Response,
      next: NextFunction
    ) => {
      console.error(err.stack);
      res
        .status(500)
        .send("500: Internal Server Error : Cannot connect to the database");
    };
    app.use(errorHandler);
  } else {
    app.use(usersRouter);

    // baseRouter should be always the last one (SPA...)
    app.use(baseRouter);
    app.listen(port, () => {
      console.log(`Server is listening on port ${port}`);
    });
  }
};

startServer();
