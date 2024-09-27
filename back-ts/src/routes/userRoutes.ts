import { Router } from 'express'
import { registerUser } from '../controllers/userController'
import { validateUserRegistration } from '../middlewares/validateUser'


const router = Router()
router.post('/register', validateUserRegistration, registerUser)


export default router
