import { Schema, Types } from "mongoose";
declare const notificationModel: import("mongoose").Model<{
    type: "admin_blast" | "post_react" | "post_comment";
    title: string;
    body: string;
    isRead: boolean;
    recipientId?: Types.ObjectId | null;
    senderId?: Types.ObjectId | null;
} & import("mongoose").DefaultTimestampProps, {}, {}, {
    id: string;
}, import("mongoose").Document<unknown, {}, {
    type: "admin_blast" | "post_react" | "post_comment";
    title: string;
    body: string;
    isRead: boolean;
    recipientId?: Types.ObjectId | null;
    senderId?: Types.ObjectId | null;
} & import("mongoose").DefaultTimestampProps, {
    id: string;
}, {
    timestamps: true;
}> & Omit<{
    type: "admin_blast" | "post_react" | "post_comment";
    title: string;
    body: string;
    isRead: boolean;
    recipientId?: Types.ObjectId | null;
    senderId?: Types.ObjectId | null;
} & import("mongoose").DefaultTimestampProps & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}, Schema<any, import("mongoose").Model<any, any, any, any, any, any, any>, {}, {}, {}, {}, {
    timestamps: true;
}, {
    type: "admin_blast" | "post_react" | "post_comment";
    title: string;
    body: string;
    isRead: boolean;
    recipientId?: Types.ObjectId | null;
    senderId?: Types.ObjectId | null;
} & import("mongoose").DefaultTimestampProps, import("mongoose").Document<unknown, {}, {
    type: "admin_blast" | "post_react" | "post_comment";
    title: string;
    body: string;
    isRead: boolean;
    recipientId?: Types.ObjectId | null;
    senderId?: Types.ObjectId | null;
} & import("mongoose").DefaultTimestampProps, {
    id: string;
}, Omit<import("mongoose").DefaultSchemaOptions, "timestamps"> & {
    timestamps: true;
}> & Omit<{
    type: "admin_blast" | "post_react" | "post_comment";
    title: string;
    body: string;
    isRead: boolean;
    recipientId?: Types.ObjectId | null;
    senderId?: Types.ObjectId | null;
} & import("mongoose").DefaultTimestampProps & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}, unknown, {
    type: "admin_blast" | "post_react" | "post_comment";
    title: string;
    body: string;
    isRead: boolean;
    recipientId?: Types.ObjectId | null;
    senderId?: Types.ObjectId | null;
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    _id: Types.ObjectId;
} & {
    __v: number;
}>, {
    type: "admin_blast" | "post_react" | "post_comment";
    title: string;
    body: string;
    isRead: boolean;
    recipientId?: Types.ObjectId | null;
    senderId?: Types.ObjectId | null;
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    _id: Types.ObjectId;
} & {
    __v: number;
}>;
export default notificationModel;
//# sourceMappingURL=notification.model.d.ts.map