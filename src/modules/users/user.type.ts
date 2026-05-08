import { HydratedDocument } from "mongoose"

export enum GenderEnum {
    male ,
    female,
}
export enum ProviderEnum {
    system,
    google,
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
}


export interface signupDTO {

    name:string 
    email:string
    password:string
    confirmPassword:string

}