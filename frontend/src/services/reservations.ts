import api from "@/api";
import { VehicleType, VehicleSize } from "@/types";
import { toast } from "react-hot-toast";

// Common service functions
export const getAvailableSlots = async (
  vehicleType: VehicleType,
  size: VehicleSize
) => {
  try {
    const response = await api.get(
      `/reservations/available-slots?vehicleType=${vehicleType}&size=${size}`
    );
    return response.data;
  } catch (error: any) {
    toast.error(
      error.response?.data?.message || "Error fetching available slots"
    );
    throw error;
  }
};

// Admin Services
export const adminGetAllReservations = async () => {
  try {
    const response = await api.get("/reservations");
    return response.data;
  } catch (error: any) {
    toast.error(error.response?.data?.message || "Error fetching reservations");
    throw error;
  }
};

export const adminApproveReservation = async (reservationId: string) => {
  try {
    const response = await api.post(`/reservations/${reservationId}/approve`);
    toast.success("Reservation approved successfully");
    return response.data;
  } catch (error: any) {
    toast.error(error.response?.data?.message || "Error approving reservation");
    throw error;
  }
};

export const adminRejectReservation = async (
  reservationId: string,
  reason?: string
) => {
  try {
    const response = await api.post(`/reservations/${reservationId}/reject`, {
      reason,
    });
    toast.success("Reservation rejected");
    return response.data;
  } catch (error: any) {
    toast.error(error.response?.data?.message || "Error rejecting reservation");
    throw error;
  }
};

export const adminAssignSlot = async (
  reservationId: string,
  slotId: string
) => {
  try {
    const response = await api.post(
      `/reservations/${reservationId}/assign-slot/${slotId}`
    );
    toast.success("Slot assigned successfully");
    return response.data;
  } catch (error: any) {
    toast.error(error.response?.data?.message || "Error assigning slot");
    throw error;
  }
};

// User Services
export const userGetMyReservations = async () => {
  try {
    const response = await api.get("/reservations/user/me");
    return response.data;
  } catch (error: any) {
    toast.error(
      error.response?.data?.message || "Error fetching your reservations"
    );
    throw error;
  }
};

export const userCreateReservation = async (vehicleId: number) => {
  try {
    const response = await api.post("/reservations", { vehicleId });
    toast.success("Parking reservation submitted");
    return response.data;
  } catch (error: any) {
    toast.error(error.response?.data?.message || "Error creating reservation");
    throw error;
  }
};

export const userCancelReservation = async (reservationId: string) => {
  try {
    const response = await api.delete(`/reservations/${reservationId}`);
    toast.success("Reservation cancelled successfully");
    return response.data;
  } catch (error: any) {
    toast.error(
      error.response?.data?.message || "Error cancelling reservation"
    );
    throw error;
  }
};
