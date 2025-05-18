// api/endpoints/vehicleEndpoints.ts
import { PaginatedResponse, Vehicle } from "@/types";
import { apiSlice } from "../../redux/api.slice";

export const vehicleApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getVehicles: builder.query<
      PaginatedResponse<Vehicle>,
      { page?: number; limit?: number; search?: string }
    >({
      query: ({ page = 1, limit = 10, search = "" }) => ({
        url: "/vehicles",
        params: { page, limit, search },
      }),
      providesTags: ["Vehicle"],
    }),
    addVehicle: builder.mutation<Vehicle, Omit<Vehicle, "id">>({
      query: (vehicle) => ({
        url: "/vehicles",
        method: "POST",
        body: vehicle,
      }),
      invalidatesTags: ["Vehicle"],
    }),
    updateVehicle: builder.mutation<Vehicle, Vehicle>({
      query: (vehicle) => ({
        url: `/vehicles/${vehicle.id}`,
        method: "PUT",
        body: vehicle,
      }),
      invalidatesTags: ["Vehicle"],
    }),
    deleteVehicle: builder.mutation<void, string>({
      query: (id) => ({
        url: `/vehicles/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Vehicle"],
    }),
  }),
});

export const {
  useGetVehiclesQuery,
  useAddVehicleMutation,
  useUpdateVehicleMutation,
  useDeleteVehicleMutation,
} = vehicleApiSlice;
