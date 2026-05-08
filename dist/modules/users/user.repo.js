"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRepo = void 0;
const user_model_1 = __importDefault(require("../../DB/models/user.model"));
const DB_repo_1 = require("../../DB/repo/DB.repo");
class UserRepo extends DB_repo_1.DBRepo {
    constructor() {
        super(user_model_1.default);
    }
    async findByEmail(email, projection, options) {
        const user = await this.findOne({ email }, projection, options);
        return user;
    }
}
exports.UserRepo = UserRepo;
//# sourceMappingURL=user.repo.js.map