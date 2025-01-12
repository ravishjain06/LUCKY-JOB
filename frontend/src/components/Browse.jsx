import React from 'react';
import Navbar from './Shared/Navbar';
import JobPage from './JobPage';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchQuery } from '@/store/jobSlice';
import useGetAllBrowseJob from './hooks/useGetAllJobBrowse';
import { Link } from 'react-router-dom';

const Browse = () => {
    useGetAllBrowseJob();
    const { allJobs } = useSelector((store) => store.job);
    const randomJob = ["1", "2", "3", "4"];
    const dispatch = useDispatch();

    return (
        <div>

            <div className='flex max-w-7xl mx-auto  mt-5 gap-5 flex-col'>
                <div className="flex flex-col mt-5 gap-5">
                    <Link to="/" className="text-blue-500 hover:text-blue-700 text-sm font-medium">
                        &larr; Back to Home
                    </Link>

                    <h1 className='text-lg  font-semibold'>
                        Search Result ({allJobs.length || 0})
                    </h1>
                </div>

                <div className='h-[80vh] overflow-y-auto'>
                    {/* Check if there are jobs available */}
                    {allJobs && allJobs.length > 0 ? (
                        <div className='grid grid-cols-3 gap-3 p-0.5'>
                            {allJobs.map((job) => {
                                return <JobPage key={job._id} job={job} />;
                            })}
                        </div>
                    ) : (
                        <div className='flex  h-full'>
                            <p className='text-lg font-semibold flex justify-center items-center mx-auto text-gray-500'>
                                No jobs available at the moment.
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Browse;
