import { Router, type Router as RouterType } from 'express';
import { auth } from '../../middlewares/auth.middleware';
import { successRes } from '../../utils/success.res';
import { IRequest } from '../../utils/types/req.types';
import { storyService } from './story.service';

const router: RouterType = Router();

export const routes = {
    base: "/stories",
    create: "/",
    getAll: "/all"
};

// 1. Create Story (Vanishes in 24h via Redis)
router.post(routes.create, auth, async (req, res, next) => {
    try {
        const { user } = req as IRequest;
        if (!user) return next(new Error("Unauthorized"));

        const { content } = req.body;
        // userId is used for the Redis key: story:userId:timestamp
        const { data } = await storyService.create({ content, userId: user._id });
        
        return successRes({ res, data });
    } catch (error) {
        next(error);
    }
});

// 2. Get All Stories
router.get(routes.getAll, auth, async (req, res, next) => {
    try {
        const { data } = await storyService.getAll();
        return successRes({ res, data });
    } catch (error) {
        next(error);
    }
});

export default router;