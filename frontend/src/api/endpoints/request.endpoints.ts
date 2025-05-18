// api/endpoints/requestEndpoints.ts
import { PaginatedResponse, SlotRequest } from '@/types';
import { apiSlice } from '../../redux/api.slice';

export const requestApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getSlotRequests: builder.query<PaginatedResponse<SlotRequest>, {
      page?: number;
      limit?: number;
      search?: string;
      status?: 'pending' | 'approved' | 'rejected';
      vehicleType?: string;
    }>({
      query: ({ page = 1, limit = 10, search = '', ...filters }) => ({
        url: '/slot-requests',
        params: { page, limit, search, ...filters },
      }),
      providesTags: ['SlotRequest'],
    }),
    createSlotRequest: builder.mutation<SlotRequest, { vehicleId: string }>({
      query: (request) => ({
        url: '/slot-requests',
        method: 'POST',
        body: request,
      }),
      invalidatesTags: ['SlotRequest'],
    }),
    updateSlotRequest: builder.mutation<SlotRequest, { id: string; vehicleId: string }>({
      query: ({ id, vehicleId }) => ({
        url: `/slot-requests/${id}`,
        method: 'PUT',
        body: { vehicleId },
      }),
      invalidatesTags: ['SlotRequest'],
    }),
    deleteSlotRequest: builder.mutation<void, string>({
      query: (id) => ({
        url: `/slot-requests/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['SlotRequest'],
    }),
    approveSlotRequest: builder.mutation<SlotRequest, { id: string; slotId: string }>({
      query: ({ id, slotId }) => ({
        url: `/slot-requests/${id}/approve`,
        method: 'PATCH',
        body: { slotId },
      }),
      invalidatesTags: ['SlotRequest', 'ParkingSlot'],
    }),
    rejectSlotRequest: builder.mutation<SlotRequest, { id: string; reason?: string }>({
      query: ({ id, reason }) => ({
        url: `/slot-requests/${id}/reject`,
        method: 'PATCH',
        body: { reason },
      }),
      invalidatesTags: ['SlotRequest'],
    }),
  }),
});

export const {
  useGetSlotRequestsQuery,
  useCreateSlotRequestMutation,
  useUpdateSlotRequestMutation,
  useDeleteSlotRequestMutation,
  useApproveSlotRequestMutation,
  useRejectSlotRequestMutation,
} = requestApiSlice;