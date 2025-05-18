// api/endpoints/parkingSlotEndpoints.ts
import { IParkingSlot, PaginatedResponse } from '@/types';
import { apiSlice } from '../../redux/api.slice';

export const parkingSlotApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getParkingSlots: builder.query<PaginatedResponse<IParkingSlot>, {
      page?: number;
      limit?: number;
      search?: string;
      size?: string;
      vehicleType?: string;
      status?: string;
      location?: string;
    }>({
      query: ({ page = 1, limit = 10, search = '', ...filters }) => ({
        url: '/parking-slots',
        params: { page, limit, search, ...filters },
      }),
      providesTags: ['ParkingSlot'],
    }),
    createParkingSlots: builder.mutation<IParkingSlot[], Omit<IParkingSlot, 'id'>[]>({
      query: (slots) => ({
        url: '/parking-slots/bulk',
        method: 'POST',
        body: slots,
      }),
      invalidatesTags: ['ParkingSlot'],
    }),
    updateParkingSlot: builder.mutation<IParkingSlot, IParkingSlot>({
      query: (slot) => ({
        url: `/parking-slots/${slot.id}`,
        method: 'PUT',
        body: slot,
      }),
      invalidatesTags: ['ParkingSlot'],
    }),
    deleteParkingSlot: builder.mutation<void, string>({
      query: (id) => ({
        url: `/parking-slots/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['ParkingSlot'],
    }),
  }),
});

export const {
  useGetParkingSlotsQuery,
  useCreateParkingSlotsMutation,
  useUpdateParkingSlotMutation,
  useDeleteParkingSlotMutation,
} = parkingSlotApiSlice;