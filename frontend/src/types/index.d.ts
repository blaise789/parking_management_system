export interface User {
    id: number;
    name: string;
    email: string;
    role: string;
}
export type SlotStatus = 'AVAILABLE' | 'UNVAILABLE'
export type VehicleType = 'CAR' | 'MOTORCYCLE' | 'TRUCK';
export type VehicleSize = 'SMALL' | 'MEDIUM' | 'LARGE';
export type ParkingLocation = 'NORTH' | 'SOUTH' | 'EAST' | 'WEST';


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
interface Vehicle {
  id: string;
  userId: string;
  plateNumber: string;
  vehicleType: 'CAR' | 'MOTORCYCLE' | 'TRUCK';
  size: 'SMALL' | 'MEDIUM' | 'LARGE';
  color?: string;
  model?: string;
  createdAt: string;
  updatedAt: string;
}

interface PaginatedResponse<T> {
  data: T[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}
interface SlotRequest {
  id: string;
  userId: string;
  vehicleId: string;
  slotId: string | null;
  status: 'pending' | 'approved' | 'rejected';
  rejectionReason?: string;
  createdAt: string;
  updatedAt: string;
  vehicle: Vehicle;
  slot?: ParkingSlot;
}
