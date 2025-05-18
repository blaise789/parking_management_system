// features/requests/requestSlice.ts
import { SlotRequest } from '@/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface RequestState {
  requests: SlotRequest[];
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
  searchQuery: string;
  filters: {
    status?: 'pending' | 'approved' | 'rejected';
    vehicleType?: string;
  };
}

const initialState: RequestState = {
  requests: [],
  currentPage: 1,
  totalPages: 1,
  totalItems: 0,
  itemsPerPage: 10,
  searchQuery: '',
  filters: {},
};

const requestSlice = createSlice({
  name: 'requests',
  initialState,
  reducers: {
    setRequests: (state, action: PayloadAction<SlotRequest[]>) => {
      state.requests = action.payload;
    },
    addRequest: (state, action: PayloadAction<SlotRequest>) => {
      state.requests.unshift(action.payload);
    },
    updateRequest: (state, action: PayloadAction<SlotRequest>) => {
      const index = state.requests.findIndex(r => r.id === action.payload.id);
      if (index !== -1) {
        state.requests[index] = action.payload;
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
      status?: 'pending' | 'approved' | 'rejected';
      vehicleType?: string;
    }>) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    resetFilters: (state) => {
      state.filters = {};
    },
  },
});

export const {
  setRequests,
  addRequest,
  updateRequest,
  setPagination,
  setSearchQuery,
  setFilters,
  resetFilters,
} = requestSlice.actions;

export default requestSlice.reducer;