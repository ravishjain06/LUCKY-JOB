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
import useGetAllAppliedJobs from './hooks/useGetAppliedJobs';
import { useSelector } from 'react-redux';
import dayjs from 'dayjs';
import { Badge } from './ui/badge';

const AppliedJobTable = () => {

  useGetAllAppliedJobs()

  const { appliedJob } = useSelector(store => store.applicant)


  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      <Table className="w-full table-auto border-collapse">
        <TableCaption className="text-xl font-semibold text-gray-700 mb-4">Applied Job Opportunities</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="px-6 py-3 text-left text-sm font-medium text-gray-600">Date</TableHead>
            <TableHead className="px-6 py-3 text-left text-sm font-medium text-gray-600">Job Role</TableHead>
            <TableHead className="px-6 py-3 text-left text-sm font-medium text-gray-600">Company</TableHead>
            <TableHead className="px-6 py-3 text-right text-sm font-medium text-gray-600">Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>

          {
            appliedJob?.map((job) => {
              return (
                <TableRow key={job?._id}>
                  <TableCell className="px-6 py-4 text-sm text-gray-800">   {dayjs(job?.createdAt)?.format("YYYY-MM-DD")}</TableCell>
                  <TableCell className="px-6 py-4 text-sm text-gray-800">{job?.job?.title}</TableCell>
                  <TableCell className="px-6 py-4 text-sm text-gray-800">{job?.job?.company?.name}</TableCell>
                  <TableCell className="px-6 py-4 text-sm text-right text-gray-800  ">
                    <Badge variant="outline"> {job?.status}</Badge>

                  </TableCell>
                </TableRow>

              )
            })
          }


        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={3} className="text-left px-6 py-4 font-medium text-gray-700">Total Jobs Applied</TableCell>
            <TableCell className="text-right px-6 py-4 font-medium text-gray-700">{appliedJob.length || 0}</TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </div>
  );
};

export default AppliedJobTable;
