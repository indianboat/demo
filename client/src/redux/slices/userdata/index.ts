import {createSlice} from '@reduxjs/toolkit'

export const userSlice = createSlice({
    initialState : {
        cuser:''
    },
    name : 'user',
    reducers:{
        updateuser: (state,action)=>{
            return{
                ...state,
            cuser:action.payload ? action.payload.name:state.cuser
            }
        }
    }
})
export const {updateuser} = userSlice.actions;
export default userSlice.reducer