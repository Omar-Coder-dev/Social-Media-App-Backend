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
    userId: Types.ObjectId;
    isDeleted: boolean;
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
    userId: Types.ObjectId;
    isDeleted: boolean;
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
    userId: Types.ObjectId;
    isDeleted: boolean;
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
    userId: Types.ObjectId;
    isDeleted: boolean;
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
    userId: Types.ObjectId;
    isDeleted: boolean;
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
    userId: Types.ObjectId;
    isDeleted: boolean;
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
    userId: Types.ObjectId;
    isDeleted: boolean;
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
    userId: Types.ObjectId;
    isDeleted: boolean;
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