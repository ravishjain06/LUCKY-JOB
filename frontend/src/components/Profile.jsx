import React, { useState } from 'react';
import Navbar from './Shared/Navbar';
import { Avatar, AvatarFallback, AvatarImage } from '@radix-ui/react-avatar';
import { Badge } from "@/components/ui/badge";
import AppliedJobTable from './AppliedJobTable';
import UserEditDialog from './UserEditDialog';
import { useSelector } from 'react-redux';
import { useRef } from 'react';

const Profile = () => {

    const [open, setOpen] = useState(false)
    const { user } = useSelector(store => store.user)

    const role = user?.role == "admin";
   
    console.log(role);  

    const resumeRefLink = useRef(null)

    const viewResume = () => {
        if (resumeRefLink.current) {
            resumeRefLink.current.click()
        }
    }

    return (
        <div>
            <Navbar />
            <div className="max-w-7xl mx-auto border-gray-200 border rounded-2xl my-5 p-8">
                {/* Profile header */}
                <div className="flex justify-between items-center mb-6">
                    <div className="flex gap-4 items-center">
                        <Avatar>
                            <AvatarImage
                                className="w-16 h-16 rounded-full object-cover"
                                src={user?.profile?.profilePicture}
                                alt={user?.fullname}
                            />
                        </Avatar>
                        <div>
                            <h1 className="font-medium text-2xl text-gray-800">{user?.fullname}</h1>
                            <p className="text-gray-600 text-sm mt-1">{user?.profile?.bio}</p>
                        </div>
                    </div>
                    <div
                        onClick={() => setOpen(true)}
                        className="h-8 w-8 flex justify-center items-center cursor-pointer text-gray-600">
                        <i className="fa-regular fa-pen-to-square text-xl"></i>
                    </div>
                </div>

                {/* Contact Information */}
                <div className="flex flex-col gap-4 mb-6">
                    <div className="flex gap-3 items-center text-sm text-gray-700">
                        <i className="fa-regular fa-envelope text-lg"></i>
                        <span>{user?.email}</span>
                    </div>
                    <div className="flex gap-3 items-center text-sm text-gray-700">
                        <i className="fa-solid fa-phone text-lg"></i>
                        <span>{user?.phoneNumber}</span>
                    </div>
                    <div className="flex flex-col gap-3">
                        <span className="text-sm font-medium text-gray-700">Skills</span>
                        {
                            user?.profile?.skills.length <= 0 ? (<span className='text-sm'>Add Your Skills</span>) : (

                                <div className="flex gap-2 flex-wrap">
                                    {
                                        user?.profile?.skills?.map((skill, index) => {
                                            return <Badge variant="outline" key={index}>{skill}</Badge>
                                        })
                                    }
                                </div>
                            )
                        }



                    </div>
                </div>

                <div className="text-sm text-gray-600">
                    {user?.profile?.resume && role ? (
                        <>
                            <a
                                ref={resumeRefLink}
                                target="_blank"
                                href={user?.profile?.resume}
                                rel="noopener noreferrer"
                                className="hidden"
                            >
                                <span>View Resume</span>
                            </a>
                            <button
                                onClick={viewResume}
                                className="text-blue-600 underline"
                            >
                                View Resume
                            </button>
                        </>
                    ) : (
                        <span className="text-gray-600">Upload Resume Now.</span>
                    )}
                </div>
            </div>

            <div className="max-w-7xl mx-auto my-5 p-8">
                <h1 className='font-semibold text-2xl'>Applied Jobs</h1>
                <AppliedJobTable />
            </div>

            <UserEditDialog open={open} setOpen={setOpen} />
        </div>
    );
}

export default Profile;
