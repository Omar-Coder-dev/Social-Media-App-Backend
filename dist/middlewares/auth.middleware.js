"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.auth = void 0;
const error_handle_1 = require("../utils/errorHandle/error.handle");
const token_1 = require("../utils/security/token/token");
const config_1 = require("../config");
const user_model_1 = __importDefault(require("../DB/models/user.model"));
const redis_repo_1 = require("../DB/redis.repo");
const redis_repo_2 = require("../DB/redis.repo");
const auth = async (req, res, next) => {
    let { authorization } = req.headers;
    if (!authorization) {
        throw new error_handle_1.UnauthorizedException();
    }
    // NEW: Strip the "Bearer " prefix if it exists
    if (authorization.startsWith("Bearer ")) {
        authorization = authorization.split(" ")[1];
    }
    const { email, _id, iat, jti } = (0, token_1.verifyToken)(authorization, config_1.ACCESS_TOKEN_SIGNATURE);
    const user = await user_model_1.default.findById({ _id, isEmailConfirmed: true });
    if (!user) {
        throw new error_handle_1.UnauthorizedException();
    }
    const tokenKey = (0, redis_repo_1.revokeTokenKey)({
        userId: _id,
        jti
    });
    const sessionData = await (0, redis_repo_2.get)({ key: tokenKey });
    if (!sessionData) {
        throw new error_handle_1.BadRequestException("login again");
    }
    if (iat * 1000 <= user.changedCredentialsAt?.getTime()) {
        throw new error_handle_1.BadRequestException("login again");
    }
    req.user = user;
    next();
};
exports.auth = auth;
//# sourceMappingURL=auth.middleware.js.map