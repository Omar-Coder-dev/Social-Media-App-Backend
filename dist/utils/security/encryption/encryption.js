"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.decryption = exports.encryption = void 0;
const crypto_1 = __importDefault(require("crypto"));
const config_1 = require("../../../config");
const IV_LENGTH = Number(process.env.IV_LENGTH);
const SECRET_KEY = Buffer.from(config_1.ENCRYPTION_SECRET_KEY);
const encryption = (text) => {
    const iv = crypto_1.default.randomBytes(IV_LENGTH);
    const cipher = crypto_1.default.createCipheriv('aes-256-cbc', SECRET_KEY, iv);
    let cipherText = cipher.update(text, 'utf-8', 'hex');
    cipherText += cipher.final('hex');
    return `${iv.toString('hex')}:${cipherText}`;
};
exports.encryption = encryption;
const decryption = (cipherData) => {
    const [iv, cipherText] = cipherData.split(':');
    const binaryIv = Buffer.from(iv, 'hex');
    const decipher = crypto_1.default.createDecipheriv('aes-256-cbc', SECRET_KEY, binaryIv);
    let data = decipher.update(cipherText, 'hex', 'utf-8');
    data += decipher.final('utf-8');
    return data;
};
exports.decryption = decryption;
//# sourceMappingURL=encryption.js.map