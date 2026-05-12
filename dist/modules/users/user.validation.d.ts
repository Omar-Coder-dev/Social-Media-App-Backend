import * as z from 'zod';
import { schemaType } from '../../middlewares/validation.middleware';
export declare const signupSchema: schemaType;
export declare const confirmEmailSchema: {
    body: z.ZodObject<{
        email: z.ZodEmail;
        otp: z.ZodNumber;
    }, z.core.$strip>;
};
export declare const loginSchema: {
    body: z.ZodObject<{
        email: z.ZodEmail;
        password: z.ZodString;
    }, z.core.$strip>;
};
//# sourceMappingURL=user.validation.d.ts.map