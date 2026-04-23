"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.bootstrap = exports.app = void 0;
const express_1 = __importDefault(require("express"));
const config_1 = require("./config");
// import { IAppError } from './utils/types/error';
const error_handle_1 = require("./utils/errorHandle/error.handle");
const user_controller_1 = __importDefault(require("./modules/users/user.controller"));
exports.app = (0, express_1.default)();
const bootstrap = async () => {
    exports.app.use(express_1.default.json());
    exports.app.use("/users", user_controller_1.default);
    exports.app.all(/.*/, (req, res, next) => {
        next(new error_handle_1.NotFoundException());
    });
    exports.app.use((err, req, res, next) => {
        err.cause;
        res.status(err.statusCode || 500).json({
            err: JSON.parse(err.message),
            status: err.statusCode || 500,
        });
    });
    exports.app.listen(config_1.PORT, () => {
        console.log(`Server is running on port ${config_1.PORT}`);
    });
};
exports.bootstrap = bootstrap;
//# sourceMappingURL=boostrap.js.map