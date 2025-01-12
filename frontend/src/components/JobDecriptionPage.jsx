import React, { useEffect } from 'react';
import { Badge } from "@/components/ui/badge";
import { Link, useParams } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';
import { setSingleJob } from '@/store/jobSlice';
import axios from 'axios';
import { toast } from 'sonner';

const JobDescriptionPage = () => {

  const dispatch = useDispatch()
  const { singleJob } = useSelector(store => store.job)
  const { user } = useSelector(store => store.user)

  const params = useParams()
  const jobId = params.id

  const applyForJob = async () => {
    console.log("UserId", user?._id);
    console.log("JobId", jobId);

    try {
      const res = await axios.post(`http://localhost:5555/api/v1/application/applyjob/${jobId}`,  {},{
        withCredentials:true
      }      
      );

      if (res.data.success) {
        // Ensure the user only applies if not already applied
        const alreadyApplied = singleJob?.application?.some(
          (app) => app.applicant === user?._id
        );

        if (alreadyApplied) {
          toast.info("You have already applied for this job.");
        } else {
          // Update the `singleJob` to include the user's application
          dispatch(
            setSingleJob({
              ...singleJob,
              application: [...singleJob.application, { applicant: user?._id }],
            })
          );
          toast.success(res.data.message);
        }
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "An error occurred!");
      console.log(error);
    }
  };


  useEffect(() => {
    const fetchSingleJobs = async () => {
      try {
        const res = await axios.get(`http://localhost:5555/api/v1/job/getjob/${jobId}`, { withCredentials: true })
        if (res.data.success) {
          dispatch(setSingleJob(res.data.job))
        }
      } catch (error) {
        console.log(error);
      }
    }
    fetchSingleJobs()
  }, [jobId, dispatch, user?._id])

  return (
    <div className="max-w-7xl mx-auto my-8 px-6 md:px-12">
      <div className="bg-white p-6 rounded-md space-y-6">

        {/* Back Button */}
        <div className="flex justify-start">
          <Link to="/" className="text-blue-500 hover:text-blue-700 text-sm font-medium">
            &larr; Back to Home
          </Link>
        </div>

        {/* Job Title */}
        <div className="flex justify-between items-center">
          <h2 className="text-3xl font-medium text-gray-800">{singleJob?.title}</h2>
        
          <button
            onClick={applyForJob}
            className="bg-gray-200 text-gray-800 py-1 px-4 rounded-md hover:bg-gray-300 transition duration-300">

            {
              singleJob?.application?.some(app => app.applicant === user?._id) ? "Applied" : "Apply"
            }




          </button>
        </div>

        {/* Badges below the Job Title */}
        <div className="flex gap-2 flex-wrap mt-4">
          <Badge variant="outline">Position 2</Badge>
          <Badge variant="outline">{singleJob?.jobType}</Badge>
          <Badge variant="outline">{singleJob?.salary} LPA</Badge>
        </div>

        {/* Job Description Section */}
        <div>
          <h3 className="text-xl font-medium text-gray-800 mt-6">Job Description</h3>
          <p className="text-gray-600 mt-4">
            {singleJob?.description}
          </p>
        </div>

        {/* Role and Location Section */}
        <div className="space-y-4">
          <h3 className="text-xl font-medium text-gray-800 mt-6">Requirements</h3>
          {
            singleJob?.requirements?.map((item, index) => {
              return <p key={index} className="text-gray-600">{item}</p>
            })
          }

          <h4 className="text-md text-gray-600">
            Location: <span className="font-semibold text-gray-800">{singleJob?.location}</span>
          </h4>
        </div>

        {/* Additional Information Section */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-gray-700">Experience Required</h3>
          <p className="text-gray-600">{singleJob?.experienceLevel} years of experience. </p>

          <h3 className="text-lg font-medium text-gray-700">Salary</h3>
          <p className="text-gray-600">2.45 LPA (Per Annum)</p>

          <h3 className="text-lg font-medium text-gray-700">Total Applicants</h3>
          <p className="text-gray-600">{singleJob?.application?.length} applicants so far.</p>
    
          <p className="text-gray-600">Posted on: {singleJob?.createdAt?.split('T')[0]}</p>
        </div>
      </div>
    </div>
  );
};

export default JobDescriptionPage;





// import React, { useEffect } from 'react';
// import { Badge } from "@/components/ui/badge";
// import { Link, useParams } from 'react-router-dom';
// import { useDispatch, useSelector } from 'react-redux';
// import { setSingleJob } from '@/store/jobSlice';
// import axios from 'axios';
// import { toast } from 'sonner';

// const JobDescriptionPage = () => {
//   const dispatch = useDispatch();
//   const { singleJob } = useSelector((store) => store.job);
//   const { user } = useSelector((store) => store.user);
//   const params = useParams();
//   const jobId = params.id;

//   const applyForJob = async () => {
//     try {
//       const res = await axios.post(
//         `http://localhost:5555/api/v1/application/applyjob/${jobId}`,
//         {},
//         { withCredentials: true }
//       );

//       if (res.data.success) {
//         // Update the job application state after reapplying
//         const updatedApplication = [...(singleJob?.application || [])];
//         const existingApplicationIndex = updatedApplication.findIndex(
//           (app) => app.applicant === user?._id
//         );

//         if (existingApplicationIndex > -1) {
//           updatedApplication[existingApplicationIndex].status = "pending";
//         } else {
//           updatedApplication.push({ applicant: user?._id, status: "pending" });
//         }

//         dispatch(
//           setSingleJob({
//             ...singleJob,
//             application: updatedApplication,
//           })
//         );
//         toast.success(res.data.message);
//       }
//     } catch (error) {
//       toast.error(error.response?.data?.message || "An error occurred!");
//       console.error(error);
//     }
//   };

//   useEffect(() => {
//     const fetchSingleJob = async () => {
//       try {
//         const res = await axios.get(
//           `http://localhost:5555/api/v1/job/getjob/${jobId}`,
//           { withCredentials: true }
//         );
//         if (res.data.success) {
//           dispatch(setSingleJob(res.data.job));
//         }
//       } catch (error) {
//         console.error(error);
//       }
//     };
//     fetchSingleJob();
//   }, [jobId, dispatch, user?._id]);

//   const userApplication = singleJob?.application?.find(
//     (app) => app.applicant === user?._id
//   );

//   const canReapply = userApplication?.status === "rejected";

//   return (
//     <div className="max-w-7xl mx-auto my-8 px-6 md:px-12">
//       <div className="bg-white p-6 rounded-md space-y-6">

//         {/* Back Button */}
//         <div className="flex justify-start">
//           <Link to="/" className="text-blue-500 hover:text-blue-700 text-sm font-medium">
//             &larr; Back to Home
//           </Link>
//         </div>

//         {/* Job Title */}
//         <div className="flex justify-between items-center">
//           <h2 className="text-3xl font-medium text-gray-800">{singleJob?.title}</h2>
//           <button
//             onClick={applyForJob}
//             className="bg-gray-200 text-gray-800 py-1 px-4 rounded-md hover:bg-gray-300 transition duration-300"
//           >
//             {userApplication
//               ? canReapply
//                 ? "Reapply"
//                 : userApplication.status === "accepted"
//                 ? "Applied"
//                 : "Applied (Pending)"
//               : "Apply"}
//           </button>
//         </div>

//         {/* Badges below the Job Title */}
//         <div className="flex gap-2 flex-wrap mt-4">
//           <Badge variant="outline">Position {singleJob?.position}</Badge>
//           <Badge variant="outline">{singleJob?.jobType}</Badge>
//           <Badge variant="outline">{singleJob?.salary} LPA</Badge>
//         </div>

//         {/* Job Description Section */}
//         <div>
//           <h3 className="text-xl font-medium text-gray-800 mt-6">Job Description</h3>
//           <p className="text-gray-600 mt-4">{singleJob?.description}</p>
//         </div>

//         {/* Requirements and Location Section */}
//         <div className="space-y-4">
//           <h3 className="text-xl font-medium text-gray-800 mt-6">Requirements</h3>
//           {singleJob?.requirements?.map((item, index) => (
//             <p key={index} className="text-gray-600">{item}</p>
//           ))}
//           <h4 className="text-md text-gray-600">
//             Location: <span className="font-semibold text-gray-800">{singleJob?.location}</span>
//           </h4>
//         </div>

//         {/* Additional Information Section */}
//         <div className="space-y-4">
//           <h3 className="text-lg font-medium text-gray-700">Experience Required</h3>
//           <p className="text-gray-600">{singleJob?.experienceLevel} years of experience.</p>
//           <h3 className="text-lg font-medium text-gray-700">Salary</h3>
//           <p className="text-gray-600">{singleJob?.salary} LPA (Per Annum)</p>
//           <h3 className="text-lg font-medium text-gray-700">Total Applicants</h3>
//           <p className="text-gray-600">{singleJob?.application?.length} applicants so far.</p>
//           <p className="text-gray-600">Posted on: {singleJob?.createdAt?.split('T')[0]}</p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default JobDescriptionPage;
