import mongoose from "mongoose";
export declare const chatModel: mongoose.Model<{
    participants: mongoose.Types.ObjectId[];
    messages: mongoose.Types.DocumentArray<{
        content: string;
        createdAt: NativeDate;
        createdBy: mongoose.Types.ObjectId;
    }, mongoose.Types.Subdocument<mongoose.mongo.ObjectId, unknown, {
        content: string;
        createdAt: NativeDate;
        createdBy: mongoose.Types.ObjectId;
    }, {}, {}> & {
        content: string;
        createdAt: NativeDate;
        createdBy: mongoose.Types.ObjectId;
    }>;
} & mongoose.DefaultTimestampProps, {}, {}, {
    id: string;
}, mongoose.Document<unknown, {}, {
    participants: mongoose.Types.ObjectId[];
    messages: mongoose.Types.DocumentArray<{
        content: string;
        createdAt: NativeDate;
        createdBy: mongoose.Types.ObjectId;
    }, mongoose.Types.Subdocument<mongoose.mongo.ObjectId, unknown, {
        content: string;
        createdAt: NativeDate;
        createdBy: mongoose.Types.ObjectId;
    }, {}, {}> & {
        content: string;
        createdAt: NativeDate;
        createdBy: mongoose.Types.ObjectId;
    }>;
} & mongoose.DefaultTimestampProps, {
    id: string;
}, {
    timestamps: true;
}> & Omit<{
    participants: mongoose.Types.ObjectId[];
    messages: mongoose.Types.DocumentArray<{
        content: string;
        createdAt: NativeDate;
        createdBy: mongoose.Types.ObjectId;
    }, mongoose.Types.Subdocument<mongoose.mongo.ObjectId, unknown, {
        content: string;
        createdAt: NativeDate;
        createdBy: mongoose.Types.ObjectId;
    }, {}, {}> & {
        content: string;
        createdAt: NativeDate;
        createdBy: mongoose.Types.ObjectId;
    }>;
} & mongoose.DefaultTimestampProps & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}, mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any, any>, {}, {}, {}, {}, {
    timestamps: true;
}, {
    participants: mongoose.Types.ObjectId[];
    messages: mongoose.Types.DocumentArray<{
        content: string;
        createdAt: NativeDate;
        createdBy: mongoose.Types.ObjectId;
    }, mongoose.Types.Subdocument<mongoose.mongo.ObjectId, unknown, {
        content: string;
        createdAt: NativeDate;
        createdBy: mongoose.Types.ObjectId;
    }, {}, {}> & {
        content: string;
        createdAt: NativeDate;
        createdBy: mongoose.Types.ObjectId;
    }>;
} & mongoose.DefaultTimestampProps, mongoose.Document<unknown, {}, {
    participants: mongoose.Types.ObjectId[];
    messages: mongoose.Types.DocumentArray<{
        content: string;
        createdAt: NativeDate;
        createdBy: mongoose.Types.ObjectId;
    }, mongoose.Types.Subdocument<mongoose.mongo.ObjectId, unknown, {
        content: string;
        createdAt: NativeDate;
        createdBy: mongoose.Types.ObjectId;
    }, {}, {}> & {
        content: string;
        createdAt: NativeDate;
        createdBy: mongoose.Types.ObjectId;
    }>;
} & mongoose.DefaultTimestampProps, {
    id: string;
}, Omit<mongoose.DefaultSchemaOptions, "timestamps"> & {
    timestamps: true;
}> & Omit<{
    participants: mongoose.Types.ObjectId[];
    messages: mongoose.Types.DocumentArray<{
        content: string;
        createdAt: NativeDate;
        createdBy: mongoose.Types.ObjectId;
    }, mongoose.Types.Subdocument<mongoose.mongo.ObjectId, unknown, {
        content: string;
        createdAt: NativeDate;
        createdBy: mongoose.Types.ObjectId;
    }, {}, {}> & {
        content: string;
        createdAt: NativeDate;
        createdBy: mongoose.Types.ObjectId;
    }>;
} & mongoose.DefaultTimestampProps & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}, unknown, {
    participants: mongoose.Types.ObjectId[];
    messages: mongoose.Types.DocumentArray<{
        content: string;
        createdAt: NativeDate;
        createdBy: mongoose.Types.ObjectId;
    }, mongoose.Types.Subdocument<mongoose.mongo.ObjectId, unknown, {
        content: string;
        createdAt: NativeDate;
        createdBy: mongoose.Types.ObjectId;
    }, {}, {}> & {
        content: string;
        createdAt: NativeDate;
        createdBy: mongoose.Types.ObjectId;
    }>;
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>, {
    participants: mongoose.Types.ObjectId[];
    messages: mongoose.Types.DocumentArray<{
        content: string;
        createdAt: NativeDate;
        createdBy: mongoose.Types.ObjectId;
    }, mongoose.Types.Subdocument<mongoose.mongo.ObjectId, unknown, {
        content: string;
        createdAt: NativeDate;
        createdBy: mongoose.Types.ObjectId;
    }, {}, {}> & {
        content: string;
        createdAt: NativeDate;
        createdBy: mongoose.Types.ObjectId;
    }>;
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>;
export default chatModel;
//# sourceMappingURL=chat.model.d.ts.map