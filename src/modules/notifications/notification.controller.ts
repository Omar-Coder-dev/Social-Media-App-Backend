import { Router, type Router as RouterType } from 'express';
import { auth } from '../../middlewares/auth.middleware';
import { successRes } from '../../utils/success.res';
import { IRequest } from '../../utils/types/req.types';
import { notificationService } from './notification.service';
import { RoleEnum } from '../users/user.type';

const router: RouterType = Router();

export const routes = {
    base: "/notifications",
    send: "/admin/send",
    myNotifications: "/me"
};

// 1. ADMIN ONLY: Create & Send Notification Blast
router.post(routes.send, auth, async (req, res, next) => {
    try {
        const { user } = req as IRequest;
        
        // Requirement Check: Notification created by admin only
        if (!user || user.role !== RoleEnum.admin) {
            return next(new Error("Forbidden: Admin access required"));
        }

        const { title, body } = req.body;
        const { data } = await notificationService.createAdminBlast({ 
            title, 
            body, 
            adminId: user._id 
        });

        return successRes({ res, data });
    } catch (error) {
        next(error);
    }
});

// 2. USER: Get my notification list (History)
router.get(routes.myNotifications, auth, async (req, res, next) => {
    try {
        const { user } = req as IRequest;
        if (!user) return next(new Error("Unauthorized"));

        const { data } = await notificationService.getNotifications(user._id);
        return successRes({ res, data });
    } catch (error) {
        next(error);
    }
});

export default router;