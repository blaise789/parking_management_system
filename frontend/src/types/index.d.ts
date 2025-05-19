export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  status?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export type UserInputs = Omit<User, "id" | "createdAt" | "updatedAt"> & {
  password?: string;
};
export type SlotStatus = "AVAILABLE" | "UNVAILABLE";
export type VehicleType = "CAR" | "MOTORCYCLE" | "TRUCK";
export type VehicleSize = "SMALL" | "MEDIUM" | "LARGE";
export type ParkingLocation = "NORTH" | "SOUTH" | "EAST" | "WEST";

export interface IMeta {
  total: number;
  lastPage: number;
  currentPage: number;
  perPage: number;
  prev: number;
  next: number;
}
// types.ts

export interface IParkingSlot {
  id: string;
  slotNumber: string;
  vehicleType: VehicleType;
  size: VehicleSize;
  location: ParkingLocation;
  status: SlotStatus;
  createdAt?: Date;
  updatedAt?: Date;
}

// For form inputs
export type ParkingSlotInputs = {
  slotNumber: string;
  vehicleType: VehicleType;
  size: VehicleSize;
  location: ParkingLocation;
  status: SlotStatus;
};

// For API responses
export interface ApiResponse<T> {
  success: boolean;
  message?: string;
  data?: T;
  error?: string;
}

// For bulk operations

// types.ts
export interface BulkCreateParkingSlotDto {
  count: number;
  vehicleType: VehicleType;
  size: VehicleSize;
  location: ParkingLocation;
  status?: SlotStatus;
}
// for vehicles
export interface IVehicle {
  id: number;
  plateNumber: string;
  vehicleType: "CAR" | "MOTORCYCLE" | "TRUCK";
  size: "SMALL" | "MEDIUM" | "LARGE";
  brand: string; // Changed from 'maker' to 'brand' for consistency
  color: string;
  requests: any; // or proper request type
}

// Form input type (without id and requests)
export type VehicleInputs = Omit<IVehicle, "id" | "requests">;

interface PaginatedResponse<T> {
  data: T[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}
interface ISlotRequest {
  id: string;
  userId: string;
  vehicleId: string;
  slotId: string | null;
  status: "pending" | "approved" | "rejected";
  rejectionReason?: string;
  createdAt: string;
  updatedAt: string;
  vehicle: Vehicle;
  slot?: ParkingSlot;
}

export enum ReservationStatus {
  PENDING = "PENDING",
  APPROVED = "APPROVED",
  REJECTED = "REJECTED",
}

export interface ParkingReservation {
  id: string;
  userId: string;
  vehicleId: number;
  slotId: string | null;
  slotNumber: string | null;
  status: ReservationStatus;
  user: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
  };
  vehicle: {
    id: number;
    plateNumber: string;
    vehicleType: VehicleType;
    size: VehicleSize;
  };
  parkingSlot?: {
    id: string;
    slotNumber: string;
    size: VehicleSize;
    vehicleType: VehicleType;
    location: ParkingLocation;
  };
  createdAt: string;
  updatedAt: string;
  expiration?: string;
}
