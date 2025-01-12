import React from 'react';
import { Button } from './ui/button';
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage } from '@radix-ui/react-avatar';
import { Link } from 'react-router-dom';

const JobPage = ({ job }) => {
    return (
        <div
            className="overflow-y-auto p-2 flex flex-col w-full rounded-sm gap-4"
            style={{
                boxShadow:
                    "rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px",
            }}
        >
            <div className="bg-[#F5F5F5] font-semibold px-4 py-4 flex flex-col gap-4 rounded-sm">
                {/* Header Section */}
                <div className="flex justify-between px-2 py-1">
                    <Badge className="font-semibold rounded-full p-2">
                        {job?.createdAt?.split("T")[0]}
                    </Badge>
                    <div className="bg-white rounded-full p-2 h-7 w-7 flex justify-center items-center">
                        <i
                            className="cursor-pointer fa-regular fa-bookmark text-gray-500"
                            style={{ fontSize: "14px" }}
                        ></i>
                    </div>
                </div>

                {/* Job Title and Company */}
                <div className="flex justify-between px-2 py-1">
                    <div className="w-[80%]">
                        <h1 className="text-2xl text-gray-800">{job?.title}</h1>
                        <p className="text-sm text-gray-600">{job?.company?.name}</p>
                    </div>
                    <Avatar>
                        <AvatarImage
                            className="w-10 h-10 rounded-full"
                            src={job?.company?.logo}
                            alt={job?.company?.name}
                        />
                    </Avatar>
                </div>


                <div className="px-2 py-1 flex gap-2 flex-wrap">
                    <Badge className="text-gray-600 bg-gray-200" variant="outline">
                        {job?.jobType}
                    </Badge>
                    <Badge className="text-gray-600 bg-gray-200" variant="outline">
                        {job?.salary} LPA
                    </Badge>
                    <Badge className="text-gray-600 bg-gray-200" variant="outline">
                        {job?.location || "Location not specified"}
                    </Badge>
                </div>


                <div className="mt-4 px-2">
                    <p className="text-sm text-gray-600 line-clamp-3">
                        {job?.description ||
                            "No description available for this job. Click on 'View More' to see additional details about this opportunity."}
                    </p>
                </div>
            </div>


            <div className="flex px-2 py-1 justify-between items-center">
                <Link to={`description/${job?._id}`}>
                    <Button className="px-6 py-2  rounded-md">
                        View More
                    </Button>
                </Link>

            </div>
        </div>
     
    );
};

export default JobPage;
