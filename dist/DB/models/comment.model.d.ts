import mongoose from "mongoose";
declare const commentModel: mongoose.Model<{
    isDeleted: boolean;
    text: string;
    userId: mongoose.Types.ObjectId;
    postId: mongoose.Types.ObjectId;
} & mongoose.DefaultTimestampProps, {}, {}, {
    id: string;
}, mongoose.Document<unknown, {}, {
    isDeleted: boolean;
    text: string;
    userId: mongoose.Types.ObjectId;
    postId: mongoose.Types.ObjectId;
} & mongoose.DefaultTimestampProps, {
    id: string;
}, {
    timestamps: true;
}> & Omit<{
    isDeleted: boolean;
    text: string;
    userId: mongoose.Types.ObjectId;
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
    isDeleted: boolean;
    text: string;
    userId: mongoose.Types.ObjectId;
    postId: mongoose.Types.ObjectId;
} & mongoose.DefaultTimestampProps, mongoose.Document<unknown, {}, {
    isDeleted: boolean;
    text: string;
    userId: mongoose.Types.ObjectId;
    postId: mongoose.Types.ObjectId;
} & mongoose.DefaultTimestampProps, {
    id: string;
}, Omit<mongoose.DefaultSchemaOptions, "timestamps"> & {
    timestamps: true;
}> & Omit<{
    isDeleted: boolean;
    text: string;
    userId: mongoose.Types.ObjectId;
    postId: mongoose.Types.ObjectId;
} & mongoose.DefaultTimestampProps & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}, unknown, {
    isDeleted: boolean;
    text: string;
    userId: mongoose.Types.ObjectId;
    postId: mongoose.Types.ObjectId;
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>, {
    isDeleted: boolean;
    text: string;
    userId: mongoose.Types.ObjectId;
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