import React from 'react';
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

import { Edit } from 'lucide-react';
import { useSelector } from 'react-redux';
import { Avatar, AvatarImage } from '@radix-ui/react-avatar';
import { Link } from 'react-router-dom';


const CompanyTable = ({ searchItem }) => {

    const { allCompany } = useSelector(store => store.company)
    console.log(allCompany);

    const filteredCompany = allCompany?.filter((company) => {
        return company.name.toLowerCase()?.includes(searchItem.toLowerCase())
    })

    return (
        <div className="max-w-7xl mx-auto px-6 py-8">
            <Table className="w-full table-auto border-collapse">

                <TableHeader>
                    <TableRow>
                        <TableHead className="px-6 py-3 text-left text-sm font-medium text-gray-600">Logo</TableHead>
                        <TableHead className="px-6 py-3 text-left text-sm font-medium text-gray-600">Name</TableHead>
                        <TableHead className="px-6 py-3 text-left text-sm font-medium text-gray-600">Date</TableHead>
                        <TableHead className="px-6 py-3 text-right text-sm font-medium text-gray-600">Location</TableHead>
                        <TableHead className="px-6 py-3 text-right text-sm font-medium text-gray-600">Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>

                    {
                        filteredCompany?.slice()?.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))?.map((company) => {
                            return (
                                <TableRow>
                                    <TableCell className="px-6 py-4 text-sm text-gray-800">
                                        <Avatar>
                                            <AvatarImage
                                                className="w-10 h-10 rounded-full object-cover"
                                                src={company?.logo}
                                                alt="@shadcn"
                                            />
                                        </Avatar>
                                    </TableCell>
                                    <TableCell className="px-6 py-4 text-sm text-gray-800">{company?.name}</TableCell>
                                    <TableCell className="px-6 py-4 text-sm text-gray-800">{company?.createdAt.split('T')[0]}</TableCell>
                                    <TableCell className="px-6 py-4 text-sm text-gray-600">
                                        {company?.location || "N/A"}
                                    </TableCell>

                                    <TableCell className="px-6 py-4 text-sm text-right">
                                        <Link
                                            to={`/admin/company/${company?._id}`}
                                            className="flex items-center gap-2 text-blue-500 hover:underline"
                                        >
                                            <Edit className="w-4 h-4" />
                                            <span>Edit</span>
                                        </Link>
                                    </TableCell>
                                </TableRow>
                            )
                        })
                    }




                </TableBody>

            </Table>
        </div>
    );
};

export default CompanyTable;
