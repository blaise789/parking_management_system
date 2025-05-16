// src/redux/slices/authSlice.ts
import { User } from '@/types';
import { createSlice } from '@reduxjs/toolkit';

interface  UserState  {
    user:User,
    token:string,
    isLoggedIn:boolean


}


const initialState:UserState={
    user:{
        id:0,
        name:"",
        email:"",
        role:""
    },
    isLoggedIn:false,
    token:""
}
const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login: (state,{payload}) => {
            state.isLoggedIn=true,
            // state.user = {...payload.user};
            console.log(payload)


            localStorage.setItem('token', payload.token);
        },
        logout: (state) => {
            state.token = "";
            state.user = {
                id: 0,
                name: "",
                email: "",
                role: ""
            };
            localStorage.removeItem('token');
        },
    },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;