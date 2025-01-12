import { Job } from "../models/jobSchema.js"


export const PostJob = async (req, res) => {
    try {
        const { title, description, requirements, salary, location, jobType, experienceLevel, position, companyId } = req.body
        const userId = req.id

        if (!title || !description || !requirements || !salary || !location || !jobType || !experienceLevel, !position || !companyId) {
            return res.status(401).json({
                success: false,
                message: "Provide every details"
            })
        }

        const job = await Job.create({
            title: title,
            description: description,
            requirements: requirements,
            salary: Number(salary),
            location: location,
            jobType,
            position,
            experienceLevel,
            company: companyId,
            created_by: userId
        })

        return res.status(201).json({
            success: true,
            message: "Job Created Successfully",
            job
        })
    } catch (error) {
        console.log(error);

    }
}

export const getJobById = async (req, res) => {
    try {
        const jobId = req.params.id;
        const userId = req.id

        const job = await Job.findById(jobId).populate({
            path: "application", 
        })

        if (!job) {
            return res.status(401).json({
                success: false,
                message: "Job Not found"
            })
        }

        return res.status(201).json({
            success: true,
            message: "Job Found",
            job
        })

    } catch (error) {
        console.log(error);
        
    }
}

export const getAllJobs = async (req, res) => {
    try {
        const keyword = req.query.keyword || ""
        const query = {
            $or: [  //it is used for multiple things like we can search for title and description as well
                { title: { $regex: keyword, $options: "i" } },
                // { description: { $regex: keyword, $options: "i" } }
            ]
        };

        const jobs = await Job.find(query).populate({
            path: "company"
        }).sort({ createdAt: -1 })

        if (!jobs) {
            return res.status(401).json({
                success: false,
                message: "Job Not found"
            })
        }

        return res.status(201).json({
            success: true,
            message: "Job found",
            jobs
        })
    } catch (error) {
        console.log(error);
    }
}

//created by Admin -  Jobs
export const getAdminJobs = async (req, res) => {
    try {
        const adminId = req.id; // Assuming `req.id` contains the authenticated admin's ID

        // Find jobs created by the admin and populate the associated company details
        const jobs = await Job.find({ created_by: adminId }).populate({
            path: "company",    
        });

        if (!jobs || jobs.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No jobs found for this admin",
            });
        }

        return res.status(200).json({
            success: true,
            jobs,
        });
    } catch (error) {
        console.error("Error fetching admin jobs:", error);

        return res.status(500).json({
            success: false,
            message: "Server error",
            error: error.message,
        });
    }
};
