"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userService = void 0;
const config_1 = require("../../config");
const redis_repo_1 = require("../../DB/redis.repo");
const createOTP_1 = require("../../utils/email/createOTP");
const emailEvents_1 = require("../../utils/email/emailEvents");
const generateHTML_1 = require("../../utils/email/generateHTML");
const error_handle_1 = require("../../utils/errorHandle/error.handle");
const encryption_1 = require("../../utils/security/encryption/encryption");
const hash_1 = require("../../utils/security/hash/hash");
const token_1 = require("../../utils/security/token/token");
const user_repo_1 = require("./user.repo");
const crypto_1 = require("crypto");
class userServices {
    userRepo = new user_repo_1.UserRepo();
    OTP_TTL = 300;
    OTP_MAX_ATTEMPTS = 5;
    async signup(body) {
        const { name, email, gender, password, age, phone } = body;
        // 1. Check if the email already exists in MongoDB
        const userExist = await this.userRepo.findByEmail(email);
        if (userExist) {
            // A. If the user is already confirmed, block them permanently
            if (userExist.isEmailConfirmed) {
                throw new error_handle_1.BadRequestException("email already exist and is confirmed");
            }
            // B. RATE LIMIT / ANTI-SPAM: 
            // Check if an OTP key already exists in Redis for this user
            const otpKey = (0, redis_repo_1.ConfirmEmailKeyPrefix)({ userId: userExist._id });
            const existingOtp = await (0, redis_repo_1.get)({ key: otpKey });
            if (existingOtp) {
                // If the OTP is still in Redis, they are clicking signup too fast.
                throw new error_handle_1.BadRequestException("OTP already sent. Please check your email or wait a few minutes before trying again.");
            }
            // C. If not confirmed and no active OTP, delete the old unconfirmed record
            // This allows the user to "signup again" from scratch after 5 failed attempts
            await userExist.deleteOne();
        }
        // 2. Prepare user data
        const hashPassword = await (0, hash_1.createHash)(password);
        const encryptedPhone = phone ? (0, encryption_1.encryption)(phone) : undefined;
        // 3. Create the new User record
        const user = await this.userRepo.create({
            email,
            gender,
            name,
            age: age,
            phone: encryptedPhone,
            password: hashPassword,
        });
        // 4. Generate OTP and store in Redis with Attempt Counter
        const otp = (0, createOTP_1.createOTP)();
        await (0, redis_repo_1.set)({
            key: (0, redis_repo_1.ConfirmEmailKeyPrefix)({ userId: user._id }),
            value: { otp, attempts: this.OTP_MAX_ATTEMPTS }, // Store as object for the counter
            ttl: this.OTP_TTL,
        });
        // 5. Trigger Email Event
        const html = (0, generateHTML_1.generateHtml)("Confirm Your Email", user.name, otp);
        emailEvents_1.emailEvents.publish("confirm-email", {
            to: email,
            name: user.name,
            otp,
            subject: "Confirm Your Email",
            html,
        });
        // 6. Return account details and success message
        return {
            message: "Signup successful! We sent an OTP to your email. Please verify your account.",
            data: {
                user: {
                    id: user._id,
                    name: user.name,
                    email: user.email,
                    gender: user.gender
                }
            }
        };
    }
    async confirmEmail({ email, otp }) {
        const user = await this.userRepo.findByEmail(email);
        if (!user)
            throw new error_handle_1.NotFoundException("user not found");
        if (user.isEmailConfirmed)
            throw new error_handle_1.BadRequestException("email already confirmed");
        const otpKey = (0, redis_repo_1.ConfirmEmailKeyPrefix)({ userId: user._id });
        const otpData = await (0, redis_repo_1.get)({ key: otpKey });
        if (!otpData) {
            throw new error_handle_1.BadRequestException("OTP expired or max attempts reached. Go signup again.");
        }
        // 1. Check if OTP is wrong
        if (otp.toString() !== otpData.otp.toString()) {
            const newAttempts = otpData.attempts - 1;
            if (newAttempts <= 0) {
                // HIT LIMIT: Delete everything so they MUST signup from scratch
                await (0, redis_repo_1.deleteKey)({ key: otpKey });
                await user.deleteOne();
                throw new error_handle_1.BadRequestException("Max limit hit. Account reset. Please signup again.");
            }
            // Update the counter in Redis
            await (0, redis_repo_1.update)({
                key: otpKey,
                value: { otp: otpData.otp, attempts: newAttempts },
                ttl: this.OTP_TTL
            });
            throw new error_handle_1.BadRequestException(`In-valid OTP. Attempts left: ${newAttempts}`);
        }
        // 2. Success: Mark as confirmed and clean up Redis
        user.isEmailConfirmed = true;
        await user.save();
        await (0, redis_repo_1.deleteKey)({ key: otpKey });
        return {
            message: "Success! Email confirmed. You cannot signup with this email again.",
            data: { user }
        };
    }
    async login({ email, password }) {
        const user = await this.userRepo.findByEmail(email);
        if (!user || !await (0, hash_1.compareHash)(password, user?.password)) {
            throw new error_handle_1.BadRequestException("invalid credentials");
        }
        if (!user.isEmailConfirmed) {
            throw new error_handle_1.BadRequestException("please confirm your email before login");
        }
        const jti = (0, crypto_1.randomUUID)();
        const accessToken = (0, token_1.createToken)({
            _id: user._id,
            email: user.email,
        }, config_1.ACCESS_TOKEN_SIGNATURE, {
            expiresIn: "30m",
            jwtid: jti
        });
        const refreshToken = (0, token_1.createToken)({
            _id: user._id,
            email: user.email,
        }, config_1.REFRESH_TOKEN_SIGNATURE, {
            expiresIn: "7d",
            jwtid: jti
        });
        const tokenKey = (0, redis_repo_1.revokeTokenKey)({
            userId: user._id,
            jti
        });
        await (0, redis_repo_1.set)({
            key: tokenKey,
            value: jti,
            ttl: 7 * 24 * 60 * 60
        });
        return {
            data: {
                accessToken,
                refreshToken
            }
        };
    }
    async sendFriendRequest(senderId, recipientId) {
        if (senderId === recipientId) {
            throw new error_handle_1.BadRequestException("You cannot send a friend request to yourself");
        }
        // Using your userRepo to find the model or directly query Mongoose
        const userModel = this.userRepo.model || require("../../DB/models/user.model").userModel;
        const recipient = await userModel.findByIdAndUpdate(recipientId, { $addToSet: { friendRequests: senderId } }, { new: true });
        if (!recipient)
            throw new error_handle_1.NotFoundException("Recipient user not found");
        return { message: "Friend request sent successfully" };
    }
    async acceptFriendRequest(receiverId, senderId) {
        const userModel = this.userRepo.model || require("../../DB/models/user.model").userModel;
        // 1. Update the receiver (User B): pull request, add friend
        const updatedReceiver = await userModel.findByIdAndUpdate(receiverId, {
            $pull: { friendRequests: senderId },
            $addToSet: { friends: senderId }
        }, { new: true });
        if (!updatedReceiver)
            throw new error_handle_1.NotFoundException("User not found");
        // 2. Update the sender (User A): add receiver to their friends array too!
        // We add an explicit await here to guarantee MongoDB registers both updates.
        await userModel.findByIdAndUpdate(senderId, { $addToSet: { friends: receiverId } }, { new: true });
        return { message: "Friend request accepted successfully" };
    }
    async rejectFriendRequest(receiverId, senderId) {
        const userModel = this.userRepo.model || require("../../DB/models/user.model").userModel;
        const updatedReceiver = await userModel.findByIdAndUpdate(receiverId, { $pull: { friendRequests: senderId } }, { new: true });
        if (!updatedReceiver)
            throw new error_handle_1.NotFoundException("User not found");
        return { message: "Friend request rejected successfully" };
    }
}
exports.userService = new userServices();
//# sourceMappingURL=user.service.js.map