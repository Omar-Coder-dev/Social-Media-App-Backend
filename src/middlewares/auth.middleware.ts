import { NextFunction, Response } from "express";
import { BadRequestException, UnauthorizedException } from "../utils/errorHandle/error.handle";
import { verifyToken } from "../utils/security/token/token";
import { ACCESS_TOKEN_SIGNATURE } from "../config";
import userModel from "../DB/models/user.model";
import { revokeTokenKey } from "../DB/redis.repo";
import { get } from "../DB/redis.repo";
import { IRequest } from "../utils/types/req.types";


export const auth = async (req: IRequest, res: Response, next: NextFunction) => {
    let { authorization } = req.headers;
    
    if (!authorization) {
        throw new UnauthorizedException();
    }

    // NEW: Strip the "Bearer " prefix if it exists
    if (authorization.startsWith("Bearer ")) {
        authorization = authorization.split(" ")[1];
    }

    const { email, _id, iat, jti } = verifyToken(authorization as string, ACCESS_TOKEN_SIGNATURE as string) as {
        email: string,
        _id: string,
        iat: number,
        jti: string
    }
    const user = await userModel.findById({_id , isEmailConfirmed:true});
    if(!user){
        throw new UnauthorizedException();
    }

    const tokenKey = revokeTokenKey({
        userId:_id,
        jti
    })

    const sessionData = await get({key:tokenKey}) as string
    if (!sessionData){
        throw new BadRequestException("login again")
    }

    if (iat * 1000 <= user.changedCredentialsAt?.getTime()){
        throw new BadRequestException("login again")
    }

    req.user = user
    next()
    


}
