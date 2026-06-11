import { HydratedDocument } from "mongoose";
export declare enum GenderEnum {
    male = 0,
    female = 1
}
export declare enum ProviderEnum {
    system = 0,
    google = 1
}
export declare enum RoleEnum {
    user = 0,
    admin = 1
}
export type HUser = HydratedDocument<IUser>;
export interface IUser {
    name: string;
    email: string;
    age: number;
    gender: GenderEnum;
    password: string;
    isEmailConfirmed: boolean;
    phone: string;
    changedCredentialsAt: Date;
    isDeleted: boolean;
    isProvier: ProviderEnum;
    role: RoleEnum;
    friends?: any[];
    friendRequests?: any[];
}
export interface signupDTO {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
    age: number;
    gender: GenderEnum;
    phone: string;
}
export type confirmEmailDTO = {
    email: string;
    otp: number;
};
export type loginDTO = {
    email: string;
    password: string;
};
export interface FriendRequestDTO {
    senderId: string;
    recipientId: string;
}
//# sourceMappingURL=user.type.d.ts.map