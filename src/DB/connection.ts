import mongoose from "mongoose"
import {createClient} from "redis"
import { MONGO_URI } from "../config"

export const DBconnection = async() =>{
    try{
    await mongoose.connect(MONGO_URI as string)
    console.log("DB connected successfully")
    }catch(error){
        console.error("Error connecting to DB:", error)
    }
}


export const client = createClient({
    url: "redis://localhost:6379",
    database: 3
})

export const testRedisConnection = async () => {
    client.connect().then(() => {
        console.log("Redis connected successfully")
    }).catch((error) => {
        console.error("Error connecting to Redis:", error)
    })
}