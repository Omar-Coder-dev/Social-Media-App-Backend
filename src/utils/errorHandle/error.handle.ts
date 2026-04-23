import { IAppError } from "../types/error";

export class AppError extends Error implements IAppError {
    constructor(
        message: string,
        public statusCode: number = 500,
        options?: ErrorOptions
    ) {
        super(message, options);
        Object.setPrototypeOf(this, AppError.prototype);
    }
}

export class NotFoundException extends AppError {
    constructor(message?: string){
        super (message || "Resource not found", 404);
    }
}   

export class BadRequestException extends AppError {
    constructor(message?: string){
        super (message || "Bad request", 400);
    }
}

export class UnauthorizedException extends AppError {
    constructor(message?: string){
        super (message || "Unauthorized", 401);
    }
}

export class ForbiddenException extends AppError {
    constructor(message?: string){
        super (message || "Forbidden", 403);
    }
}

export class ValidationErrorException extends AppError {
    constructor(message?: string[]){
        super (message as unknown as string || "Validation error", 422);
    }
}

