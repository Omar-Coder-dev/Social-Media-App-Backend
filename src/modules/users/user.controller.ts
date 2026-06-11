import { Router, type Router as RouterType } from 'express'
import { validation } from '../../middlewares/validation.middleware'
import { confirmEmailSchema, loginSchema, signupSchema } from './user.validation'
import { userService } from './user.service'
import { successRes } from '../../utils/success.res'
import { auth } from '../../middlewares/auth.middleware'
import { IRequest } from '../../utils/types/req.types'
import {userModel} from '../../DB/models/user.model'
import { chatModel } from '../../DB/models/chat.model'
import {groupModel} from '../../DB/models/group.model'

const router: RouterType = Router()

export const routes = {
    base: "/users",
    signup: "/signup",
    confirmEmail: "/confirm-email",
    login: "/login",
    profile: "/me"
}

router.post(routes.signup, validation(signupSchema),
    async (req, res, next) => {
        const { name, email, gender, password, confirmPassword, age, phone } = req.body
        const { data } = await userService.signup({ name, email, gender, password, confirmPassword, age, phone })
        return successRes({ res, data })
    }
)

router.patch(routes.confirmEmail, validation(confirmEmailSchema),
    async (req, res, next) => {
        const { email, otp } = req.body
        const { data } = await userService.confirmEmail({ email, otp })
        return successRes({ res, data })
    }
)

router.post(routes.login, validation(loginSchema), async (req, res, next) => {
    const { email, password } = req.body
    const { data } = await userService.login({email, password})
    return successRes({ res, data })
})

router.get("/me", auth, async (req, res) => {
    try {
        const reqWithUser = req as IRequest;
        if (!reqWithUser.user) return res.status(401).json({ message: "Unauthorized" });

        const populatedUser = await userModel.findById(reqWithUser.user._id)
            .populate({
                path: 'friends',
                select: '_id name profilePicture'
            });

        // 🟢 FETCH GROUPS HERE:
        const allGroups = await groupModel.find(); 

        const userPayload = populatedUser ? populatedUser.toObject() : {};

        return successRes({
            res,
            data: {
                user: userPayload,
                groups: allGroups // 🟢 Now it will send the data instead of []
            }
        });
    } catch (error: any) {
        console.error("ERROR IN /ME ROUTE:", error.message);
        return successRes({ res, data: { user: {}, groups: [] } });
    }
});

router.post("/friend-request/send/:recipientId", auth, async (req, res) => {
    try {
        const { user } = req as IRequest;
        const { recipientId } = req.params;

        if (!user) return res.status(401).json({ message: "Unauthorized" });
        if (!recipientId || typeof recipientId !== "string") {
            return res.status(400).json({ message: "Invalid recipient ID" });
        }

        const result = await userService.sendFriendRequest(user._id.toString(), recipientId);
        return successRes({ res, data: result });
    } catch (error: any) {
        return res.status(error.status || 500).json({ message: error.message });
    }
});

router.post("/friend-request/accept/:senderId", auth, async (req, res) => {
    try {
        const { user } = req as IRequest;
        const { senderId } = req.params;

        if (!user) return res.status(401).json({ message: "Unauthorized" });
        if (!senderId || typeof senderId !== "string") {
            return res.status(400).json({ message: "Invalid sender ID" });
        }

        const result = await userService.acceptFriendRequest(user._id.toString(), senderId);
        return successRes({ res, data: result });
    } catch (error: any) {
        return res.status(error.status || 500).json({ message: error.message });
    }
});

router.post("/friend-request/reject/:senderId", auth, async (req, res) => {
    try {
        const { user } = req as IRequest;
        const { senderId } = req.params;

        if (!user) return res.status(401).json({ message: "Unauthorized" });
        if (!senderId || typeof senderId !== "string") {
            return res.status(400).json({ message: "Invalid sender ID" });
        }

        const result = await userService.rejectFriendRequest(user._id.toString(), senderId);
        return successRes({ res, data: result });
    } catch (error: any) {
        return res.status(error.status || 500).json({ message: error.message });
    }
});
router.get("/:userId/chat", auth, async (req, res) => {
    try {
        const reqWithUser = req as IRequest;
        if (!reqWithUser.user) return res.status(401).json({ message: "Unauthorized" });

        const currentUserId = reqWithUser.user._id;
        const targetFriendId = req.params.userId;

        // 🟢 Using explicit cast to match your MongoDB layout exactly
        const chatInstance = await chatModel.findOne({
            participants: { $all: [currentUserId, targetFriendId] }
        });

        if (!chatInstance) {
            return successRes({ res, data: { chat: null } });
        }

        const totalMessages = chatInstance.messages.length;
        const slicedMessages = chatInstance.messages.slice(-20); // Keep it dead simple for tonight

        const chatPayload = {
            _id: chatInstance._id,
            participants: chatInstance.participants,
            messages: slicedMessages,
            totalMessages
        };

        return successRes({ res, data: { chat: chatPayload } });
    } catch (error: any) {
        return res.status(500).json({ message: "Error" });
    }
});
export default router