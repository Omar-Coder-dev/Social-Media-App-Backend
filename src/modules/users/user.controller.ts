import {Router , type Router as RouterType} from 'express'
import { signup } from './user.service'
import { successRes } from '../../utils/success.res'
// import { validation } from '../../middlewares/validation.middleware'
// import { signupSchema } from './user.validation'
import { BadRequestException } from '../../utils/errorHandle/error.handle'
const router:RouterType = Router()

router.post("/signup" , (req,res)=>{
    throw new BadRequestException("this is bad request")
    const {data} =signup(req.body)
    return successRes({res, data})
})

export default router