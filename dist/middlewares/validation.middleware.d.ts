import { NextFunction, Request, Response } from "express";
import * as z from "zod";
type keysTypes = keyof Request;
export type schemaType = Partial<Record<keysTypes, z.ZodType>>;
export declare const validation: (schema: schemaType) => (req: Request, res: Response, next: NextFunction) => void;
export {};
//# sourceMappingURL=validation.middleware.d.ts.map