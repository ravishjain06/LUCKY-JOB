import React, { useEffect, useState } from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import { Button } from "@/components/ui/button";
import Navbar from '../Shared/Navbar';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'sonner';

const CompanySetup = () => {
    const [companyName, setCompanyName] = useState('');
    const [website, setWebsite] = useState('');
    const [location, setLocation] = useState('');
    const [logo, setLogo] = useState(null);
    const [description, setDescription] = useState('');
    const params = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCompanyData = async () => {
            if (params?.id) {
                try {
                    const res = await axios.get(`lucky-job.vercel.app/api/v1/company/getcompany/${params.id}`, {
                        withCredentials: true,
                    });
                    console.log(res.data);
                    
                    if (res.data.success) {
                        const company = res.data.company;
                        setCompanyName(company.name);
                        setWebsite(company.website || '');
                        setLocation(company.location || '');
                        setDescription(company.description || '');
                        setLogo(company.logo || null); // Optional, as you may not display it directly.
                    }
                } catch (error) {
                    console.error('Error fetching company data:', error);
                    toast.error('Failed to fetch company data');
                }
            }
        };

        fetchCompanyData();
    }, [params?.id]);

    const imageUpload = async (imageFile) => {
        const formData = new FormData();
        formData.append('image', imageFile);
        try {
            const res = await axios.post("lucky-job.vercel.app/api/v1/user/imageUpload", formData, {
                headers: {
                    'Content-Type': "multipart/form-data",
                },
            });
            return res.data.imageURl;
        } catch (error) {
            console.error(error);
            return null;
        }
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            let imageUrl = '';
            if (logo instanceof File) {
                imageUrl = await imageUpload(logo);
            } else {
                imageUrl = logo; // Keep the existing logo if not updated.
            }
            const res = await axios.post(`http://localhost:5555/api/v1/company/update/company/${params?.id}`, {
                companyName,
                website,
                location,
                logo: imageUrl,
                description,
            }, {
                headers: {
                    "Content-Type": "application/json",
                },
                withCredentials: true,
            });
            if (res.data.success) {
                console.log(res.data);
                
                toast.message(res.data.message);
                navigate('/admin/company');
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="bg-gray-100 min-h-screen">
            <Navbar />
            <div className="max-w-4xl mx-auto py-10">
                <div className="bg-white p-8 rounded-lg shadow-lg">
                    <div className="flex items-center justify-between mb-6">
                        <h1 className="text-2xl font-bold text-gray-800">Company Setup</h1>
                        <Button
                            className="flex items-center px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
                            onClick={() => navigate('/admin/company')}
                        >
                            Back
                        </Button>
                    </div>

                    <form onSubmit={submitHandler}>
                        <div className="space-y-8">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                <div>
                                    <Label htmlFor="company-name" className="text-sm font-medium text-gray-700">
                                        Company Name
                                    </Label>
                                    <Input
                                        value={companyName}
                                        disabled
                                        onChange={(e) => setCompanyName(e.target.value)}
                                        id="company-name"
                                        placeholder="Enter Company Name"
                                        className="w-full mt-2 px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                                    />
                                </div>
                                <div>
                                    <Label htmlFor="website" className="text-sm font-medium text-gray-700">
                                        Website
                                    </Label>
                                    <Input
                                        value={website}
                                        onChange={(e) => setWebsite(e.target.value)}
                                        id="website"
                                      
                                        placeholder="Enter Company Website"
                                        className="w-full mt-2 px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                <div>
                                    <Label htmlFor="location" className="text-sm font-medium text-gray-700">
                                        Location
                                    </Label>
                                    <Input
                                        value={location}
                                        onChange={(e) => setLocation(e.target.value)}
                                        id="location"
                                        placeholder="Enter Company Location"
                                        className="w-full mt-2 px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                                    />
                                </div>
                                <div>
                                    <Label htmlFor="file-upload" className="text-sm font-medium text-gray-700">
                                        Upload Company Logo
                                    </Label>
                                    <Input
                                        onChange={(e) => setLogo(e.target.files[0])}
                                        id="file-upload"
                                        type="file"
                                        className="w-full mt-2 px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                                    />
                                </div>
                            </div>

                            <div>
                                <Label htmlFor="description" className="text-sm font-medium text-gray-700">
                                    Description
                                </Label>
                                <textarea
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    id="description"
                                    placeholder="Enter Company Description"
                                    className="w-full mt-2 px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                                    rows="4"
                                ></textarea>
                            </div>
                            <Button className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
                                Submit
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default CompanySetup;
