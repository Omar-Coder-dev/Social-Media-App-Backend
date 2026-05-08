import { $ZodIssue } from "zod/v4/core";
import { IAppError } from "../types/error";
export declare class AppError extends Error implements IAppError {
    statusCode: number;
    validationError?: $ZodIssue[] | undefined;
    constructor(message: string, statusCode?: number, validationError?: $ZodIssue[] | undefined, options?: ErrorOptions);
}
export declare class NotFoundException extends AppError {
    constructor(message?: string);
}
export declare class BadRequestException extends AppError {
    constructor(message?: string);
}
export declare class UnauthorizedException extends AppError {
    constructor(message?: string);
}
export declare class ForbiddenException extends AppError {
    constructor(message?: string);
}
export declare class ValidationErrorException extends AppError {
    constructor(validationErrors: $ZodIssue[]);
}
//# sourceMappingURL=error.handle.d.ts.map