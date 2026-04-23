import express, { Express, NextFunction, Request, Response } from "express";

import { PORT } from "./config";
// import { IAppError } from './utils/types/error';
import { AppError, NotFoundException } from "./utils/errorHandle/error.handle";
import userRouter from "./modules/users/user.controller";
export const app: Express = express();

export const bootstrap = async () => {
  app.use(express.json());
  app.use("/users", userRouter);

  app.all(/.*/, (req, res, next) => {
    next(new NotFoundException());
  });

  app.use((err: AppError, req: Request, res: Response, next: NextFunction) => {
    err.cause;
    res.status(err.statusCode || 500).json({
      err: JSON.parse(err.message),
      status: err.statusCode || 500,
    });
  });

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};
