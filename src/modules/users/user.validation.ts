import * as z from 'zod'
import { schemaType } from '../../middlewares/validation.middleware'


export const signupSchema: schemaType = {
    body: z.object({
        name: z.string().min(3).max(4),
        email: z.email(),
        password: z.string().regex(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/),
        repeatPassword: z.string(),
        age: z.number().optional()
    })
    .refine((value) => {
        if (value.password !== value.repeatPassword) {
            return false
        } else {
            return true
        }
    }, {
        error: "password not match",
        path: ["password", "repeatPassword"]
    })
}