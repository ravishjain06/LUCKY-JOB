import React, { useState } from "react";
import Navbar from "./Shared/Navbar";
import FilterPage from "./FilterPage";
import JobPage from "./JobPage";
import { Search } from "lucide-react";
import { useSelector } from "react-redux";

const Jobs = () => {
    const { allJobs } = useSelector((store) => store.job);
    const [filterJob, setFilterJob] = useState(allJobs);
    const [search, setSearch] = useState("");
    const [selectedFilters, setSelectedFilters] = useState({});

    const handleFilterChange = (filters) => {
        setSelectedFilters(filters);
    };

    const filterAllJob = allJobs.filter((job) => {
        const matchesSearch = job?.title?.toLowerCase().includes(search.toLowerCase());
        const matchesLocation = selectedFilters.Location
            ? job?.location === selectedFilters.Location
            : true;
        const matchesJob = selectedFilters.Job
            ? job?.title === selectedFilters.Job
            : true;

        
        const matchesSalary = selectedFilters.Salary
            ? (() => {
                const [min, max] = selectedFilters.Salary.split("-").map((val) =>
                    val.replace(" LPA", "").trim() === "+" ? Infinity : parseInt(val, 10)
                );
                return job?.salary >= min && (max === Infinity || job?.salary <= max);
            })()
            : true;

        return matchesSearch && matchesLocation && matchesJob && matchesSalary;
    });


    return (
        <div>
            <Navbar />
            <div className="flex max-w-7xl mx-auto mt-5 gap-5">
                {/* Filters Section */}
                <div className="max-w-[14rem] w-full px-2 py-4 h-[600px] bg-[#F5F5F5] rounded-lg">
                    <FilterPage onFilterChange={handleFilterChange} />
                </div>

                {/* Jobs Section */}
                <div className="flex flex-col gap-4">
                    {/* Search Bar */}
                    <div className="flex items-center w-[400px] gap-1.5 rounded-sm bg-[#2b2b2b]">
                        <input
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full px-3 py-1.5 border-none outline-none text-md bg-[#f2f2f2] placeholder:text-black"
                            type="text"
                            placeholder="Find Your Dream Job Here!"
                        />
                        <div className="text-white relative right-1 p-0.5">
                            <Search style={{ fontSize: "18px" }} />
                        </div>
                    </div>

                    {
                        filterAllJob.length > 0 ? (
                            <div className="h-[80vh] overflow-y-auto">
                                <div className="grid grid-cols-3 gap-3 p-0.5">
                                    {filterAllJob.map((job) => (
                                        <JobPage key={job.id} job={job} />
                                    ))}
                                </div>
                            </div>
                        ) : (
                            <div className='flex '>
                                <p className='text-lg font-semibold flex   text-gray-500'>
                                    No jobs available at the moment.
                                </p>
                            </div>
                        )
                    }


                </div>
            </div>
        </div>
    );
};

export default Jobs;
