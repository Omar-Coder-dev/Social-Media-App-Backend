import {Router , type Router as RouterType} from 'express'
import { signup } from './user.service'
import { successRes } from '../../utils/success.res'
import { validation } from '../../middlewares/validation.middleware'
import { signupSchema } from './user.validation'
const router:RouterType = Router()

router.post("/signup" , validation(signupSchema) , (req,res)=>{

    const {data} =signup(req.body)
    return successRes({res, data})
})

export default router