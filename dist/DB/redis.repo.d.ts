import { Types } from "mongoose";
export declare const revokeTokenKeyPrefix: ({ userId }: {
    userId: string | Types.ObjectId;
}) => string;
export declare const revokeTokenKey: ({ userId, jti }: {
    userId: string | Types.ObjectId;
    jti: string;
}) => string;
export declare const ConfirmEmailKeyPrefix: ({ userId }: {
    userId: Types.ObjectId;
}) => string;
export declare const forgetPasswordKeyPrefix: ({ userId }: {
    userId: string;
}) => string;
export declare const update: ({ key, value, ttl }: {
    key: string;
    value: object | string;
    ttl: number | null;
}) => Promise<string | false | null | undefined>;
export declare const set: ({ key, value, ttl }: {
    key: string;
    value: object | string;
    ttl: number | null;
}) => Promise<string | null | undefined>;
export declare const get: ({ key }: {
    key: string;
}) => Promise<any>;
export declare const deleteKey: ({ key }: {
    key: string;
}) => Promise<number | undefined>;
//# sourceMappingURL=redis.repo.d.ts.map