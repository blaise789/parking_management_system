// services/vehicle.ts
import api from "@/api";
import { IVehicle, VehicleInputs } from "@/types";
import { toast } from "react-hot-toast";

export const getVehicles = async ({
  page,
  limit,
  setLoading,
  setMeta,
  setVehicles,
  searchKey,
}: {
  page: number;
  limit: number;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setMeta: React.Dispatch<React.SetStateAction<any>>;
  setVehicles: React.Dispatch<React.SetStateAction<IVehicle[]>>;
  searchKey: string;
}) => {
  try {
    setLoading(true);
    let url = `/vehicles/search?page=${page}&limit=${limit}`;
    if (searchKey) url += `&searchKey=${encodeURIComponent(searchKey)}`;

    const response = await api.get(url);
    console.log(response.data.vehicles);
    setVehicles(response.data.vehicles);
    setMeta(response.data?.meta);
    toast.success("Vehicles fetched successfully");
  } catch (error: any) {
    console.log(error.message);
    // if (error.response?.status === 403) {
    //   window.location.replace("/login");
    // }
    toast.error("Error fetching vehicles");
  } finally {
    setLoading(false);
  }
};

export const createVehicle = async ({
  vehicleData,
  setLoading,
}: {
  vehicleData: VehicleInputs;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  try {
    setLoading(true);
    const data = {
      plateNumber: vehicleData.plateNumber,
      vehicleType: vehicleData.vehicleType,
      size: vehicleData.size,
      // attributes: { color: vehicleData.color, brand: vehicleData.brand },
    };
    console.log(data);
    const response = await api.post("/vehicles", {
      plateNumber: vehicleData.plateNumber,
      vehicleType: vehicleData.vehicleType,
      size: vehicleData.size,
      attributes: { color: vehicleData?.color, brand: vehicleData?.brand },
    });
    console.log(response);
    toast.success("Vehicle created successfully");
    return response.data;
  } catch (error: any) {
    if (error.response?.status === 403) {
      window.location.replace("/login");
    }
    toast.error(error?.response?.data?.message || "Error creating vehicle");
    throw error;
  } finally {
    setLoading(false);
  }
};

export const updateVehicle = async ({
  id,
  vehicleData,
  setLoading,
}: {
  id: string;
  vehicleData: VehicleInputs | IVehicle;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  try {
    setLoading(true);
    const response = await api.put(`/vehicles/${id}`, vehicleData);
    toast.success("Vehicle updated successfully");
    return response.data;
  } catch (error: any) {
    toast.error(error?.response?.data?.message || "Error updating vehicle");
    throw error;
  } finally {
    setLoading(false);
  }
};

export const deleteVehicle = async ({
  id,
  setLoading,
}: {
  id: string;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  try {
    setLoading(true);
    const response = await api.delete(`/vehicles/${id}`);
    toast.success("Vehicle deleted successfully");
    return response.data;
  } catch (error: any) {
    toast.error(error?.response?.data?.message || "Error deleting vehicle");
    throw error;
  } finally {
    setLoading(false);
  }
};
