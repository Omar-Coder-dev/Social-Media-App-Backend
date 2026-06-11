"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.routes = void 0;
const express_1 = require("express");
const validation_middleware_1 = require("../../middlewares/validation.middleware");
const user_validation_1 = require("./user.validation");
const user_service_1 = require("./user.service");
const success_res_1 = require("../../utils/success.res");
const auth_middleware_1 = require("../../middlewares/auth.middleware");
const user_model_1 = require("../../DB/models/user.model");
const chat_model_1 = require("../../DB/models/chat.model");
const group_model_1 = require("../../DB/models/group.model");
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
router.get("/me", auth_middleware_1.auth, async (req, res) => {
    try {
        const reqWithUser = req;
        if (!reqWithUser.user)
            return res.status(401).json({ message: "Unauthorized" });
        const populatedUser = await user_model_1.userModel.findById(reqWithUser.user._id)
            .populate({
            path: 'friends',
            select: '_id name profilePicture'
        });
        // 🟢 FETCH GROUPS HERE:
        const allGroups = await group_model_1.groupModel.find();
        const userPayload = populatedUser ? populatedUser.toObject() : {};
        return (0, success_res_1.successRes)({
            res,
            data: {
                user: userPayload,
                groups: allGroups // 🟢 Now it will send the data instead of []
            }
        });
    }
    catch (error) {
        console.error("ERROR IN /ME ROUTE:", error.message);
        return (0, success_res_1.successRes)({ res, data: { user: {}, groups: [] } });
    }
});
router.post("/friend-request/send/:recipientId", auth_middleware_1.auth, async (req, res) => {
    try {
        const { user } = req;
        const { recipientId } = req.params;
        if (!user)
            return res.status(401).json({ message: "Unauthorized" });
        if (!recipientId || typeof recipientId !== "string") {
            return res.status(400).json({ message: "Invalid recipient ID" });
        }
        const result = await user_service_1.userService.sendFriendRequest(user._id.toString(), recipientId);
        return (0, success_res_1.successRes)({ res, data: result });
    }
    catch (error) {
        return res.status(error.status || 500).json({ message: error.message });
    }
});
router.post("/friend-request/accept/:senderId", auth_middleware_1.auth, async (req, res) => {
    try {
        const { user } = req;
        const { senderId } = req.params;
        if (!user)
            return res.status(401).json({ message: "Unauthorized" });
        if (!senderId || typeof senderId !== "string") {
            return res.status(400).json({ message: "Invalid sender ID" });
        }
        const result = await user_service_1.userService.acceptFriendRequest(user._id.toString(), senderId);
        return (0, success_res_1.successRes)({ res, data: result });
    }
    catch (error) {
        return res.status(error.status || 500).json({ message: error.message });
    }
});
router.post("/friend-request/reject/:senderId", auth_middleware_1.auth, async (req, res) => {
    try {
        const { user } = req;
        const { senderId } = req.params;
        if (!user)
            return res.status(401).json({ message: "Unauthorized" });
        if (!senderId || typeof senderId !== "string") {
            return res.status(400).json({ message: "Invalid sender ID" });
        }
        const result = await user_service_1.userService.rejectFriendRequest(user._id.toString(), senderId);
        return (0, success_res_1.successRes)({ res, data: result });
    }
    catch (error) {
        return res.status(error.status || 500).json({ message: error.message });
    }
});
router.get("/:userId/chat", auth_middleware_1.auth, async (req, res) => {
    try {
        const reqWithUser = req;
        if (!reqWithUser.user)
            return res.status(401).json({ message: "Unauthorized" });
        const currentUserId = reqWithUser.user._id;
        const targetFriendId = req.params.userId;
        // 🟢 Using explicit cast to match your MongoDB layout exactly
        const chatInstance = await chat_model_1.chatModel.findOne({
            participants: { $all: [currentUserId, targetFriendId] }
        });
        if (!chatInstance) {
            return (0, success_res_1.successRes)({ res, data: { chat: null } });
        }
        const totalMessages = chatInstance.messages.length;
        const slicedMessages = chatInstance.messages.slice(-20); // Keep it dead simple for tonight
        const chatPayload = {
            _id: chatInstance._id,
            participants: chatInstance.participants,
            messages: slicedMessages,
            totalMessages
        };
        return (0, success_res_1.successRes)({ res, data: { chat: chatPayload } });
    }
    catch (error) {
        return res.status(500).json({ message: "Error" });
    }
});
exports.default = router;
//# sourceMappingURL=user.controller.js.map