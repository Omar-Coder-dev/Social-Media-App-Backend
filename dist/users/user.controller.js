"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_service_1 = require("./user.service");
const router = (0, express_1.Router)();
router.get("/signup", (req, res) => {
    const { data } = (0, user_service_1.signup)(req.body);
    // return successRes({res})
});
router.get("/hello", (req, res) => {
    const result = (0, user_service_1.helloUser)();
    res.json({ message: "Hello", data: result });
});
exports.default = router;
//# sourceMappingURL=user.controller.js.map