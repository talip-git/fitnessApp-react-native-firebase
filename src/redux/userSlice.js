import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name:"counter",
    initialState:{
        user:null
    },
    reducers:{
        addUser:(state,action)=>{
            state.user = action.payload
        }
    }
})

export const {addUser} = userSlice.actions
export default userSlice.reducer