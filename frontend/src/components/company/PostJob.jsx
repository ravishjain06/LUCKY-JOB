import React, { useState } from 'react';
import Navbar from '../Shared/Navbar';
import { Input } from '../ui/input';
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import axios from 'axios';
import { useSelector } from 'react-redux';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';

const PostJob = () => {

    const [title, setTitle] = useState('');
    const [salary, setSalary] = useState('');
    const [description, setDescription] = useState('');
    const [location, setLocation] = useState('');
    const [jobType, setJobType] = useState('');
    const [experienceLevel, setExperience] = useState('');
    const [position, setPosition] = useState('');
    const [requirement, setRequirements] = useState('');
    const [companyId, setCompanyId] = useState('');
    const navigate = useNavigate()

    const { allCompany } = useSelector(store => store.company)




    const submitHandler = async (e) => {
        console.log(companyId);
        e.preventDefault();
        try {
            const res = await axios.post('http://localhost:5555/api/v1/job/postjob', {
                title,
                salary,
                description,
                location,
                jobType,
                experienceLevel,
                position,
                requirement,
                companyId
            }, {
                headers: {
                    "Content-Type": "application/json",
                },
                withCredentials: true,
            });
            if (res.data.success) {
                toast.success(res.data.message)
                navigate('/admin/jobs')
                console.log(res.data);
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />
            <div className="max-w-4xl mx-auto my-10 p-6 rounded-lg shadow-lg bg-white">
                <h2 className="text-2xl font-bold mb-5 text-center">Post a Job</h2>
                <form className="space-y-5" onSubmit={submitHandler}>
                    {/* Title and Salary */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium mb-1">Job Title</label>
                            <Input
                                onChange={(e) => setTitle(e.target.value)}
                                type="text"
                                placeholder="Enter job title"
                                className="w-full"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">Salary</label>
                            <Input
                                onChange={(e) => setSalary(e.target.value)}
                                type="number"
                                placeholder="Enter salary"
                                className="w-full"
                            />
                        </div>
                    </div>

                    {/* Description */}
                    <div>
                        <label className="block text-sm font-medium mb-1">Description</label>
                        <textarea
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="Enter job description"
                            className="w-full border border-gray-300 rounded-lg p-2"
                            rows="3"
                        ></textarea>
                    </div>

                    {/* Location and Job Type */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium mb-1">Location</label>
                            <Input
                                onChange={(e) => setLocation(e.target.value)}
                                type="text"
                                placeholder="Enter location"
                                className="w-full"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">Job Type</label>
                            <Select onValueChange={(value) => setJobType(value)}>
                                <SelectTrigger className="w-full border border-gray-300 rounded-lg p-2">
                                    <SelectValue placeholder="Select job type" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="full-time">Full-Time</SelectItem>
                                    <SelectItem value="part-time">Part-Time</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    {/* Experience and Position */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium mb-1">Experience</label>
                            <Input
                                onChange={(e) => setExperience(e.target.value)}
                                type="text"
                                placeholder="Enter required experience"
                                className="w-full"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">Position</label>
                            <Input
                                onChange={(e) => setPosition(e.target.value)}
                                type="text"
                                placeholder="Enter position"
                                className="w-full"
                            />
                        </div>
                    </div>

                    {/* Requirements */}
                    <div>
                        <label className="block text-sm font-medium mb-1">Requirements</label>
                        <textarea
                            onChange={(e) => setRequirements(e.target.value)}
                            placeholder="Enter job requirements"
                            className="w-full border border-gray-300 rounded-lg p-2"
                            rows="3"
                        ></textarea>
                    </div>


                    {
                        allCompany.length > 0 && (
                            <Select onValueChange={(value) => setCompanyId(value)}>
                                <SelectTrigger className="w-full md:w-[180px] border border-gray-300 rounded-lg p-2">
                                    <SelectValue placeholder="Select a Company" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        {allCompany.map((company) => (
                                            <SelectItem key={company._id} value={company._id}>
                                                {company.name}
                                            </SelectItem>
                                        ))}
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        )
                    }

                    <div className="text-center">
                        <button
                            type="submit"
                            className="bg-blue-600 text-white py-2 px-6 rounded-lg hover:bg-blue-700 transition"
                        >
                            Post Job
                        </button>
                        {allCompany.length === 0 && (
                            <p className="font-semibold text-sm text-red-600 mt-2">
                                *Please register the company first, before creating a job.
                            </p>
                        )}
                    </div>
                </form>
            </div>
        </div>
    );
};

export default PostJob;
