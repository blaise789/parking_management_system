import { createSlice } from "@reduxjs/toolkit"

interface ParkingState{
        

}

const initialState={

}
const parkingSlice=createSlice({
    name:"parking",
    initialState,
    reducers:{
        createParking:()=>{

        },
        displayParkings:()=>{

        }
    
       

    }


})
export const {createParking,displayParkings}=parkingSlice.actions

export default parkingSlice.reducer