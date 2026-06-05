import { Types } from "mongoose";
export declare const postService: {
    create: ({ content, userId }: {
        content: string;
        userId: any;
    }) => Promise<{
        data: {
            post: import("mongoose").Document<unknown, {}, {
                isDeleted: boolean;
                userId: Types.ObjectId;
                content: string;
                reactions: Types.DocumentArray<{
                    type: import("../../DB/models/post.model").ReactionEnum;
                    userId?: Types.ObjectId | null;
                }, Types.Subdocument<import("mongodb").ObjectId, unknown, {
                    type: import("../../DB/models/post.model").ReactionEnum;
                    userId?: Types.ObjectId | null;
                }, {}, {}> & {
                    type: import("../../DB/models/post.model").ReactionEnum;
                    userId?: Types.ObjectId | null;
                }>;
            } & import("mongoose").DefaultTimestampProps, {
                id: string;
            }, {
                timestamps: true;
            }> & Omit<{
                isDeleted: boolean;
                userId: Types.ObjectId;
                content: string;
                reactions: Types.DocumentArray<{
                    type: import("../../DB/models/post.model").ReactionEnum;
                    userId?: Types.ObjectId | null;
                }, Types.Subdocument<import("mongodb").ObjectId, unknown, {
                    type: import("../../DB/models/post.model").ReactionEnum;
                    userId?: Types.ObjectId | null;
                }, {}, {}> & {
                    type: import("../../DB/models/post.model").ReactionEnum;
                    userId?: Types.ObjectId | null;
                }>;
            } & import("mongoose").DefaultTimestampProps & {
                _id: Types.ObjectId;
            } & {
                __v: number;
            }, "id"> & {
                id: string;
            };
        };
    }>;
    getFeed: () => Promise<{
        data: {
            posts: (import("mongoose").Document<unknown, {}, {
                isDeleted: boolean;
                userId: Types.ObjectId;
                content: string;
                reactions: Types.DocumentArray<{
                    type: import("../../DB/models/post.model").ReactionEnum;
                    userId?: Types.ObjectId | null;
                }, Types.Subdocument<import("mongodb").ObjectId, unknown, {
                    type: import("../../DB/models/post.model").ReactionEnum;
                    userId?: Types.ObjectId | null;
                }, {}, {}> & {
                    type: import("../../DB/models/post.model").ReactionEnum;
                    userId?: Types.ObjectId | null;
                }>;
            } & import("mongoose").DefaultTimestampProps, {
                id: string;
            }, {
                timestamps: true;
            }> & Omit<{
                isDeleted: boolean;
                userId: Types.ObjectId;
                content: string;
                reactions: Types.DocumentArray<{
                    type: import("../../DB/models/post.model").ReactionEnum;
                    userId?: Types.ObjectId | null;
                }, Types.Subdocument<import("mongodb").ObjectId, unknown, {
                    type: import("../../DB/models/post.model").ReactionEnum;
                    userId?: Types.ObjectId | null;
                }, {}, {}> & {
                    type: import("../../DB/models/post.model").ReactionEnum;
                    userId?: Types.ObjectId | null;
                }>;
            } & import("mongoose").DefaultTimestampProps & {
                _id: Types.ObjectId;
            } & {
                __v: number;
            }, "id"> & {
                id: string;
            })[];
        };
    }>;
    react: ({ postId, userId, type }: {
        postId: any;
        userId: any;
        type: string;
    }) => Promise<{
        data: {
            post: (import("mongoose").Document<unknown, {}, {
                isDeleted: boolean;
                userId: Types.ObjectId;
                content: string;
                reactions: Types.DocumentArray<{
                    type: import("../../DB/models/post.model").ReactionEnum;
                    userId?: Types.ObjectId | null;
                }, Types.Subdocument<import("mongodb").ObjectId, unknown, {
                    type: import("../../DB/models/post.model").ReactionEnum;
                    userId?: Types.ObjectId | null;
                }, {}, {}> & {
                    type: import("../../DB/models/post.model").ReactionEnum;
                    userId?: Types.ObjectId | null;
                }>;
            } & import("mongoose").DefaultTimestampProps, {
                id: string;
            }, {
                timestamps: true;
            }> & Omit<{
                isDeleted: boolean;
                userId: Types.ObjectId;
                content: string;
                reactions: Types.DocumentArray<{
                    type: import("../../DB/models/post.model").ReactionEnum;
                    userId?: Types.ObjectId | null;
                }, Types.Subdocument<import("mongodb").ObjectId, unknown, {
                    type: import("../../DB/models/post.model").ReactionEnum;
                    userId?: Types.ObjectId | null;
                }, {}, {}> & {
                    type: import("../../DB/models/post.model").ReactionEnum;
                    userId?: Types.ObjectId | null;
                }>;
            } & import("mongoose").DefaultTimestampProps & {
                _id: Types.ObjectId;
            } & {
                __v: number;
            }, "id"> & {
                id: string;
            }) | null;
        };
    }>;
    hardDelete: (postId: any) => Promise<{
        data: {
            post: (import("mongoose").Document<unknown, {}, {
                isDeleted: boolean;
                userId: Types.ObjectId;
                content: string;
                reactions: Types.DocumentArray<{
                    type: import("../../DB/models/post.model").ReactionEnum;
                    userId?: Types.ObjectId | null;
                }, Types.Subdocument<import("mongodb").ObjectId, unknown, {
                    type: import("../../DB/models/post.model").ReactionEnum;
                    userId?: Types.ObjectId | null;
                }, {}, {}> & {
                    type: import("../../DB/models/post.model").ReactionEnum;
                    userId?: Types.ObjectId | null;
                }>;
            } & import("mongoose").DefaultTimestampProps, {
                id: string;
            }, {
                timestamps: true;
            }> & Omit<{
                isDeleted: boolean;
                userId: Types.ObjectId;
                content: string;
                reactions: Types.DocumentArray<{
                    type: import("../../DB/models/post.model").ReactionEnum;
                    userId?: Types.ObjectId | null;
                }, Types.Subdocument<import("mongodb").ObjectId, unknown, {
                    type: import("../../DB/models/post.model").ReactionEnum;
                    userId?: Types.ObjectId | null;
                }, {}, {}> & {
                    type: import("../../DB/models/post.model").ReactionEnum;
                    userId?: Types.ObjectId | null;
                }>;
            } & import("mongoose").DefaultTimestampProps & {
                _id: Types.ObjectId;
            } & {
                __v: number;
            }, "id"> & {
                id: string;
            }) | null;
        };
    }>;
    addComment: ({ text, postId, userId }: {
        text: string;
        postId: any;
        userId: any;
    }) => Promise<{
        data: {
            comment: import("mongoose").Document<unknown, {}, {
                isDeleted: boolean;
                text: string;
                userId: Types.ObjectId;
                postId: Types.ObjectId;
            } & import("mongoose").DefaultTimestampProps, {
                id: string;
            }, {
                timestamps: true;
            }> & Omit<{
                isDeleted: boolean;
                text: string;
                userId: Types.ObjectId;
                postId: Types.ObjectId;
            } & import("mongoose").DefaultTimestampProps & {
                _id: Types.ObjectId;
            } & {
                __v: number;
            }, "id"> & {
                id: string;
            };
        };
    }>;
    getPostComments: (postId: any) => Promise<{
        data: {
            comments: (import("mongoose").Document<unknown, {}, {
                isDeleted: boolean;
                text: string;
                userId: Types.ObjectId;
                postId: Types.ObjectId;
            } & import("mongoose").DefaultTimestampProps, {
                id: string;
            }, {
                timestamps: true;
            }> & Omit<{
                isDeleted: boolean;
                text: string;
                userId: Types.ObjectId;
                postId: Types.ObjectId;
            } & import("mongoose").DefaultTimestampProps & {
                _id: Types.ObjectId;
            } & {
                __v: number;
            }, "id"> & {
                id: string;
            })[];
        };
    }>;
    softDeleteComment: (commentId: any, userId: any) => Promise<{
        data: {
            comment: (import("mongoose").Document<unknown, {}, {
                isDeleted: boolean;
                text: string;
                userId: Types.ObjectId;
                postId: Types.ObjectId;
            } & import("mongoose").DefaultTimestampProps, {
                id: string;
            }, {
                timestamps: true;
            }> & Omit<{
                isDeleted: boolean;
                text: string;
                userId: Types.ObjectId;
                postId: Types.ObjectId;
            } & import("mongoose").DefaultTimestampProps & {
                _id: Types.ObjectId;
            } & {
                __v: number;
            }, "id"> & {
                id: string;
            }) | null;
        };
    }>;
};
//# sourceMappingURL=post.service.d.ts.map