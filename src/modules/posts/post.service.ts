import { Types } from "mongoose";
import postModel from "../../DB/models/post.model";
import commentModel from "../../DB/models/comment.model";
import notificationModel from "../../DB/models/notification.model";

export const postService = {
    // 1. Create Post
    create: async ({ content, userId }: { content: string; userId: any }) => {
        const post = await postModel.create({ content, userId });
        return { data: { post } };
    },

    // 2. Get News Feed
    getFeed: async () => {
        const posts = await postModel.find()
            .populate("userId", "name email")
            .sort({ createdAt: -1 });
        return { data: { posts } };
    },

    // 3. React (Emoji) + Trigger Notification
    react: async ({ postId, userId, type }: { postId: any; userId: any; type: string }) => {
        const targetPost = await postModel.findById(postId);
        
        await postModel.updateOne({ _id: postId }, { $pull: { reactions: { userId } } });
        
        const post = await postModel.findByIdAndUpdate(
            postId,
            { $push: { reactions: { userId, type } } },
            { new: true }
        );

        // Notify the post owner if it's someone else's reaction
        if (targetPost && targetPost.userId.toString() !== userId.toString()) {
            await notificationModel.create({
                recipientId: targetPost.userId as any, // FIXED: was userId
                senderId: userId as any,
                title: "New Reaction",
                body: `Someone reacted with ${type} to your post`,
                type: "post_react" 
            });
        }

        return { data: { post } };
    },

    // 4. Hard Delete
    hardDelete: async (postId: any) => {
        const post = await postModel.findOneAndDelete({ _id: postId });
        await commentModel.deleteMany({ postId });
        return { data: { post } };
    },

    // 5. Add Comment + Trigger Notification
    addComment: async ({ text, postId, userId }: { text: string; postId: any; userId: any }) => {
        const comment = await commentModel.create({ text, postId, userId });
        const targetPost = await postModel.findById(postId);

        // Notify the post owner if it's someone else's comment
        if (targetPost && targetPost.userId.toString() !== userId.toString()) {
            await notificationModel.create({
                recipientId: targetPost.userId as any, // FIXED: was userId
                senderId: userId as any,
                title: "New Comment",
                body: `Someone commented: "${text.substring(0, 20)}${text.length > 20 ? '...' : ''}"`,
                type: "post_comment"
            });
        }

        return { data: { comment } };
    },

    // 6. Get Comments
    getPostComments: async (postId: any) => {
        const comments = await commentModel.find({ postId }).populate("userId", "name");
        return { data: { comments } };
    },

    // 7. Soft Delete Comment
    softDeleteComment: async (commentId: any, userId: any) => {
        const comment = await commentModel.findOneAndUpdate(
            { _id: commentId, userId },
            { isDeleted: true },
            { new: true }
        );
        return { data: { comment } };
    }
};