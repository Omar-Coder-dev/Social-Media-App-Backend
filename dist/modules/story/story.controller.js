"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.routes = void 0;
const express_1 = require("express");
const auth_middleware_1 = require("../../middlewares/auth.middleware");
const success_res_1 = require("../../utils/success.res");
const story_service_1 = require("./story.service");
const router = (0, express_1.Router)();
exports.routes = {
    base: "/stories",
    create: "/",
    getAll: "/all"
};
// 1. Create Story (Vanishes in 24h via Redis)
router.post(exports.routes.create, auth_middleware_1.auth, async (req, res, next) => {
    try {
        const { user } = req;
        if (!user)
            return next(new Error("Unauthorized"));
        const { content } = req.body;
        // userId is used for the Redis key: story:userId:timestamp
        const { data } = await story_service_1.storyService.create({ content, userId: user._id });
        return (0, success_res_1.successRes)({ res, data });
    }
    catch (error) {
        next(error);
    }
});
// 2. Get All Stories
router.get(exports.routes.getAll, auth_middleware_1.auth, async (req, res, next) => {
    try {
        const { data } = await story_service_1.storyService.getAll();
        return (0, success_res_1.successRes)({ res, data });
    }
    catch (error) {
        next(error);
    }
});
exports.default = router;
//# sourceMappingURL=story.controller.js.map