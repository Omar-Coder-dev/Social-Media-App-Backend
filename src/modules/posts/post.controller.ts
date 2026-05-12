import { Router, type Router as RouterType } from 'express';
import { auth } from '../../middlewares/auth.middleware';
import { successRes } from '../../utils/success.res';
import { IRequest } from '../../utils/types/req.types';
import { postService } from './post.service';

const router: RouterType = Router();

export const routes = {
    base: "/posts",
    create: "/",
    feed: "/feed",
    react: "/react/:postId",
    delete: "/:postId",
    addComment: "/comment/:postId",
    getComments: "/comments/:postId"
};

// 1. Create Post
router.post(routes.create, auth, async (req, res, next) => {
    try {
        const { user } = req as IRequest;
        if (!user) return next(new Error("Unauthorized")); // Solves 'possibly undefined'

        const { content } = req.body;
        const { data } = await postService.create({ content, userId: user._id });
        return successRes({ res, data });
    } catch (error) {
        next(error);
    }
});

// 2. Get News Feed
router.get(routes.feed, auth, async (req, res, next) => {
    try {
        const { data } = await postService.getFeed();
        return successRes({ res, data });
    } catch (error) {
        next(error);
    }
});

// 3. React (Emoji)
router.post(routes.react, auth, async (req, res, next) => {
    try {
        const { user } = req as IRequest;
        if (!user) return next(new Error("Unauthorized"));

        const { type } = req.body;
        const { postId } = req.params as any; // Cast to any to bypass TS string[] check
        
        const { data } = await postService.react({ postId, userId: user._id, type });
        return successRes({ res, data });
    } catch (error) {
        next(error);
    }
});

// 4. Delete (Hard delete triggers cascade)
router.delete(routes.delete, auth, async (req, res, next) => {
    try {
        const { postId } = req.params as any;
        const { data } = await postService.hardDelete(postId);
        return successRes({ res, data });
    } catch (error) {
        next(error);
    }
});
router.post(routes.addComment, auth, async (req, res, next) => {
    try {
        const { user } = req as IRequest;
        if (!user) return next(new Error("Unauthorized"));
        const { text } = req.body;
        const { postId } = req.params as any;
        const { data } = await postService.addComment({ text, postId, userId: user._id });
        return successRes({ res, data });
    } catch (error) {
        next(error);
    }
});

// 2. Get Comments for a Post
router.get(routes.getComments, auth, async (req, res, next) => {
    try {
        const { postId } = req.params as any;
        const { data } = await postService.getPostComments(postId);
        return successRes({ res, data });
    } catch (error) {
        next(error);
    }
});

export default router;