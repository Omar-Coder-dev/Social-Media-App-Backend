
import crypto from "crypto"

export const createOTP = (): number => {
    return crypto.randomInt(100000,999999);
}