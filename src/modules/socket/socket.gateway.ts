import { Server as HttpServer } from "http"
import { Server } from "socket.io";
import { decodeToken } from "../../utils/security/token/token";
import { IUser } from "../users/user.type";
import { HydratedDocument } from "mongoose";
import { registerSocketHandlers } from "./socket.controller";

declare module "socket.io" {
  interface Socket {
    user?: HydratedDocument<IUser>
  }
}

let io: Server;

export const initializeIo = (httpServer: HttpServer): Server => {
    io = new Server(httpServer, {
        cors: { origin: "*" }
    });

    // Token Verification Middleware
    io.use(async (socket, next) => {
        try {
            const token = socket.handshake.auth.token;
            if (!token) {
                return next(new Error("UnAUthorized"));
            }

            const user = await decodeToken(token) as IUser;
            socket.user = user as HydratedDocument<IUser>;
            next();
        } catch (err) {
            console.log("Socket Authentication Error:", err);
            next(new Error("UnAUthorized"));
        }
    });

    // Initialize hand-off directly to modular controller event listeners
    io.on('connection', (socket) => {
        registerSocketHandlers(io, socket);
    });

    return io;
};