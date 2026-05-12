import { Schema, Types } from "mongoose";
declare const notificationModel: import("mongoose").Model<{
    body: string;
    type: "admin_blast" | "post_react" | "post_comment";
    title: string;
    isRead: boolean;
    recipientId?: Types.ObjectId | null;
    senderId?: Types.ObjectId | null;
} & import("mongoose").DefaultTimestampProps, {}, {}, {
    id: string;
}, import("mongoose").Document<unknown, {}, {
    body: string;
    type: "admin_blast" | "post_react" | "post_comment";
    title: string;
    isRead: boolean;
    recipientId?: Types.ObjectId | null;
    senderId?: Types.ObjectId | null;
} & import("mongoose").DefaultTimestampProps, {
    id: string;
}, {
    timestamps: true;
}> & Omit<{
    body: string;
    type: "admin_blast" | "post_react" | "post_comment";
    title: string;
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
    body: string;
    type: "admin_blast" | "post_react" | "post_comment";
    title: string;
    isRead: boolean;
    recipientId?: Types.ObjectId | null;
    senderId?: Types.ObjectId | null;
} & import("mongoose").DefaultTimestampProps, import("mongoose").Document<unknown, {}, {
    body: string;
    type: "admin_blast" | "post_react" | "post_comment";
    title: string;
    isRead: boolean;
    recipientId?: Types.ObjectId | null;
    senderId?: Types.ObjectId | null;
} & import("mongoose").DefaultTimestampProps, {
    id: string;
}, Omit<import("mongoose").DefaultSchemaOptions, "timestamps"> & {
    timestamps: true;
}> & Omit<{
    body: string;
    type: "admin_blast" | "post_react" | "post_comment";
    title: string;
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
    body: string;
    type: "admin_blast" | "post_react" | "post_comment";
    title: string;
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
    body: string;
    type: "admin_blast" | "post_react" | "post_comment";
    title: string;
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