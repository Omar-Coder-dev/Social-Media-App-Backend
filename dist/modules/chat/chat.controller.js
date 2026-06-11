"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const chat_model_1 = require("../../DB/models/chat.model");
const group_model_1 = require("../../DB/models/group.model");
const auth_middleware_1 = require("../../middlewares/auth.middleware");
const success_res_1 = require("../../utils/success.res");
const router = (0, express_1.Router)();
router.get("/user/:userId", auth_middleware_1.auth, async (req, res) => {
    try {
        const reqWithUser = req;
        if (!reqWithUser.user || !reqWithUser.user._id) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        const currentUserId = reqWithUser.user._id;
        const targetFriendId = req.params.userId;
        const chat = await chat_model_1.chatModel.findOne({
            participants: { $all: [currentUserId, targetFriendId] }
        }).populate("participants", "name profilePicture");
        return (0, success_res_1.successRes)({ res, data: { chat: chat || null } });
    }
    catch (error) {
        res.status(500).json({ message: "Error fetching private chat" });
    }
});
// 🟢 Group Chat Route
router.get("/group/:groupId", auth_middleware_1.auth, async (req, res) => {
    try {
        const { groupId } = req.params;
        const chat = await group_model_1.groupModel.findById(groupId).populate({
            path: "messages.createdBy",
            select: "name profilePicture"
        });
        return (0, success_res_1.successRes)({ res, data: { chat: chat || null } });
    }
    catch (error) {
        res.status(500).json({ message: "Error fetching group chat" });
    }
});
exports.default = router;
//# sourceMappingURL=chat.controller.js.map