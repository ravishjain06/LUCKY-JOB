import { setAdminJobs } from '@/store/jobSlice'
import axios from 'axios'
import React, { useEffect } from 'react'
import { useDispatch, } from 'react-redux'

const useGetAllAdminJobs = () => {
   
    const dispatch = useDispatch()

    useEffect(() => {
        const fetchAllAdminJobs = async () => {
            try {
                const res = await axios.get("http://localhost:5555/api/v1/job/getadminjobs", { withCredentials: true })
                if (res.data.success) {
                    // console.log(res.data.jobs);
                    dispatch(setAdminJobs(res.data.jobs))
                }
            } catch (error) {
                console.log(error);
            }
        }
        fetchAllAdminJobs()
    }, [])

}

export default useGetAllAdminJobs