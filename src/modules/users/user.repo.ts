import { HydratedDocument, ProjectionType } from "mongoose";
import userModel from "../../DB/models/user.model";
import { DBRepo } from "../../DB/repo/DB.repo";
import { IUser } from "./user.type";
import { QueryOptions } from "mongoose";

export class UserRepo extends DBRepo<IUser> {
    constructor() {
        super(userModel)
    }

    async findByEmail(
        email: string,
        projection?: ProjectionType<IUser>,
        options?: QueryOptions
    ): Promise<HydratedDocument<IUser> | null> {
        const user = await this.findOne({ email }, projection, options)
        return user
    }
}