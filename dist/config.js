"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EMAIL_PORT = exports.HOST = exports.EMAIL_PASSWORD = exports.EMAIL_USER = exports.SALT = exports.ENCRYPTION_SECRET_KEY = exports.IV_LENGTH = exports.MONGO_URI = exports.PORT = void 0;
exports.PORT = process.env.PORT;
exports.MONGO_URI = process.env.MONGODB_URI;
exports.IV_LENGTH = process.env.IV_LENGTH;
exports.ENCRYPTION_SECRET_KEY = process.env.ENCRYPTION_SECRET_KEY;
// Salt
exports.SALT = process.env.SALT;
// Email
exports.EMAIL_USER = process.env.EMAIL_USER;
exports.EMAIL_PASSWORD = process.env.EMAIL_PASSWORD;
exports.HOST = process.env.HOST;
exports.EMAIL_PORT = process.env.EMAIL_PORT;
//# sourceMappingURL=config.js.map