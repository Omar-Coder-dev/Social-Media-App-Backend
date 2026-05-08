"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidationErrorException = exports.ForbiddenException = exports.UnauthorizedException = exports.BadRequestException = exports.NotFoundException = exports.AppError = void 0;
class AppError extends Error {
    statusCode;
    validationError;
    constructor(message, statusCode = 500, validationError, options) {
        super(message, options);
        this.statusCode = statusCode;
        this.validationError = validationError;
    }
}
exports.AppError = AppError;
class NotFoundException extends AppError {
    constructor(message) {
        super(message || "Resource not found", 404);
    }
}
exports.NotFoundException = NotFoundException;
class BadRequestException extends AppError {
    constructor(message) {
        super(message || "Bad request", 400);
    }
}
exports.BadRequestException = BadRequestException;
class UnauthorizedException extends AppError {
    constructor(message) {
        super(message || "Unauthorized", 401);
    }
}
exports.UnauthorizedException = UnauthorizedException;
class ForbiddenException extends AppError {
    constructor(message) {
        super(message || "Forbidden", 403);
    }
}
exports.ForbiddenException = ForbiddenException;
class ValidationErrorException extends AppError {
    constructor(validationErrors) {
        super("Validation Error", 422, validationErrors);
    }
}
exports.ValidationErrorException = ValidationErrorException;
//# sourceMappingURL=error.handle.js.map