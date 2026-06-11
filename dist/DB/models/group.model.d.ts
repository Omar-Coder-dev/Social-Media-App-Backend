import mongoose from "mongoose";
export declare const groupModel: mongoose.Model<{
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
    group: string;
    group_image: string;
    roomId: string;
    members: mongoose.Types.ObjectId[];
} & mongoose.DefaultTimestampProps, {}, {}, {
    id: string;
}, mongoose.Document<unknown, {}, {
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
    group: string;
    group_image: string;
    roomId: string;
    members: mongoose.Types.ObjectId[];
} & mongoose.DefaultTimestampProps, {
    id: string;
}, {
    timestamps: true;
}> & Omit<{
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
    group: string;
    group_image: string;
    roomId: string;
    members: mongoose.Types.ObjectId[];
} & mongoose.DefaultTimestampProps & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}, mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any, any>, {}, {}, {}, {}, {
    timestamps: true;
}, {
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
    group: string;
    group_image: string;
    roomId: string;
    members: mongoose.Types.ObjectId[];
} & mongoose.DefaultTimestampProps, mongoose.Document<unknown, {}, {
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
    group: string;
    group_image: string;
    roomId: string;
    members: mongoose.Types.ObjectId[];
} & mongoose.DefaultTimestampProps, {
    id: string;
}, Omit<mongoose.DefaultSchemaOptions, "timestamps"> & {
    timestamps: true;
}> & Omit<{
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
    group: string;
    group_image: string;
    roomId: string;
    members: mongoose.Types.ObjectId[];
} & mongoose.DefaultTimestampProps & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}, unknown, {
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
    group: string;
    group_image: string;
    roomId: string;
    members: mongoose.Types.ObjectId[];
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>, {
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
    group: string;
    group_image: string;
    roomId: string;
    members: mongoose.Types.ObjectId[];
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>;
export default groupModel;
//# sourceMappingURL=group.model.d.ts.map