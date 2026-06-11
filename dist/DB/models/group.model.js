"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.groupModel = void 0;
const mongoose_1 = require("mongoose");
const groupSchema = new mongoose_1.Schema({
    group: { type: String, required: true }, // Group Name
    group_image: { type: String, default: "" },
    roomId: { type: String, required: true, unique: true }, // The socket room identifier
    members: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: "User",
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
exports.groupModel = (0, mongoose_1.model)("Group", groupSchema);
exports.default = exports.groupModel;
//# sourceMappingURL=group.model.js.map