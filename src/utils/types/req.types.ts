import { Request } from "express"
import { HydratedDocument } from "mongoose"
import { IUser } from "../../modules/users/user.type"

export interface IRequest extends Request{
    user?: HydratedDocument<IUser>
}

declare module "socket.io"{
    export interface Socket{
        user?: HydratedDocument<IUser>
    }
}