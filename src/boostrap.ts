import express, { Express, NextFunction, Request, Response } from "express";
import postRouter, { routes as postRoutes } from "./modules/posts/post.controller";
import notificationRouter, { routes as notificationRoutes } from "./modules/notifications/notification.controller";
import { PORT } from "./config";
import { NotFoundException } from "./utils/errorHandle/error.handle";
import userRouter, {routes as userRoutes } from "./modules/users/user.controller";
import {DBconnection, testRedisConnection} from "./DB/connection";
import { IAppError } from "./utils/types/error";
import storyRouter from "./modules/story/story.controller";
export const app: Express = express();

export const bootstrap = async () => {
  app.use(express.json());
  app.use(userRoutes.base, userRouter);
  app.use(postRoutes.base, postRouter);            
  app.use(notificationRoutes.base, notificationRouter);
  app.use("/stories", storyRouter);  
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
