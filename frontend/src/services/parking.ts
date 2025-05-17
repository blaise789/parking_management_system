import api from "@/api";
import { IParkingSlot, IMeta, ParkingSlotInputs } from "@/types";
import React from "react";
import toast from "react-hot-toast";

// Create a parking slot
export const createSlot = async ({
  slotData,
  setLoading,
}: {
  slotData: IParkingSlot;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  try {
    const url = "/slot/create";
    await api.post(url, { ...slotData });
    toast.success("Slot created successfully");
  } catch (error: any) {
    error?.response?.data?.message
      ? toast.error(error.response.data.message)
      : toast.error("Error creating slot");
  } finally {
    setLoading(false);
  }
};

// Get all parking slots with pagination + search
export const getParkingSlots = async ({
  page,
  limit,
  setLoading,
  setMeta,
  setParkingSlots,
  searchKey,
}: {
  page: number;
  limit: number;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setMeta: React.Dispatch<React.SetStateAction<IMeta>>;
  setParkingSlots: React.Dispatch<React.SetStateAction<IParkingSlot[]>>;
  searchKey: string;
}) => {
  try {
    let url = `/parking-slots?page=${page}&limit=${limit}`;
    if (searchKey) url += `&searchKey=${encodeURIComponent(searchKey)}`;

    const response = await api.get(url);
    console.log(response.data.data.parkingSlots)
    setParkingSlots(response.data.data.parkingSlots); // Assuming backend returns { slots, meta }
    setMeta(response.data.data.meta);
    
  
  } catch (error: any) {
    if (error.response?.status==403) {
      return window.location.replace("/login");
    }

    // error?.response?.data?.message
    //   ? toast.error(error.response.data.message)
    //   : toast.error("Error fetching parking slots");
  } finally {
    setLoading(false);
  }
};



// Create a parking slot
export const createParkingSlot = async ({
  slotData,
  setLoading,
}: {
  slotData: ParkingSlotInputs;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  try {
    setLoading(true);
    const url = "/parking-slots/create";

    console.log(slotData)
    const response = await api.post(url, slotData);
    toast.success("Slot created successfully");
    return response.data;
  } catch (error: any) {
    error?.response?.data?.message
      ? toast.error(error.response.data.message)
      : toast.error("Error creating slot");
    throw error;
  } finally {
    setLoading(false);
  }
};

// Update a parking slot
export const updateParkingSlot = async ({
  id,
  slotData,
  setLoading,
}: {
  id: string;
  slotData:ParkingSlotInputs;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  try {
    setLoading(true);
    const url = `/parking-slots/update/${id}`;
    console.log(slotData)
    const response = await api.put(url, slotData);
    toast.success("Slot updated successfully");
    return response.data;
  } catch (error: any) {
    error?.response?.data?.message
      ? toast.error(error.response.data.message)
      : toast.error("Error updating slot");
    throw error;
  } finally {
    setLoading(false);
  }
};

// Delete a parking slot
export const deleteParkingSlot = async ({
  id,
  setLoading,
}: {
  id: string;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  try {
    setLoading(true);
    const url = `/parking-slots/${id}`;
    const response = await api.delete(url);
    toast.success("Slot deleted successfully");
    return response.data;
  } catch (error: any) {
    error?.response?.data?.message
      ? toast.error(error.response.data.message)
      : toast.error("Error deleting slot");
    throw error;
  } finally {
    setLoading(false);
  }
};