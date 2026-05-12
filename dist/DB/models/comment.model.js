"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const commentSchema = new mongoose_1.Schema({
    text: {
        type: String,
        required: [true, "Comment text is required"]
    },
    postId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Post",
        required: true
    },
    userId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    isDeleted: {
        type: Boolean,
        default: false
    },
}, { timestamps: true });
commentSchema.pre(/^find/, function () {
    this.where({ isDeleted: false });
});
const commentModel = (0, mongoose_1.model)("Comment", commentSchema);
exports.default = commentModel;
//# sourceMappingURL=comment.model.js.map