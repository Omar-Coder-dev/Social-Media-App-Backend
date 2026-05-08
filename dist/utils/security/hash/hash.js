"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.compareHash = exports.createHash = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const config_1 = require("../../../config");
const error_handle_1 = require("../../errorHandle/error.handle");
const createHash = async (data) => {
    if (!config_1.SALT)
        throw new error_handle_1.AppError('SALT is not defined in environment variables');
    const hash = await bcrypt_1.default.hash(data, Number(config_1.SALT));
    return hash;
};
exports.createHash = createHash;
const compareHash = async (data, encypted) => {
    return await bcrypt_1.default.compare(data, encypted);
};
exports.compareHash = compareHash;
//# sourceMappingURL=hash.js.map