import { setAllJobs } from '@/store/jobSlice'
import axios from 'axios'
import React, { useEffect } from 'react'
import { useDispatch, useSelector, } from 'react-redux'

const useGetAllBrowseJob = () => {

    const dispatch = useDispatch()
    const { searchQuery } = useSelector(store => store.job)

    useEffect(() => {

        console.log("searchQuery", searchQuery);

        const fetchAllJobs = async () => {

            try {
                const res = await axios.get(`http://localhost:5555/api/v1/job/getalljobs?keyword=${searchQuery}`, { withCredentials: true })
                if (res.data.success) {
                    // console.log("Broweser jobs");
                    dispatch(setAllJobs(res.data.jobs))
                }
            } catch (error) {
                console.log(error);
            }
        }
        fetchAllJobs()
    }, [searchQuery,dispatch])

}

export default useGetAllBrowseJob