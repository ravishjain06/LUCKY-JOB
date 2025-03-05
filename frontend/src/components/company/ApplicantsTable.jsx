import React, { useState } from 'react';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import dayjs from "dayjs";
import { MoreHorizontal } from "lucide-react";
import { useSelector } from "react-redux";
import axios from 'axios';
import { toast } from 'sonner';
import { TableCell } from '../ui/table';

const ApplicantsTable = () => {
  const { applicants } = useSelector((store) => store.applicant);
  const applicantStatus = ["Rejected", "Accepted"];
  // console.log(applicants.application.length);
  
  // State to track selected status for each applicant
  const [statuses, setStatuses] = useState({});

  const statusHandler = async (status, id) => {
    try {
      const res = await axios.post(
        `lucky-job.vercel.app/api/v1/application/updatestatus/${id}`,
        { status },
        {
          headers: {
            'Content-Type': 'application/json',
          },
          withCredentials: true,
        }
      );

      if (res.data.success) {
        console.log(res.data);

        setStatuses((prev) => ({ ...prev, [id]: status }));
        toast.success("Status updated successfully!");
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to update status!");
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      <table className="w-full table-auto border-collapse">
        <thead>
          <tr className="bg-gray-100">
            <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">Full Name</th>
            <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">Email</th>
            <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">Contact</th>
            <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">Resume</th>
            <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">Date</th>
            <th className="px-6 py-3 text-right text-sm font-medium text-gray-600">Action</th>
          </tr>
        </thead>
        <tbody>
          {applicants &&
            applicants?.application?.map((applicant) => (
              <tr key={applicant._id} className="border-b">
                <td className="px-6 py-4 text-sm text-gray-800">{applicant.applicant.fullname}</td>
                <td className="px-6 py-4 text-sm text-gray-800">{applicant.applicant.email}</td>
                <td className="px-6 py-4 text-sm text-gray-800">{applicant.applicant.phoneNumber || "N/A"}</td>
                <td className="px-6 py-4 text-sm text-blue-600 underline">
                  {applicant.applicant.profile.resume ? (
                    <a
                      href={applicant.applicant.profile.resume}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      View Resume
                    </a>
                  ) : (
                    "No Resume"
                  )}
                </td>
      <TableCell className="px-6 py-4 text-sm text-gray-800">{applicant?.createdAt?.split('T')[0]}</TableCell>

                <td className="px-6 py-4 text-sm text-right">
                  <Popover>
                    <PopoverTrigger>
                      <button className="p-2 text-gray-500 hover:text-gray-800">
                        <MoreHorizontal className="w-5 h-5" />
                      </button>
                    </PopoverTrigger>
                    <PopoverContent className="w-32">
                      {applicantStatus.map((status) => (
                        <div
                          key={status}
                          onClick={() => statusHandler(status, applicant._id)}
                          className={`flex items-center gap-2 text-gray-800  ${statuses[applicant._id] === status ? "font-bold text-green-600" : ""
                            }`}
                        >
                          <span>{status}</span>
                          {statuses[applicant._id] === status && <span>✓</span>}
                        </div>
                      ))}
                    </PopoverContent>
                  </Popover>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default ApplicantsTable;
