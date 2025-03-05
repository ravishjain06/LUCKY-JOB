import { getAllCompany } from '@/store/companySlice'
import { setAllJobs } from '@/store/jobSlice'
import axios from 'axios'
import React, { useEffect } from 'react'
import { useDispatch, } from 'react-redux'

const useGetAllCompany = () => {
   
    const dispatch = useDispatch()
     


    useEffect(() => {
        const fetchAllCompany = async () => {
            try {
                const res = await axios.get("lucky-job.vercel.app/api/v1/company/getcompany", { withCredentials: true })
                if (res.data.success) {
                    console.log(res.data);
                    dispatch(getAllCompany(res.data.company))
                }
            } catch (error) {
                console.log(error);
            }
        }
        fetchAllCompany()
    }, [dispatch])

}

export default useGetAllCompany
