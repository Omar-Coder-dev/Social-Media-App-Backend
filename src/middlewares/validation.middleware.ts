import { NextFunction, Request, Response } from "express";
import * as z from "zod";
import { ValidationErrorException } from "../utils/errorHandle/error.handle";
import { $ZodIssue } from "zod/v4/core";

type keysTypes = keyof Request
export type schemaType = Partial<Record<keysTypes, z.ZodType>>

export const validation = (schema: schemaType) => {
    return (req: Request, res: Response, next: NextFunction) => {
        const issues: $ZodIssue[] = []
        const keys = Object.keys(schema) as keysTypes[]
        keys.forEach(key => {
            if (schema[key]) {
                const validationRes = schema[key].safeParse(req[key])
                if (!validationRes.success) {

                    issues.push(...validationRes.error.issues.map(issue => issue))
                }
            }
        });
        if (issues.length) {
            throw new ValidationErrorException(issues)
            // return res.status(400).json({ errMsg: "validation Error", issues })
        }
       return next()
    }

}