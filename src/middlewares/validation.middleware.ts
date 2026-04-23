import { NextFunction, Request, Response } from "express";
import * as z from "zod";

type keysTypes = keyof Request
export type schemaType = Partial<Record<keysTypes, z.ZodType>>

export const validation = (schema: schemaType) => {
    return (req: Request, res: Response, next: NextFunction) => {
        const issues: any = []
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
            return res.status(400).json({ errMsg: "validation Error", issues })
        }
       return next()
    }

}