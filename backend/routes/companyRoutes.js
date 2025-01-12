import express from 'express'
import { getCompany, getCompanyById, registerCompany, updateCompany } from '../controller/companyController.js'
import { isAuthenticated } from '../auth/auth.js'

const router = express.Router()


router.route('/registercompany').post(isAuthenticated,registerCompany)
router.route('/getcompany').get(isAuthenticated,getCompany)
router.route('/getcompany/:id').get(isAuthenticated,getCompanyById)
router.route('/update/company/:id').post(isAuthenticated,updateCompany)

export default router