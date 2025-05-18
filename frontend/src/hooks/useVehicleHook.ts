// // hooks/useVehicles.ts
// import { useAppDispatch, useAppSelector } from './hooks';
// import { 
//   useGetVehiclesQuery, 
//   useAddVehicleMutation, 
//   useUpdateVehicleMutation, 
//   useDeleteVehicleMutation 
// } from '../api/endpoints/vehicle.endpoints';
// import { 
//   setVehicles, 
//   setPagination, 
//   setSearchQuery, 
//   setSelectedVehicle,
//   addVehicle,
//   updateVehicle,
//   removeVehicle
// } from '../redux/features/VehicleSlice';
// import { useEffect } from 'react';
// import { Vehicle } from '@/types';

// export const useVehicles = () => {
//   const dispatch = useAppDispatch();
//   const { 
//     vehicles, 
//     currentPage, 
//     itemsPerPage, 
//     searchQuery, 
//     selectedVehicle 
//   } = useAppSelector((state) => state.vehicles);

//   const { data, isLoading, isFetching, refetch } = useGetVehiclesQuery({
//     page: currentPage,
//     limit: itemsPerPage,
//     search: searchQuery,
//   });

//   const [addVehicleMutation] = useAddVehicleMutation();
//   const [updateVehicleMutation] = useUpdateVehicleMutation();
//   const [deleteVehicleMutation] = useDeleteVehicleMutation();

//   useEffect(() => {
//     if (data) {
//       dispatch(setVehicles(data.data));
//       dispatch(setPagination({
//         currentPage: data.meta.page,
//         totalPages: data.meta.totalPages,
//         totalItems: data.meta.total,
//         itemsPerPage: data.meta.limit,
//       }));
//     }
//   }, [data, dispatch]);

//   const handleSearch = (query: string) => {
//     dispatch(setSearchQuery(query));
//   };

//   const handlePageChange = (page: number) => {
//     dispatch(setPagination({
//       currentPage: page,
//       itemsPerPage,
//       totalPages: data?.meta.totalPages || 1,
//       totalItems: data?.meta.total || 0,
//     }));
//   };

//   const selectVehicle = (vehicle: Vehicle | null) => {
//     dispatch(setSelectedVehicle(vehicle));
//   };

//   const createVehicle = async (vehicleData: Omit<Vehicle, 'id'>) => {
//     try {
//       const newVehicle = await addVehicleMutation(vehicleData).unwrap();
//       dispatch(addVehicle(newVehicle));
//       return { success: true, vehicle: newVehicle };
//     } catch (error) {
//       console.error('Failed to add vehicle:', error);
//       return { success: false, error };
//     }
//   };

//   const editVehicle = async (vehicle: Vehicle) => {
//     try {
//       const updatedVehicle = await updateVehicleMutation(vehicle).unwrap();
//       dispatch(updateVehicle(updatedVehicle));
//       return { success: true, vehicle: updatedVehicle };
//     } catch (error) {
//       console.error('Failed to update vehicle:', error);
//       return { success: false, error };
//     }
//   };

//   const deleteVehicle = async (id: string) => {
//     try {
//       await deleteVehicleMutation(id).unwrap();
//       dispatch(removeVehicle(id));
//       return { success: true };
//     } catch (error) {
//       console.error('Failed to delete vehicle:', error);
//       return { success: false, error };
//     }
//   };

//   return {
//     vehicles,
//     currentPage,
//     itemsPerPage,
//     totalPages: data?.meta.totalPages || 1,
//     totalItems: data?.meta.total || 0,
//     searchQuery,
//     selectedVehicle,
//     isLoading: isLoading || isFetching,
//     handleSearch,
//     handlePageChange,
//     selectVehicle,
//     createVehicle,
//     editVehicle,
//     deleteVehicle,
//     refetch,
//   };
// };