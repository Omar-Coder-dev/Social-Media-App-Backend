import {Router , type Router as RouterType} from 'express'
import { validation } from '../../middlewares/validation.middleware'
import { confirmEmailSchema, loginSchema, signupSchema } from './user.validation'
import { userService } from './user.service'
import { successRes } from '../../utils/success.res'
import { auth } from '../../middlewares/auth.middleware'
import { IRequest } from '../../utils/types/req.types'
 const router:RouterType = Router()

export const routes = {
    base:"/users",
    signup:"/signup",
    confirmEmail:"/confirm-email",
    login:"/login",
    profile:"/me"
}

router.post(routes.signup, validation(signupSchema),
    async (req, res, next) => {
        const { name, email, gender, password,confirmPassword, age, phone } = req.body
        const { data } = await userService.signup({ name, email, gender, password, confirmPassword, age, phone })
        return successRes({ res, data })

    }
)
router.patch(routes.confirmEmail, validation(confirmEmailSchema),
    async (req, res, next) => {
        const { email, otp } = req.body
        const {data} = await userService.confirmEmail({email,otp})
        return successRes({ res, data })
})

router.post(routes.login , validation(loginSchema) , async (req, res, next)=>{
    const {email, password} = req.body
    const {data} = await userService.login({email, password})
    return successRes({res, data})
})

router.get("/me" , auth ,  (req,res)=>{
    const {user} = req as IRequest
    successRes({res, data:{user}})
})

export default router