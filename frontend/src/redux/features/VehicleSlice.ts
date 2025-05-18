// features/vehicles/vehicleSlice.ts
import { Vehicle } from '@/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface VehicleState {
  vehicles: Vehicle[];
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
  searchQuery: string;
  selectedVehicle: Vehicle | null;
}

const initialState: VehicleState = {
  vehicles: [],
  currentPage: 1,
  totalPages: 1,
  totalItems: 0,
  itemsPerPage: 10,
  searchQuery: '',
  selectedVehicle: null,
};

const vehicleSlice = createSlice({
  name: 'vehicles',
  initialState,
  reducers: {
    setVehicles: (state, action: PayloadAction<Vehicle[]>) => {
      state.vehicles = action.payload;
    },
    addVehicle: (state, action: PayloadAction<Vehicle>) => {
      state.vehicles.unshift(action.payload);
    },
    updateVehicle: (state, action: PayloadAction<Vehicle>) => {
      const index = state.vehicles.findIndex(v => v.id === action.payload.id);
      if (index !== -1) {
        state.vehicles[index] = action.payload;
      }
    },
    removeVehicle: (state, action: PayloadAction<string>) => {
      state.vehicles = state.vehicles.filter(v => v.id !== action.payload);
    },
    setPagination: (state, action: PayloadAction<{
      currentPage: number;
      totalPages: number;
      totalItems: number;
      itemsPerPage: number;
    }>) => {
      state.currentPage = action.payload.currentPage;
      state.totalPages = action.payload.totalPages;
      state.totalItems = action.payload.totalItems;
      state.itemsPerPage = action.payload.itemsPerPage;
    },
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
    setSelectedVehicle: (state, action: PayloadAction<Vehicle | null>) => {
      state.selectedVehicle = action.payload;
    },
  },
});

export const {
  setVehicles,
  addVehicle,
  updateVehicle,
  removeVehicle,
  setPagination,
  setSearchQuery,
  setSelectedVehicle,
} = vehicleSlice.actions;

export default vehicleSlice.reducer;