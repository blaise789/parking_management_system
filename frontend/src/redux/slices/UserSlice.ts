// src/redux/slices/authSlice.ts
import { User } from '@/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

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
             
            state.user = payload.user;
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