import React, { useState } from 'react';
import Navbar from '../Shared/Navbar';
import { Input } from "@/components/ui/input";
import { Plus } from 'lucide-react';
import { Button } from '../ui/button';
import CompanyTable from './CompanyTable';
import { useNavigate } from 'react-router-dom';
import useGetAllCompany from '../hooks/useGetAllCompany';

const Company = () => {
    useGetAllCompany()
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
                            placeholder="Search by company name"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    {/* New Company Button */}
                    <Button
                        onClick={() => navigate('/admin/company/create')}
                        className="flex items-center gap-2 px-4 py-2   rounded-lg shadow-md  focus:outline-none  ">
                        <Plus className="w-5 h-5" />
                        <span>New Company</span>
                    </Button>
                </div>
            </div>
            <CompanyTable searchItem={searchItem} />
        </div>
    );
};

export default Company;
