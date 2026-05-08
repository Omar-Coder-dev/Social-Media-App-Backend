import { HydratedDocument, ProjectionType } from "mongoose";
import { DBRepo } from "../../DB/repo/DB.repo";
import { IUser } from "./user.type";
import { QueryOptions } from "mongoose";
export declare class UserRepo extends DBRepo<IUser> {
    constructor();
    findByEmail(email: string, projection?: ProjectionType<IUser>, options?: QueryOptions): Promise<HydratedDocument<IUser> | null>;
}
//# sourceMappingURL=user.repo.d.ts.map