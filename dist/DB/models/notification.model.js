"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const notificationSchema = new mongoose_1.Schema({
    title: { type: String, required: true },
    body: { type: String, required: true },
    type: {
        type: String,
        enum: ["admin_blast", "post_react", "post_comment"],
        default: "admin_blast"
    },
    recipientId: { type: mongoose_1.Schema.Types.ObjectId, ref: "User" }, // null if sent to everyone
    senderId: { type: mongoose_1.Schema.Types.ObjectId, ref: "User" }, // The Admin or the reactor
    isRead: { type: Boolean, default: false },
}, { timestamps: true });
const notificationModel = (0, mongoose_1.model)("Notification", notificationSchema);
exports.default = notificationModel;
//# sourceMappingURL=notification.model.js.map