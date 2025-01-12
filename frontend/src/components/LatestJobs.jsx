import React from 'react'
import LatestJobsCards from './LatestJobsCards'
import { useSelector } from 'react-redux'

const LatestJobs = () => {

    const { allJobs } = useSelector(store => store.job)
    console.log(allJobs);


    return (
        <div className='max-w-7xl mx-auto my-20'>
            <h1 className='text-3xl font-bold '><span className='text-[#1561f0]'>Latest</span> Job Openings</h1>
            <div className='grid grid-cols-3 gap-4 my-5'>
                {
                    allJobs.length <= 0 ? <span>No Jobs Available</span> : allJobs?.slice(0, 6).map((job,index) => {
                        return <LatestJobsCards key={index}  job={job} />
                    })
                }
            </div>


        </div>
    )
}

export default LatestJobs