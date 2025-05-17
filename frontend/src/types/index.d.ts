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

// export interface IParkingSlot {
//   id:string
//   slotNumber: string;
//   vehicleType: string;
//   size: string;
//   location: string;
//   status: SlotStatus;
// }

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
