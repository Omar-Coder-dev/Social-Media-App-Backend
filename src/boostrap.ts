import express, { Express, NextFunction, Request, Response } from "express";

import { PORT } from "./config";
import { NotFoundException } from "./utils/errorHandle/error.handle";
import userRouter from "./modules/users/user.controller";
import {DBconnection, testRedisConnection} from "./DB/connection";
import { IAppError } from "./utils/types/error";
// import { email } from "./utils/email/emailEvents";
// import userModel from "./DB/models/user.model";
// import { GenderEnum } from "./modules/users/user.type";
export const app: Express = express();

export const bootstrap = async () => {
  app.use(express.json());
  app.use("/users", userRouter);
  await DBconnection();
  await testRedisConnection();


  app.all(/.*/, (req, res, next) => {
    next(new NotFoundException());
  });

  app.use((err: IAppError, req: Request, res: Response, next: NextFunction) => {
      const data = {err: err.message , status:err.statusCode || 500}
      if (err.validationError && err.validationError.length) {
          Object.assign(data, {validationError: err.validationError})
      }
      res.status(err.statusCode || 500).json(data)
  });

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};
