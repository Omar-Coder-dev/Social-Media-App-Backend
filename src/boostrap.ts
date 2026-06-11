import express, { Express, NextFunction, Request, Response } from "express";

import postRouter, {
  routes as postRoutes,
} from "./modules/posts/post.controller";

import notificationRouter, {
  routes as notificationRoutes,
} from "./modules/notifications/notification.controller";
import { PORT } from "./config";
import { NotFoundException } from "./utils/errorHandle/error.handle";
import userRouter, {
  routes as userRoutes,
} from "./modules/users/user.controller";
import { DBconnection, testRedisConnection } from "./DB/connection";
import { IAppError } from "./utils/types/error";
import storyRouter from "./modules/story/story.controller";
import chatRouter from "./modules/chat/chat.controller";
import {
  GraphQLBoolean,
  GraphQLInt,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
} from "graphql";
import { createHandler } from "graphql-http/lib/use/express";
import { initializeIo } from "./modules/socket/socket.gateway";
import cors from "cors";
export const app: Express = express();
export const bootstrap = async () => {
  app.use(cors({ origin: "*" }));
  app.use(express.json());
  app.use(userRoutes.base, userRouter);
  app.use(postRoutes.base, postRouter);
  app.use(notificationRoutes.base, notificationRouter);
  app.use("/chat", chatRouter);
  app.use("/stories", storyRouter);
  await DBconnection();
  await testRedisConnection();
  const schema = new GraphQLSchema({
    query: new GraphQLObjectType({
      name: "RootQueryType",
      fields: {
        sayHi: {
          type: GraphQLString,
          resolve() {
            return "Hello From GraphQL API";
          },
        },
        calculatePrice: {
          type: GraphQLInt,
          args: {
            basePrice: { type: new GraphQLNonNull(GraphQLInt) },
            applyDiscount: { type: GraphQLBoolean },
          },

          resolve(_, { basePrice, applyDiscount }) {
            let price = basePrice;
            if (applyDiscount === true) {
              price = price - 200; // Math
            }
            return price;
          },
        },
      },
    }),

    // --- MUTATIONS ---
    mutation: new GraphQLObjectType({
      name: "RootMutationType",

      fields: {
        registerUser: {
          type: GraphQLString,

          args: {
            username: { type: new GraphQLNonNull(GraphQLString) }, // Required!

            age: { type: GraphQLInt },
          },

          resolve(_, { username, age }) {
            return `User ${username} (Age: ${age || "Unknown"}) entered successfully!`;
          },
        },
      },
    }),
  });

  app.use("/graphql", createHandler({ schema }));

  app.all(/.*/, (req, res, next) => {
    next(new NotFoundException());
  });

  app.use((err: IAppError, req: Request, res: Response, next: NextFunction) => {
    const data = { err: err.message, status: err.statusCode || 500 };

    if (err.validationError && err.validationError.length) {
      Object.assign(data, { validationError: err.validationError });
    }

    res.status(err.statusCode || 500).json(data);
  });

  const httpServer = app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
  initializeIo(httpServer);

};
