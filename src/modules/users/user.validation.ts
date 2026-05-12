import * as z from 'zod'
import { schemaType } from '../../middlewares/validation.middleware'


export const signupSchema: schemaType = {
    body: z.object({
        name: z.string().min(3).max(15),
        email: z.email(),
        password: z.string().regex(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/),
        confirmPassword: z.string().optional(),
        age: z.number().optional(),
        gender: z.union([
            z.literal(0),
            z.literal(1)
        ])
    })
    .refine((value) => {
        if (value.password !== value.confirmPassword) {
            return false
        } else {
            return true
        }
    }, {
        error: "password not match",
        path: ["password", "confirmPassword"]
    })
}

export const confirmEmailSchema = {
    body: z.object({
        email:z.email(),
        otp: z.number().min(100000).max(999999),
    })
}

export const loginSchema = {
    body: z.object({
        email: z.email(),
        password: z.string()
    })
}