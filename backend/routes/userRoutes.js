import express from 'express'
import { imageUpload, login, Logout, Register, updateUser } from '../controller/userController.js';
import { isAuthenticated } from '../auth/auth.js';
import { upload } from '../multer.js'

const router = express.Router()

router.route('/register').post(Register)
router.route('/login').post(login)
router.route('/logout').post(Logout)
router.route('/edit/profile').post(isAuthenticated, updateUser)

router.route('/imageUpload').post(upload.single("image"),imageUpload)

export default router;