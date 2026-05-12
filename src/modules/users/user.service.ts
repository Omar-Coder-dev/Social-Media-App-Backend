import { ACCESS_TOKEN_SIGNATURE, REFRESH_TOKEN_SIGNATURE } from "../../config";
import { ConfirmEmailKeyPrefix, get, set, update, deleteKey, revokeTokenKey } from "../../DB/redis.repo";
import { createOTP } from "../../utils/email/createOTP";
import { emailEvents } from "../../utils/email/emailEvents";
import { generateHtml } from "../../utils/email/generateHTML";
import { BadRequestException, NotFoundException } from "../../utils/errorHandle/error.handle";
import { encryption } from "../../utils/security/encryption/encryption";
import { compareHash, createHash } from "../../utils/security/hash/hash";
import { createToken } from "../../utils/security/token/token";
import { UserRepo } from "./user.repo";
import { confirmEmailDTO, loginDTO, signupDTO } from "./user.type";
import crypto, { randomUUID } from "crypto"
class userServices {
  private userRepo = new UserRepo();
  private OTP_TTL = 300;
  private OTP_MAX_ATTEMPTS = 5;

async signup(body: signupDTO) {
    const { name, email, gender, password, age, phone } = body;

    // 1. Check if the email already exists in MongoDB
    const userExist = await this.userRepo.findByEmail(email);

    if (userExist) {
        // A. If the user is already confirmed, block them permanently
        if (userExist.isEmailConfirmed) {
            throw new BadRequestException("email already exist and is confirmed");
        }

        // B. RATE LIMIT / ANTI-SPAM: 
        // Check if an OTP key already exists in Redis for this user
        const otpKey = ConfirmEmailKeyPrefix({ userId: userExist._id as any });
        const existingOtp = await get({ key: otpKey });

        if (existingOtp) {
            // If the OTP is still in Redis, they are clicking signup too fast.
            throw new BadRequestException("OTP already sent. Please check your email or wait a few minutes before trying again.");
        }

        // C. If not confirmed and no active OTP, delete the old unconfirmed record
        // This allows the user to "signup again" from scratch after 5 failed attempts
        await (userExist as any).deleteOne();
    }

    // 2. Prepare user data
    const hashPassword = await createHash(password);
    const encryptedPhone = phone ? encryption(phone) : undefined;

    // 3. Create the new User record
    const user = await this.userRepo.create({
        email,
        gender,
        name,
        age: age as number,
        phone: encryptedPhone as string,
        password: hashPassword,
    });

    // 4. Generate OTP and store in Redis with Attempt Counter
    const otp = createOTP();
    await set({
        key: ConfirmEmailKeyPrefix({ userId: user._id as any }),
        value: { otp, attempts: this.OTP_MAX_ATTEMPTS }, // Store as object for the counter
        ttl: this.OTP_TTL, 
    });

    // 5. Trigger Email Event
    const html = generateHtml("Confirm Your Email", user.name, otp);
    emailEvents.publish("confirm-email", {
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


async confirmEmail({ email, otp }: confirmEmailDTO) {
    const user = await this.userRepo.findByEmail(email);
    if (!user) throw new NotFoundException("user not found");
    if (user.isEmailConfirmed) throw new BadRequestException("email already confirmed");

    const otpKey = ConfirmEmailKeyPrefix({ userId: user._id as any });
    const otpData = await get({ key: otpKey }) as { otp: string | number, attempts: number };

    if (!otpData) {
      throw new BadRequestException("OTP expired or max attempts reached. Go signup again.");
    }

    // 1. Check if OTP is wrong
    if (otp.toString() !== otpData.otp.toString()) {
      const newAttempts = otpData.attempts - 1;

      if (newAttempts <= 0) {
        // HIT LIMIT: Delete everything so they MUST signup from scratch
        await deleteKey({ key: otpKey });
        await (user as any).deleteOne();
        throw new BadRequestException("Max limit hit. Account reset. Please signup again.");
      }

      // Update the counter in Redis
      await update({
        key: otpKey,
        value: { otp: otpData.otp, attempts: newAttempts },
        ttl: this.OTP_TTL
      });

      throw new BadRequestException(`In-valid OTP. Attempts left: ${newAttempts}`);
    }

    // 2. Success: Mark as confirmed and clean up Redis
    user.isEmailConfirmed = true;
    await user.save();
    await deleteKey({ key: otpKey });

    return {
      message: "Success! Email confirmed. You cannot signup with this email again.",
      data: { user }
    };
}


async login({email, password}: loginDTO){
  const user = await this.userRepo.findByEmail(email)
  if(!user || !await compareHash(password, user?.password as string) ){
    throw new BadRequestException("invalid credentials")
  }
  if(!user.isEmailConfirmed){
    throw new BadRequestException("please confirm your email before login")
  }

  const jti = randomUUID()

  const accessToken = createToken({
    _id:user._id,
    email:user.email,
  },
  ACCESS_TOKEN_SIGNATURE as string,{
    expiresIn:"30m",
    jwtid:jti
  }
)
  const refreshToken = createToken({
    _id:user._id,
    email:user.email,
  },
  REFRESH_TOKEN_SIGNATURE  as string,{
    expiresIn:"7d",
    jwtid:jti
  }
)
  const tokenKey = revokeTokenKey({
    userId: user._id,
    jti
  })
  await set({
    key: tokenKey,
    value: jti,
    ttl: 7 * 24 * 60 * 60 
  })
  return {
    data:{
      accessToken,
      refreshToken
    }
  }
}
}

export const userService = new userServices();