import { Types } from "mongoose"
import { RedisClient } from "./connection"

export const revokeTokenKeyPrefix = ({ userId  }: { userId: string | Types.ObjectId  }) => {
  return `user:${userId}:revokeToken`
}

export const revokeTokenKey = ({ userId, jti }: { userId: string| Types.ObjectId, jti: string }) => {
  return `${revokeTokenKeyPrefix({ userId })}:${jti}`
}

export const ConfirmEmailKeyPrefix = ({ userId }: { userId:  | Types.ObjectId  }) => {
  return `user:${userId}:confirmEmail`
}

export const forgetPasswordKeyPrefix = ({ userId }: { userId: string }) => {
  return `user:${userId}:forgetPassword`
}

export const update = async ({ key, value, ttl }: { key: string, value: object | string , ttl: number | null }) =>{
    try {
        const isExists = await RedisClient.exists(key);
        if (!isExists) {
            return false;
        }
        return await set({ key, value, ttl });
    } catch (error) {
        console.log("REDIS update Error=>", error);
        return undefined;
    }
}

export const set = async ({ key, value, ttl = null }: { key: string, value: object | string, ttl: number | null }) => {
  try {
    const data = typeof value !== "string" ? JSON.stringify(value) : value
    if (ttl) {
      return await RedisClient.set(key, data,{
        expiration:{
            type: "EX",
            value: ttl
        }
      })
    } else {
      return await RedisClient.set(key, data)
    }
  } catch (error) {
    console.log("REDIS set Error=>", error)
    return undefined
  }
}

export const get = async ({ key }: { key: string }) => {
  try {
    const data = await RedisClient.get(key)
    if (!data) return null
    
    // Attempt to parse if it's a JSON string, otherwise return as is
    try {
      return JSON.parse(data)
    } catch {
      return data
    }
  } catch (error) {
    console.log("REDIS get Error=>", error)
    return undefined
  }
}

export const deleteKey = async ({ key }: { key: string }) => {
  try {
    return await RedisClient.del(key)
  } catch (error) {
    console.log("REDIS del Error=>", error)
    return undefined
  }
}