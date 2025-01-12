import { createSlice } from "@reduxjs/toolkit";

const companySlice = createSlice({
    name: "company",
    initialState: {
        singleCompany: null,
        allCompany: []
    },
    reducers: {
        setSingleCompany: (state, action) => {
            state.singleCompany = action.payload
        },
        getAllCompany: (state, action) => {
            state.allCompany = action.payload
        }
    }
})

export const { setSingleCompany, getAllCompany } = companySlice.actions
export default companySlice.reducer