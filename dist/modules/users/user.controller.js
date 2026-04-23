"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_service_1 = require("./user.service");
const success_res_1 = require("../../utils/success.res");
const validation_middleware_1 = require("../../middlewares/validation.middleware");
const user_validation_1 = require("./user.validation");
const router = (0, express_1.Router)();
router.post("/signup", (0, validation_middleware_1.validation)(user_validation_1.signupSchema), (req, res) => {
    const { data } = (0, user_service_1.signup)(req.body);
    return (0, success_res_1.successRes)({ res, data });
});
exports.default = router;
//# sourceMappingURL=user.controller.js.map