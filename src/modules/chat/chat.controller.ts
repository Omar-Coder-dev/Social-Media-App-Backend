import { Router, Request, Response } from "express";
import { chatModel } from "../../DB/models/chat.model";
import { groupModel } from "../../DB/models/group.model";
import { IRequest } from "../../utils/types/req.types";
import { auth } from "../../middlewares/auth.middleware";
import { successRes } from "../../utils/success.res";

const router = Router();


router.get("/user/:userId", auth, async (req: Request, res: Response) => {
    try {
        const reqWithUser = req as IRequest;
        
        if (!reqWithUser.user || !reqWithUser.user._id) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        const currentUserId = reqWithUser.user._id;
        const targetFriendId = req.params.userId;

        const chat = await chatModel.findOne({
            participants: { $all: [currentUserId, targetFriendId] }
        }).populate("participants", "name profilePicture");

        return successRes({ res, data: { chat: chat || null } });
    } catch (error) {
        res.status(500).json({ message: "Error fetching private chat" });
    }
});

// 🟢 Group Chat Route
router.get("/group/:groupId", auth, async (req: Request, res: Response) => {
    try {
        const { groupId } = req.params;

        const chat = await groupModel.findById(groupId).populate({
            path: "messages.createdBy",
            select: "name profilePicture"
        });

        return successRes({ res, data: { chat: chat || null } });
    } catch (error) {
        res.status(500).json({ message: "Error fetching group chat" });
    }
});

export default router;