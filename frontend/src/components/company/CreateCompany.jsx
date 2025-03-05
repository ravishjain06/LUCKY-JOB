import { Label } from '@radix-ui/react-label';
import React, { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from '../ui/button';
import { useNavigate } from 'react-router-dom'; // Assuming React Router is used
import axios from 'axios';
import { toast } from 'sonner';
import { useDispatch } from 'react-redux';
import { setSingleCompany } from '@/store/companySlice';

const CreateCompany = () => {
    const navigate = useNavigate(); // React Router hook for navigation
    const [companyName, setCompanyName] = useState('')
    const dispatch = useDispatch()


    const createCompany = async (e) => {
        e.preventDefault()
        try {
            const res = await axios.post("lucky-job.vercel.app/api/v1/company/registercompany", { companyName }, {
                headers: {
                    'Content-Type': "application/json"
                },
                withCredentials: true
            })
            // console.log(res.data);
            if (res.data.success) {
                const companyId = res?.data?.company._id
                console.log("Companyid ",companyId);
                
                navigate(`/admin/company/${companyId}`)
                toast.success(res.data.message)
                dispatch(setSingleCompany(res.data.company))
            }

        } catch (error) {
            toast.error(error.response.data.message)
            console.log(error);

        }
    }


    return (
        <div className="min-h-screen bg-gray-50 py-10">
            <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-md">
                <h1 className="text-2xl font-bold text-gray-800 mb-6">Create Company</h1>
                <form action="" onSubmit={createCompany}>

                    {/* Company Name Field */}
                    <div className="mb-4">
                        <Label htmlFor="company-name" className="text-sm font-medium text-gray-700">
                            Company Name
                        </Label>
                        <Input
                            value={companyName}
                            onChange={(e) => setCompanyName(e.target.value)}
                            id="company-name"
                            placeholder="Enter Company Name"
                            className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-md shadow-sm "
                        />
                    </div>
                    <div className="flex gap-4">
                        <Button
                            onClick={() => navigate('/admin/company')}
                            className="px-6 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
                        >
                            Cancel
                        </Button>
                        <Button
                         
                            className="px-6 py-2  rounded-md ">
                            Create
                        </Button>
                    </div>
                </form>


            </div>
        </div>
    );
};

export default CreateCompany;
