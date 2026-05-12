"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.routes = void 0;
const express_1 = require("express");
const auth_middleware_1 = require("../../middlewares/auth.middleware");
const success_res_1 = require("../../utils/success.res");
const post_service_1 = require("./post.service");
const router = (0, express_1.Router)();
exports.routes = {
    base: "/posts",
    create: "/",
    feed: "/feed",
    react: "/react/:postId",
    delete: "/:postId",
    addComment: "/comment/:postId",
    getComments: "/comments/:postId"
};
// 1. Create Post
router.post(exports.routes.create, auth_middleware_1.auth, async (req, res, next) => {
    try {
        const { user } = req;
        if (!user)
            return next(new Error("Unauthorized")); // Solves 'possibly undefined'
        const { content } = req.body;
        const { data } = await post_service_1.postService.create({ content, userId: user._id });
        return (0, success_res_1.successRes)({ res, data });
    }
    catch (error) {
        next(error);
    }
});
// 2. Get News Feed
router.get(exports.routes.feed, auth_middleware_1.auth, async (req, res, next) => {
    try {
        const { data } = await post_service_1.postService.getFeed();
        return (0, success_res_1.successRes)({ res, data });
    }
    catch (error) {
        next(error);
    }
});
// 3. React (Emoji)
router.post(exports.routes.react, auth_middleware_1.auth, async (req, res, next) => {
    try {
        const { user } = req;
        if (!user)
            return next(new Error("Unauthorized"));
        const { type } = req.body;
        const { postId } = req.params; // Cast to any to bypass TS string[] check
        const { data } = await post_service_1.postService.react({ postId, userId: user._id, type });
        return (0, success_res_1.successRes)({ res, data });
    }
    catch (error) {
        next(error);
    }
});
// 4. Delete (Hard delete triggers cascade)
router.delete(exports.routes.delete, auth_middleware_1.auth, async (req, res, next) => {
    try {
        const { postId } = req.params;
        const { data } = await post_service_1.postService.hardDelete(postId);
        return (0, success_res_1.successRes)({ res, data });
    }
    catch (error) {
        next(error);
    }
});
router.post(exports.routes.addComment, auth_middleware_1.auth, async (req, res, next) => {
    try {
        const { user } = req;
        if (!user)
            return next(new Error("Unauthorized"));
        const { text } = req.body;
        const { postId } = req.params;
        const { data } = await post_service_1.postService.addComment({ text, postId, userId: user._id });
        return (0, success_res_1.successRes)({ res, data });
    }
    catch (error) {
        next(error);
    }
});
// 2. Get Comments for a Post
router.get(exports.routes.getComments, auth_middleware_1.auth, async (req, res, next) => {
    try {
        const { postId } = req.params;
        const { data } = await post_service_1.postService.getPostComments(postId);
        return (0, success_res_1.successRes)({ res, data });
    }
    catch (error) {
        next(error);
    }
});
exports.default = router;
//# sourceMappingURL=post.controller.js.map