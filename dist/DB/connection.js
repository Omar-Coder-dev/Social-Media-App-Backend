"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.testRedisConnection = exports.client = exports.DBconnection = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const redis_1 = require("redis");
const config_1 = require("../config");
const DBconnection = async () => {
    try {
        await mongoose_1.default.connect(config_1.MONGO_URI);
        console.log("DB connected successfully");
    }
    catch (error) {
        console.error("Error connecting to DB:", error);
    }
};
exports.DBconnection = DBconnection;
exports.client = (0, redis_1.createClient)({
    url: "redis://localhost:6379",
    database: 3
});
const testRedisConnection = async () => {
    exports.client.connect().then(() => {
        console.log("Redis connected successfully");
    }).catch((error) => {
        console.error("Error connecting to Redis:", error);
    });
};
exports.testRedisConnection = testRedisConnection;
//# sourceMappingURL=connection.js.map