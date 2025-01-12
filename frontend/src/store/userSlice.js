import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: "user",
    initialState: {
        user: null
    },
    reducers: {
        setUser: (state,action) => {
            state.user = action.payload
        },
        setLogout:(state)=>{
            state.user = null
        }
    }
})

export const {setUser ,setLogout} = userSlice.actions
export default userSlice.reducer