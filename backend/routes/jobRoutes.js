import express from 'express'
import { isAuthenticated } from '../auth/auth.js';
import { getAdminJobs, getAllJobs, getJobById, PostJob } from '../controller/jobController.js';

const router = express.Router()

router.route('/postjob').post(isAuthenticated, PostJob)
router.route('/getjob/:id').get(isAuthenticated, getJobById)
router.route('/getalljobs').get(isAuthenticated, getAllJobs)
router.route('/getadminjobs').get(isAuthenticated, getAdminJobs)


export default router;