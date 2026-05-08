export const PORT = process.env.PORT as unknown as number
export const MONGO_URI = process.env.MONGODB_URI as string


export const IV_LENGTH = process.env.IV_LENGTH
export const ENCRYPTION_SECRET_KEY = process.env.ENCRYPTION_SECRET_KEY 

// Salt
export const SALT = process.env.SALT

// Email
export const EMAIL_USER = process.env.EMAIL_USER
export const EMAIL_PASSWORD = process.env.EMAIL_PASSWORD
export const HOST = process.env.HOST
export const EMAIL_PORT = process.env.EMAIL_PORT