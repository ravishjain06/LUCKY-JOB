import { Application } from "../models/applicationSchema.js";
import { Job } from "../models/jobSchema.js";


export const applyJob = async (req, res) => {
    try {
        const jobId = req.params.id;
        const userId = req.id; 
        
        if (!jobId) {
            return res.status(400).json({
                success: false,
                message: "Job ID is required"
            });
        }

        // Check if the user has already applied for the job
        const existingApplicant = await Application.findOne({ applicant: userId, job: jobId });
        if (existingApplicant) {
            return res.status(400).json({
                success: false,
                message: "You have already applied for this job"
            });
        }

        // Find the job by ID
        const job = await Job.findById(jobId);
        if (!job) {
            return res.status(404).json({
                success: false,
                message: "Job not found"
            });
        }

        // Create a new application
        const newApplication = new Application({
            job: jobId,
            applicant: userId
        });

        // Save the new application
        await newApplication.save();

        // Add the new application to the job's application list
        job.application.push(newApplication._id);
        
        // Save the updated job document
        await job.save();

        return res.status(201).json({
            success: true,
            message: "Job applied successfully",
            application: newApplication
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Server error while applying for the job"
        });
    }
};


export const getAppliedJobs = async (req, res) => {
    try {
        const userId = req.id

        const application = await Application.find({ applicant: userId }).sort({ createdAt: -1 }).populate({
            path: "job",
            options: { sort: { createdAt: -1 } },
            populate: {
                path: "company",
                options: { sort: { createdAt: -1 } }
            }
        })

        if (!application) {
            return res.status(401).json({
                success: false,
                message: "No Application"
            })
        }

        return res.status(201).json({
            success: true,
            application
        })

    } catch (error) {
        console.log(error);
    }
}

export const getApplicants = async (req, res) => {
    try {
        const jobId = req.params.id;
        console.log(jobId);

        const job = await Job.findById(jobId).populate({
            path: "application",
            options: { sort: { createdAt: -1 } },
            populate: {
                path: "applicant"
            }
        });
        if (!job) {
            return res.status(401).json({
                success: false,
                message: "No Application"
            })
        }

        return res.status(201).json({
            success: true,
            job
        })
    } catch (error) {
        console.log(error);
    }
}

export const updateStatus = async (req, res) => {
    try {

        const applicationId = req.params.id;
        const { status } = req.body

        const application = await Application.findOne({ _id: applicationId })
        if (!application) {
            return res.status(401).json({
                success: false,
                message: "No Application found"
            })
        }
        application.status = status.toLowerCase()
        await application.save()
        return res.status(201).json({
            success: true,
            status
        })
    } catch (error) {
        console.log(error);

    }
}