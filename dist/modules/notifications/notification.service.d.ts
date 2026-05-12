export declare const notificationService: {
    createAdminBlast: ({ title, body, adminId }: {
        title: string;
        body: string;
        adminId: any;
    }) => Promise<{
        data: {
            notification: import("mongoose").Document<unknown, {}, {
                title: string;
                body: string;
                type: "admin_blast" | "post_react" | "post_comment";
                isRead: boolean;
                recipientId?: import("mongoose").Types.ObjectId | null;
                senderId?: import("mongoose").Types.ObjectId | null;
            } & import("mongoose").DefaultTimestampProps, {
                id: string;
            }, {
                timestamps: true;
            }> & Omit<{
                title: string;
                body: string;
                type: "admin_blast" | "post_react" | "post_comment";
                isRead: boolean;
                recipientId?: import("mongoose").Types.ObjectId | null;
                senderId?: import("mongoose").Types.ObjectId | null;
            } & import("mongoose").DefaultTimestampProps & {
                _id: import("mongoose").Types.ObjectId;
            } & {
                __v: number;
            }, "id"> & {
                id: string;
            };
        };
    }>;
    getNotifications: (userId: any) => Promise<{
        data: {
            notifications: (import("mongoose").Document<unknown, {}, {
                title: string;
                body: string;
                type: "admin_blast" | "post_react" | "post_comment";
                isRead: boolean;
                recipientId?: import("mongoose").Types.ObjectId | null;
                senderId?: import("mongoose").Types.ObjectId | null;
            } & import("mongoose").DefaultTimestampProps, {
                id: string;
            }, {
                timestamps: true;
            }> & Omit<{
                title: string;
                body: string;
                type: "admin_blast" | "post_react" | "post_comment";
                isRead: boolean;
                recipientId?: import("mongoose").Types.ObjectId | null;
                senderId?: import("mongoose").Types.ObjectId | null;
            } & import("mongoose").DefaultTimestampProps & {
                _id: import("mongoose").Types.ObjectId;
            } & {
                __v: number;
            }, "id"> & {
                id: string;
            })[];
        };
    }>;
};
//# sourceMappingURL=notification.service.d.ts.map