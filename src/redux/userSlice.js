import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name:"counter",
    initialState:{
        user:null
    },
    reducers:{
        addUser:(state,action)=>{
            if(action.payload === "null"){
                state.user = null
                return;
            }
            state.user = action.payload
        },
        removeUser:(state,action)=>{
            state.user = null;
        }
    }
})

export const {addUser,removeUser} = userSlice.actions
export default userSlice.reducer