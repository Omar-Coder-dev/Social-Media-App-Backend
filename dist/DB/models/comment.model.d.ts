import mongoose from "mongoose";
declare const commentModel: mongoose.Model<{
    userId: mongoose.Types.ObjectId;
    text: string;
    isDeleted: boolean;
    postId: mongoose.Types.ObjectId;
} & mongoose.DefaultTimestampProps, {}, {}, {
    id: string;
}, mongoose.Document<unknown, {}, {
    userId: mongoose.Types.ObjectId;
    text: string;
    isDeleted: boolean;
    postId: mongoose.Types.ObjectId;
} & mongoose.DefaultTimestampProps, {
    id: string;
}, {
    timestamps: true;
}> & Omit<{
    userId: mongoose.Types.ObjectId;
    text: string;
    isDeleted: boolean;
    postId: mongoose.Types.ObjectId;
} & mongoose.DefaultTimestampProps & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}, mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any, any>, {}, {}, {}, {}, {
    timestamps: true;
}, {
    userId: mongoose.Types.ObjectId;
    text: string;
    isDeleted: boolean;
    postId: mongoose.Types.ObjectId;
} & mongoose.DefaultTimestampProps, mongoose.Document<unknown, {}, {
    userId: mongoose.Types.ObjectId;
    text: string;
    isDeleted: boolean;
    postId: mongoose.Types.ObjectId;
} & mongoose.DefaultTimestampProps, {
    id: string;
}, Omit<mongoose.DefaultSchemaOptions, "timestamps"> & {
    timestamps: true;
}> & Omit<{
    userId: mongoose.Types.ObjectId;
    text: string;
    isDeleted: boolean;
    postId: mongoose.Types.ObjectId;
} & mongoose.DefaultTimestampProps & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}, unknown, {
    userId: mongoose.Types.ObjectId;
    text: string;
    isDeleted: boolean;
    postId: mongoose.Types.ObjectId;
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>, {
    userId: mongoose.Types.ObjectId;
    text: string;
    isDeleted: boolean;
    postId: mongoose.Types.ObjectId;
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>;
export default commentModel;
//# sourceMappingURL=comment.model.d.ts.map