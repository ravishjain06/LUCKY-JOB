import { Edit, MoreHorizontal, Users } from 'lucide-react';
import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,

    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
const CompanyJobTable = ({ searchItem }) => {
    const { adminJobs } = useSelector((store) => store.job);

    const filterAdminJobs = adminJobs?.filter((job) =>
        job?.title?.toLowerCase()?.includes(searchItem?.toLowerCase())
    );

    return (
        <div className="max-w-7xl mx-auto px-6 py-8">
            <table className="w-full table-auto border-collapse">
                <thead>
                    <tr>
                        <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">Company Name</th>
                        <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">Role</th>
                        <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">Date</th>
                        <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">Location</th>
                        <th className="px-6 py-3 text-right text-sm font-medium text-gray-600">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {filterAdminJobs
                        ?.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                        ?.map((company) => (
                            <tr key={company?._id}>
                                <td className="px-6 py-4 text-sm text-gray-800">{company?.company?.name}</td>
                                <td className="px-6 py-4 text-sm text-gray-800">{company?.title}</td>
                                <td className="px-6 py-4 text-sm text-gray-800">{company?.createdAt.split('T')[0]}</td>
                                <td className="px-6 py-4 text-sm text-gray-600">{company?.location}</td>
                                <td className="px-6 py-4 text-sm text-right">
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <button className="p-2 text-gray-500 hover:text-gray-800">
                                                <MoreHorizontal className="w-5 h-5" />
                                            </button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end" className="w-48">
                                           
                                            <DropdownMenuItem asChild>
                                                <Link
                                                    to={`/admin/company/applicants/${company?._id}`}
                                                    className="flex items-center gap-2 text-gray-800 hover:text-blue-500"
                                                >
                                                    <Users className="w-4 h-4" />
                                                    <span>Applicants</span>
                                                </Link>
                                            </DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </td>
                            </tr>
                        ))}
                </tbody>
            </table>
        </div>
    );
};

export default CompanyJobTable;
