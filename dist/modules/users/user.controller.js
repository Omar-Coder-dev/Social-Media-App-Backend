"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.routes = void 0;
const express_1 = require("express");
const validation_middleware_1 = require("../../middlewares/validation.middleware");
const user_validation_1 = require("./user.validation");
const user_service_1 = require("./user.service");
const success_res_1 = require("../../utils/success.res");
const auth_middleware_1 = require("../../middlewares/auth.middleware");
const router = (0, express_1.Router)();
exports.routes = {
    base: "/users",
    signup: "/signup",
    confirmEmail: "/confirm-email",
    login: "/login",
    profile: "/me"
};
router.post(exports.routes.signup, (0, validation_middleware_1.validation)(user_validation_1.signupSchema), async (req, res, next) => {
    const { name, email, gender, password, confirmPassword, age, phone } = req.body;
    const { data } = await user_service_1.userService.signup({ name, email, gender, password, confirmPassword, age, phone });
    return (0, success_res_1.successRes)({ res, data });
});
router.patch(exports.routes.confirmEmail, (0, validation_middleware_1.validation)(user_validation_1.confirmEmailSchema), async (req, res, next) => {
    const { email, otp } = req.body;
    const { data } = await user_service_1.userService.confirmEmail({ email, otp });
    return (0, success_res_1.successRes)({ res, data });
});
router.post(exports.routes.login, (0, validation_middleware_1.validation)(user_validation_1.loginSchema), async (req, res, next) => {
    const { email, password } = req.body;
    const { data } = await user_service_1.userService.login({ email, password });
    return (0, success_res_1.successRes)({ res, data });
});
router.get("/me", auth_middleware_1.auth, (req, res) => {
    const { user } = req;
    (0, success_res_1.successRes)({ res, data: { user } });
});
exports.default = router;
//# sourceMappingURL=user.controller.js.map