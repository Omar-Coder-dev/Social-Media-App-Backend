import { HydratedDocument } from "mongoose"

export enum GenderEnum {
    male ,
    female,
}
export enum ProviderEnum {
    system,
    google,
}
export enum RoleEnum {
    user,
    admin
}


export type HUser = HydratedDocument<IUser>

export interface IUser {
    name: string
    email: string
    age: number
    gender: GenderEnum
    password: string
    isEmailConfirmed: boolean
    phone: string
    changedCredentialsAt: Date
    isDeleted: boolean
    isProvier: ProviderEnum
    role: RoleEnum
    friends?: any[];
    friendRequests?: any[];
}


export interface signupDTO {

    name:string 
    email:string
    password:string
    confirmPassword:string 
    age:number
    gender: GenderEnum
    phone:string
}

export type confirmEmailDTO = {
    email: string
    otp: number
}

export type loginDTO = {
    email: string
    password: string
}

export interface FriendRequestDTO {
    senderId: string;
    recipientId: string;
}