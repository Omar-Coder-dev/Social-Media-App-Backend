"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteKey = exports.get = exports.set = exports.update = exports.forgetPasswordKeyPrefix = exports.ConfirmEmailKeyPrefix = exports.revokeTokenKey = exports.revokeTokenKeyPrefix = void 0;
const connection_1 = require("./connection");
const revokeTokenKeyPrefix = ({ userId }) => {
    return `user:${userId}:revokeToken`;
};
exports.revokeTokenKeyPrefix = revokeTokenKeyPrefix;
const revokeTokenKey = ({ userId, jti }) => {
    return `${(0, exports.revokeTokenKeyPrefix)({ userId })}:${jti}`;
};
exports.revokeTokenKey = revokeTokenKey;
const ConfirmEmailKeyPrefix = ({ userId }) => {
    return `user:${userId}:confirmEmail`;
};
exports.ConfirmEmailKeyPrefix = ConfirmEmailKeyPrefix;
const forgetPasswordKeyPrefix = ({ userId }) => {
    return `user:${userId}:forgetPassword`;
};
exports.forgetPasswordKeyPrefix = forgetPasswordKeyPrefix;
const update = async ({ key, value, ttl }) => {
    try {
        const isExists = await connection_1.RedisClient.exists(key);
        if (!isExists) {
            return false;
        }
        return await (0, exports.set)({ key, value, ttl });
    }
    catch (error) {
        console.log("REDIS update Error=>", error);
        return undefined;
    }
};
exports.update = update;
const set = async ({ key, value, ttl = null }) => {
    try {
        const data = typeof value !== "string" ? JSON.stringify(value) : value;
        if (ttl) {
            return await connection_1.RedisClient.set(key, data, {
                expiration: {
                    type: "EX",
                    value: ttl
                }
            });
        }
        else {
            return await connection_1.RedisClient.set(key, data);
        }
    }
    catch (error) {
        console.log("REDIS set Error=>", error);
        return undefined;
    }
};
exports.set = set;
const get = async ({ key }) => {
    try {
        const data = await connection_1.RedisClient.get(key);
        if (!data)
            return null;
        // Attempt to parse if it's a JSON string, otherwise return as is
        try {
            return JSON.parse(data);
        }
        catch {
            return data;
        }
    }
    catch (error) {
        console.log("REDIS get Error=>", error);
        return undefined;
    }
};
exports.get = get;
const deleteKey = async ({ key }) => {
    try {
        return await connection_1.RedisClient.del(key);
    }
    catch (error) {
        console.log("REDIS del Error=>", error);
        return undefined;
    }
};
exports.deleteKey = deleteKey;
//# sourceMappingURL=redis.repo.js.map