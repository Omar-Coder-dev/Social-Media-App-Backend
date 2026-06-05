import mongoose, { Types } from "mongoose";
export declare enum ReactionEnum {
    like = "like",
    love = "love",
    haha = "haha",
    wow = "wow",
    sad = "sad",
    angry = "angry"
}
declare const postModel: mongoose.Model<{
    isDeleted: boolean;
    userId: Types.ObjectId;
    content: string;
    reactions: Types.DocumentArray<{
        type: ReactionEnum;
        userId?: Types.ObjectId | null;
    }, Types.Subdocument<mongoose.mongo.ObjectId, unknown, {
        type: ReactionEnum;
        userId?: Types.ObjectId | null;
    }, {}, {}> & {
        type: ReactionEnum;
        userId?: Types.ObjectId | null;
    }>;
} & mongoose.DefaultTimestampProps, {}, {}, {
    id: string;
}, mongoose.Document<unknown, {}, {
    isDeleted: boolean;
    userId: Types.ObjectId;
    content: string;
    reactions: Types.DocumentArray<{
        type: ReactionEnum;
        userId?: Types.ObjectId | null;
    }, Types.Subdocument<mongoose.mongo.ObjectId, unknown, {
        type: ReactionEnum;
        userId?: Types.ObjectId | null;
    }, {}, {}> & {
        type: ReactionEnum;
        userId?: Types.ObjectId | null;
    }>;
} & mongoose.DefaultTimestampProps, {
    id: string;
}, {
    timestamps: true;
}> & Omit<{
    isDeleted: boolean;
    userId: Types.ObjectId;
    content: string;
    reactions: Types.DocumentArray<{
        type: ReactionEnum;
        userId?: Types.ObjectId | null;
    }, Types.Subdocument<mongoose.mongo.ObjectId, unknown, {
        type: ReactionEnum;
        userId?: Types.ObjectId | null;
    }, {}, {}> & {
        type: ReactionEnum;
        userId?: Types.ObjectId | null;
    }>;
} & mongoose.DefaultTimestampProps & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}, mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any, any>, {}, {}, {}, {}, {
    timestamps: true;
}, {
    isDeleted: boolean;
    userId: Types.ObjectId;
    content: string;
    reactions: Types.DocumentArray<{
        type: ReactionEnum;
        userId?: Types.ObjectId | null;
    }, Types.Subdocument<mongoose.mongo.ObjectId, unknown, {
        type: ReactionEnum;
        userId?: Types.ObjectId | null;
    }, {}, {}> & {
        type: ReactionEnum;
        userId?: Types.ObjectId | null;
    }>;
} & mongoose.DefaultTimestampProps, mongoose.Document<unknown, {}, {
    isDeleted: boolean;
    userId: Types.ObjectId;
    content: string;
    reactions: Types.DocumentArray<{
        type: ReactionEnum;
        userId?: Types.ObjectId | null;
    }, Types.Subdocument<mongoose.mongo.ObjectId, unknown, {
        type: ReactionEnum;
        userId?: Types.ObjectId | null;
    }, {}, {}> & {
        type: ReactionEnum;
        userId?: Types.ObjectId | null;
    }>;
} & mongoose.DefaultTimestampProps, {
    id: string;
}, Omit<mongoose.DefaultSchemaOptions, "timestamps"> & {
    timestamps: true;
}> & Omit<{
    isDeleted: boolean;
    userId: Types.ObjectId;
    content: string;
    reactions: Types.DocumentArray<{
        type: ReactionEnum;
        userId?: Types.ObjectId | null;
    }, Types.Subdocument<mongoose.mongo.ObjectId, unknown, {
        type: ReactionEnum;
        userId?: Types.ObjectId | null;
    }, {}, {}> & {
        type: ReactionEnum;
        userId?: Types.ObjectId | null;
    }>;
} & mongoose.DefaultTimestampProps & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}, unknown, {
    isDeleted: boolean;
    userId: Types.ObjectId;
    content: string;
    reactions: Types.DocumentArray<{
        type: ReactionEnum;
        userId?: Types.ObjectId | null;
    }, Types.Subdocument<mongoose.mongo.ObjectId, unknown, {
        type: ReactionEnum;
        userId?: Types.ObjectId | null;
    }, {}, {}> & {
        type: ReactionEnum;
        userId?: Types.ObjectId | null;
    }>;
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    _id: Types.ObjectId;
} & {
    __v: number;
}>, {
    isDeleted: boolean;
    userId: Types.ObjectId;
    content: string;
    reactions: Types.DocumentArray<{
        type: ReactionEnum;
        userId?: Types.ObjectId | null;
    }, Types.Subdocument<mongoose.mongo.ObjectId, unknown, {
        type: ReactionEnum;
        userId?: Types.ObjectId | null;
    }, {}, {}> & {
        type: ReactionEnum;
        userId?: Types.ObjectId | null;
    }>;
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    _id: Types.ObjectId;
} & {
    __v: number;
}>;
export default postModel;
//# sourceMappingURL=post.model.d.ts.map