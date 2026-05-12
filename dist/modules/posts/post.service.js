"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.postService = void 0;
const post_model_1 = __importDefault(require("../../DB/models/post.model"));
const comment_model_1 = __importDefault(require("../../DB/models/comment.model"));
const notification_model_1 = __importDefault(require("../../DB/models/notification.model"));
exports.postService = {
    // 1. Create Post
    create: async ({ content, userId }) => {
        const post = await post_model_1.default.create({ content, userId });
        return { data: { post } };
    },
    // 2. Get News Feed
    getFeed: async () => {
        const posts = await post_model_1.default.find()
            .populate("userId", "name email")
            .sort({ createdAt: -1 });
        return { data: { posts } };
    },
    // 3. React (Emoji) + Trigger Notification
    react: async ({ postId, userId, type }) => {
        const targetPost = await post_model_1.default.findById(postId);
        await post_model_1.default.updateOne({ _id: postId }, { $pull: { reactions: { userId } } });
        const post = await post_model_1.default.findByIdAndUpdate(postId, { $push: { reactions: { userId, type } } }, { new: true });
        // Notify the post owner if it's someone else's reaction
        if (targetPost && targetPost.userId.toString() !== userId.toString()) {
            await notification_model_1.default.create({
                recipientId: targetPost.userId, // FIXED: was userId
                senderId: userId,
                title: "New Reaction",
                body: `Someone reacted with ${type} to your post`,
                type: "post_react"
            });
        }
        return { data: { post } };
    },
    // 4. Hard Delete
    hardDelete: async (postId) => {
        const post = await post_model_1.default.findOneAndDelete({ _id: postId });
        await comment_model_1.default.deleteMany({ postId });
        return { data: { post } };
    },
    // 5. Add Comment + Trigger Notification
    addComment: async ({ text, postId, userId }) => {
        const comment = await comment_model_1.default.create({ text, postId, userId });
        const targetPost = await post_model_1.default.findById(postId);
        // Notify the post owner if it's someone else's comment
        if (targetPost && targetPost.userId.toString() !== userId.toString()) {
            await notification_model_1.default.create({
                recipientId: targetPost.userId, // FIXED: was userId
                senderId: userId,
                title: "New Comment",
                body: `Someone commented: "${text.substring(0, 20)}${text.length > 20 ? '...' : ''}"`,
                type: "post_comment"
            });
        }
        return { data: { comment } };
    },
    // 6. Get Comments
    getPostComments: async (postId) => {
        const comments = await comment_model_1.default.find({ postId }).populate("userId", "name");
        return { data: { comments } };
    },
    // 7. Soft Delete Comment
    softDeleteComment: async (commentId, userId) => {
        const comment = await comment_model_1.default.findOneAndUpdate({ _id: commentId, userId }, { isDeleted: true }, { new: true });
        return { data: { comment } };
    }
};
//# sourceMappingURL=post.service.js.map