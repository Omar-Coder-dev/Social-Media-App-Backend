import notificationModel from "../../DB/models/notification.model";
import { messaging } from "../../utils/firebase/firebase.config";

export const notificationService = {
    // Admin creates a notification for everyone (Facebook Blast)
    createAdminBlast: async ({ title, body, adminId }: { title: string, body: string, adminId: any }) => {
        // 1. Save to DB history
        const notification = await notificationModel.create({
            title,
            body,
            type: "admin_blast",
            senderId: adminId
        });

        // 2. Send via FCM (to a topic called 'broadcast')
        await messaging.send({
            notification: { title, body },
            topic: "broadcast"
        });

        return { data: { notification } };
    },

    // User gets their notification list
    getNotifications: async (userId: any) => {
        const notifications = await notificationModel.find({
            $or: [{ recipientId: userId }, { type: "admin_blast" }]
        }).sort({ createdAt: -1 });
        
        return { data: { notifications } };
    }
};