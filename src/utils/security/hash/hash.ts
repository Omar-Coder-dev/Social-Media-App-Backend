import bcrypt from 'bcrypt'
import { SALT } from '../../../config'
import { AppError } from '../../errorHandle/error.handle'

export const createHash = async (data:string): Promise<string>=>{
    if (!SALT) throw new AppError('SALT is not defined in environment variables')
    const hash = await bcrypt.hash(data, Number(SALT))
    return hash
}

export const compareHash = async (data:string, encypted:string): Promise<boolean>=>{
    
    return await bcrypt.compare(data, encypted)
}