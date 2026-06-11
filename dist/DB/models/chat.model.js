"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.chatModel = void 0;
const mongoose_1 = require("mongoose");
const chatSchema = new mongoose_1.Schema({
    participants: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
    ],
    messages: [
        {
            content: { type: String, required: true },
            createdBy: { type: mongoose_1.Schema.Types.ObjectId, ref: "User", required: true },
            createdAt: { type: Date, default: Date.now },
        },
    ],
}, { timestamps: true });
exports.chatModel = (0, mongoose_1.model)("Chat", chatSchema);
exports.default = exports.chatModel;
//# sourceMappingURL=chat.model.js.map