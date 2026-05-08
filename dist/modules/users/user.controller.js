"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_service_1 = require("./user.service");
const success_res_1 = require("../../utils/success.res");
// import { validation } from '../../middlewares/validation.middleware'
// import { signupSchema } from './user.validation'
const error_handle_1 = require("../../utils/errorHandle/error.handle");
const router = (0, express_1.Router)();
router.post("/signup", (req, res) => {
    throw new error_handle_1.BadRequestException("this is bad request");
    const { data } = (0, user_service_1.signup)(req.body);
    return (0, success_res_1.successRes)({ res, data });
});
exports.default = router;
//# sourceMappingURL=user.controller.js.map