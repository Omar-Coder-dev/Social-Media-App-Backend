import crypto from 'crypto'
import { ENCRYPTION_SECRET_KEY } from '../../../config'

const IV_LENGTH = Number(process.env.IV_LENGTH)
const SECRET_KEY = Buffer.from(ENCRYPTION_SECRET_KEY as string)

export const encryption = (text: string):string => {
    const iv = crypto.randomBytes(IV_LENGTH)
    const cipher = crypto.createCipheriv('aes-256-cbc', SECRET_KEY, iv)

    let cipherText = cipher.update(text, 'utf-8', 'hex')
    cipherText += cipher.final('hex')

    return `${iv.toString('hex')}:${cipherText}`
}

export const decryption = (cipherData: string):string => {
    const [iv, cipherText] = cipherData.split(':') as [string, string]

    const binaryIv = Buffer.from(iv, 'hex')
    const decipher = crypto.createDecipheriv('aes-256-cbc', SECRET_KEY, binaryIv)

    let data = decipher.update(cipherText, 'hex', 'utf-8')
    data += decipher.final('utf-8')

    return data
}