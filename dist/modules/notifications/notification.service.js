"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.notificationService = void 0;
const notification_model_1 = __importDefault(require("../../DB/models/notification.model"));
const firebase_config_1 = require("../../utils/firebase/firebase.config");
exports.notificationService = {
    // Admin creates a notification for everyone (Facebook Blast)
    createAdminBlast: async ({ title, body, adminId }) => {
        // 1. Save to DB history
        const notification = await notification_model_1.default.create({
            title,
            body,
            type: "admin_blast",
            senderId: adminId
        });
        // 2. Send via FCM (to a topic called 'broadcast')
        await firebase_config_1.messaging.send({
            notification: { title, body },
            topic: "broadcast"
        });
        return { data: { notification } };
    },
    // User gets their notification list
    getNotifications: async (userId) => {
        const notifications = await notification_model_1.default.find({
            $or: [{ recipientId: userId }, { type: "admin_blast" }]
        }).sort({ createdAt: -1 });
        return { data: { notifications } };
    }
};
//# sourceMappingURL=notification.service.js.map