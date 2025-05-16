export interface User {
    id: number;
    name: string;
    email: string;
    role: string;
}
export type SlotStatus = 'Available' | 'Unavailable';

export interface IParkingSlot {
  slotNumber: string;
  vehicleType: string;
  size: string;
  location: string;
  status: SlotStatus;
}

export interface IMeta {
  total: number;
  lastPage: number;
  currentPage: number;
  perPage: number;
  prev: number;
  next: number;
}

