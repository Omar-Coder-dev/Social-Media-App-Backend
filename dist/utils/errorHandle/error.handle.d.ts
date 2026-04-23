import { IAppError } from "../types/error";
export declare class AppError extends Error implements IAppError {
    statusCode: number;
    constructor(message: string, statusCode?: number, options?: ErrorOptions);
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
    constructor(message?: string[]);
}
//# sourceMappingURL=error.handle.d.ts.map