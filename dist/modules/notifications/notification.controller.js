"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.routes = void 0;
const express_1 = require("express");
const auth_middleware_1 = require("../../middlewares/auth.middleware");
const success_res_1 = require("../../utils/success.res");
const notification_service_1 = require("./notification.service");
const user_type_1 = require("../users/user.type");
const router = (0, express_1.Router)();
exports.routes = {
    base: "/notifications",
    send: "/admin/send",
    myNotifications: "/me"
};
// 1. ADMIN ONLY: Create & Send Notification Blast
router.post(exports.routes.send, auth_middleware_1.auth, async (req, res, next) => {
    try {
        const { user } = req;
        // Requirement Check: Notification created by admin only
        if (!user || user.role !== user_type_1.RoleEnum.admin) {
            return next(new Error("Forbidden: Admin access required"));
        }
        const { title, body } = req.body;
        const { data } = await notification_service_1.notificationService.createAdminBlast({
            title,
            body,
            adminId: user._id
        });
        return (0, success_res_1.successRes)({ res, data });
    }
    catch (error) {
        next(error);
    }
});
// 2. USER: Get my notification list (History)
router.get(exports.routes.myNotifications, auth_middleware_1.auth, async (req, res, next) => {
    try {
        const { user } = req;
        if (!user)
            return next(new Error("Unauthorized"));
        const { data } = await notification_service_1.notificationService.getNotifications(user._id);
        return (0, success_res_1.successRes)({ res, data });
    }
    catch (error) {
        next(error);
    }
});
exports.default = router;
//# sourceMappingURL=notification.controller.js.map