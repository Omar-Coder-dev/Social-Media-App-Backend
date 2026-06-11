import { Server as HttpServer } from "http";
import { Server } from "socket.io";
import { IUser } from "../users/user.type";
import { HydratedDocument } from "mongoose";
declare module "socket.io" {
    interface Socket {
        user?: HydratedDocument<IUser>;
    }
}
export declare const initializeIo: (httpServer: HttpServer) => Server;
//# sourceMappingURL=socket.gateway.d.ts.map