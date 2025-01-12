import React, { useState } from 'react';
import Navbar from '../Shared/Navbar';
import { Input } from "@/components/ui/input";
import { Plus } from 'lucide-react';
import { Button } from '../ui/button';
import CompanyTable from './CompanyTable';
import { useNavigate } from 'react-router-dom';
import CompanyJobTable from './CompanyJobTable';
import useGetAllAdminJobs from '../hooks/useGetAllAdminJobs';

const CompanyJob = () => {
    useGetAllAdminJobs()
    const navigate = useNavigate()

    const [searchItem, setSearchItem] = useState('')
    console.log(searchItem);

    return (
        <div className="bg-gray-50 min-h-screen">
            <Navbar />
            <div className="max-w-6xl mx-auto my-8 p-5  rounded-lg shadow-md">

                <div className="flex items-center gap-4">
                    {/* Search Input */}
                    <div className="flex-1">
                        <Input
                            onChange={(e) => setSearchItem(e.target.value)}
                            type="text"
                            placeholder="Search by company role"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <Button
                        onClick={() => navigate('/admin/create/jobs')}
                        className="flex items-center gap-2 px-4 py-2   rounded-lg shadow-md  focus:outline-none  ">
                        <Plus className="w-5 h-5" />
                        <span>Post New Job</span>
                    </Button>
                </div>
            </div>
            <CompanyJobTable searchItem={searchItem} />
        </div>
    );
};

export default CompanyJob;
