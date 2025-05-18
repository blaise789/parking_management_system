// features/parking-slots/parkingSlotSlice.ts
import { IParkingSlot } from '@/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ParkingSlotState {
  slots: IParkingSlot[];
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
  searchQuery: string;
  filters: {
    size?: string;
    vehicleType?: string;
    status?: string;
    location?: string;
  };
}

const initialState: ParkingSlotState = {
  slots: [],
  currentPage: 1,
  totalPages: 1,
  totalItems: 0,
  itemsPerPage: 10,
  searchQuery: '',
  filters: {},
};

const parkingSlotSlice = createSlice({
  name: 'parkingSlots',
  initialState,
  reducers: {
    setSlots: (state, action: PayloadAction<IParkingSlot[]>) => {
      state.slots = action.payload;
    },
    addSlots: (state, action: PayloadAction<IParkingSlot[]>) => {
      state.slots.push(...action.payload);
    },
    updateSlot: (state, action: PayloadAction<IParkingSlot>) => {
      const index = state.slots.findIndex(s => s.id === action.payload.id);
      if (index !== -1) {
        state.slots[index] = action.payload;
      }
    },
    setSlotStatus: (state, action: PayloadAction<{ id: string; status: 'AVAILABLE' | 'UNVAILABLE' }>) => {
      const slot = state.slots.find(s => s.id === action.payload.id);
      if (slot) {
        slot.status = action.payload.status;
      }
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
    setFilters: (state, action: PayloadAction<{
      size?: string;
      vehicleType?: string;
      status?: string;
      location?: string;
    }>) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    resetFilters: (state) => {
      state.filters = {};
    },
  },
});

export const {
  setSlots,
  addSlots,
  updateSlot,
  setSlotStatus,
  setPagination,
  setSearchQuery,
  setFilters,
  resetFilters,
} = parkingSlotSlice.actions;

export default parkingSlotSlice.reducer;