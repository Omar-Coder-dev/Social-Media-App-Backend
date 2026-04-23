import { signupDTO } from "./user.type"

export const signup = (body: signupDTO) =>{
    return {data:body}
}