import React, { useEffect } from 'react'
import Navbar from '../Shared/Navbar'
import ApplicantsTable from './ApplicantsTable'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { setApplicants } from '@/store/applicantSlice'

const Applicants = () => {
    const { applicants } = useSelector((store) => store.applicant);

    // console.log(applicants.application.length);

    const params = useParams()
    const companyId = params.id
    const dispatch = useDispatch()
    useEffect(() => {

        const fetchApplicants = async () => {
            console.log(companyId);

            try {
                const res = await axios.get(`lucky-job.vercel.app/api/v1/application/getapplicants/${companyId}`, {
                    withCredentials: true
                })
                if (res.data.success) {
                    dispatch(setApplicants(res.data.job))
                    // console.log(res.data.job);
                }

            } catch (error) {
                console.log(error);
            }
        }
        fetchApplicants()
    }, [companyId])

    return (
        <div>
            <Navbar />
            <div className='max-w-7xl mx-auto mt-5'>
                <h1 className='font-bold text-xl'>Total Applicants({
                    applicants?.application?.length || 0})</h1>
                <ApplicantsTable />
            </div>
        </div>
    )
}

export default Applicants
