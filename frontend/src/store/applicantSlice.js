import { createSlice } from "@reduxjs/toolkit";


const applicantSlice = createSlice({
    name: "applicant",
    initialState: {
        applicants: [],
        appliedJob: []
    },
    reducers: {
        setApplicants: (state, action) => {
            state.applicants = action.payload
        },
        setAppliedJobs: (state, action) => {
            state.appliedJob = action.payload
        }
    }
})

export const { setApplicants,setAppliedJobs} = applicantSlice.actions
export default applicantSlice.reducer