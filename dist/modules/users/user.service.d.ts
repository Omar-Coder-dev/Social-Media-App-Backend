import { confirmEmailDTO, loginDTO, signupDTO } from "./user.type";
declare class userServices {
    private userRepo;
    private OTP_TTL;
    private OTP_MAX_ATTEMPTS;
    signup(body: signupDTO): Promise<{
        message: string;
        data: {
            user: {
                id: import("mongoose").Types.ObjectId;
                name: string;
                email: string;
                gender: import("./user.type").GenderEnum;
            };
        };
    }>;
    confirmEmail({ email, otp }: confirmEmailDTO): Promise<{
        message: string;
        data: {
            user: import("mongoose").Document<unknown, {}, import("./user.type").IUser, {}, import("mongoose").DefaultSchemaOptions> & import("./user.type").IUser & {
                _id: import("mongoose").Types.ObjectId;
            } & {
                __v: number;
            } & {
                id: string;
            };
        };
    }>;
    login({ email, password }: loginDTO): Promise<{
        data: {
            accessToken: string;
            refreshToken: string;
        };
    }>;
    sendFriendRequest(senderId: string, recipientId: string): Promise<{
        message: string;
    }>;
    acceptFriendRequest(receiverId: string, senderId: string): Promise<{
        message: string;
    }>;
    rejectFriendRequest(receiverId: string, senderId: string): Promise<{
        message: string;
    }>;
}
export declare const userService: userServices;
export {};
//# sourceMappingURL=user.service.d.ts.map