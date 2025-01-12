import express from 'express'
import { applyJob, getApplicants, getAppliedJobs, updateStatus } from '../controller/applicationController.js'
import {isAuthenticated} from '../auth/auth.js'
const router = express.Router()

router.route('/applyjob/:id').post(isAuthenticated,applyJob)
router.route('/getappliedjobs').get(isAuthenticated,getAppliedJobs)
router.route('/getapplicants/:id').get(isAuthenticated,getApplicants)
router.route('/updatestatus/:id').post(isAuthenticated,updateStatus)

export default router