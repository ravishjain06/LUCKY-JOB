
import { setAppliedJobs } from '@/store/applicantSlice'
import axios from 'axios'
import React, { useEffect } from 'react'
import { useDispatch, } from 'react-redux'

const useGetAllAppliedJobs = () => {
   
    const dispatch = useDispatch()

    useEffect(() => {
        const fetchAllAppliedJobs = async () => {
            try {
                const res = await axios.get("http://localhost:5555/api/v1/application/getappliedjobs", { withCredentials: true })
                if (res.data.success) {
                    
                    dispatch(setAppliedJobs(res.data.application))
                }
            } catch (error) {
                console.log(error);
            }
        }
        fetchAllAppliedJobs()
    }, [])

}

export default useGetAllAppliedJobs