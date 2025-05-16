// src/redux/slices/parkingLotSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ParkingSpot{
  
}
interface ParkingTicket{

}
interface ParkingReservation{

}

interface ParkingLot {
  id: number;
  name: string;
  capacity: number;
  openingTime: string;
  closingTime: string;
  isActive: boolean;
  
}

interface ParkingLotState {
  parkingLots: ParkingLot[];
  currentParkingLot: ParkingLot | null;
}

const initialState: ParkingLotState = {
  parkingLots: [],
  currentParkingLot: null
};

const parkingLotSlice = createSlice({
  name: 'parkingLot',
  initialState,
  reducers: {
    addParkingLot: (state, action: PayloadAction<ParkingLot>) => {
      state.parkingLots.push(action.payload);
    },
    setParkingLots: (state, action: PayloadAction<ParkingLot[]>) => {
      state.parkingLots = action.payload;
    },
    setCurrentParkingLot: (state, action: PayloadAction<ParkingLot | null>) => {
      state.currentParkingLot = action.payload;
    },
    updateParkingLot: (state, action: PayloadAction<ParkingLot>) => {
      const index = state.parkingLots.findIndex(lot => lot.id === action.payload.id);
      if (index !== -1) {
        state.parkingLots[index] = action.payload;
      }
    },
    removeParkingLot: (state, action: PayloadAction<number>) => {
      state.parkingLots = state.parkingLots.filter(lot => lot.id !== action.payload);
    }
  }
});

export const { 
  addParkingLot, 
  setParkingLots, 
  setCurrentParkingLot, 
  updateParkingLot, 
  removeParkingLot 
} = parkingLotSlice.actions;

export default parkingLotSlice.reducer;