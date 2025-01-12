import { setAllJobs } from '@/store/jobSlice'
import axios from 'axios'
import React, { useEffect } from 'react'
import { useDispatch, } from 'react-redux'

const useGetAllJobs = () => {
   
    const dispatch = useDispatch()

    useEffect(() => {
        const fetchAllJobs = async () => {
            try {
                const res = await axios.get("http://localhost:5555/api/v1/job/getalljobs", { withCredentials: true })
                if (res.data.success) {
                    // console.log(res.data.jobs);
                    dispatch(setAllJobs(res.data.jobs))
                }
            } catch (error) {
                console.log(error);
            }
        }
        fetchAllJobs()
    }, [])

}

export default useGetAllJobs