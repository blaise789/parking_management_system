// components/parking/BulkCreateParkingSlotForm.tsx
import React, { useState } from "react";
import {
  BulkCreateParkingSlotDto,
  ParkingLocation,
  SlotStatus,
  VehicleSize,
  VehicleType,
} from "@/types";
import { BiLoaderAlt } from "react-icons/bi";
import { Resolver, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

const BulkCreateSchema = yup.object({
  count: yup
    .number()
    .required("Number of slots is required")
    .min(1, "Minimum 1 slot")
    .max(100, "Maximum 100 slots"),
  vehicleType: yup
    .mixed<VehicleType>()
    .oneOf(["CAR", "MOTORCYCLE", "TRUCK"])
    .required("Vehicle type is required"),
  size: yup
    .mixed<VehicleSize>()
    .oneOf(["SMALL", "MEDIUM", "LARGE"])
    .required("Size is required"),
  location: yup
    .mixed<ParkingLocation>()
    .oneOf(["NORTH", "SOUTH", "EAST", "WEST"])
    .required("Location is required"),
  status: yup
    .mixed<SlotStatus>()
    .oneOf(["AVAILABLE", "UNVAILABLE"])
    .default("AVAILABLE"),
});

interface BulkCreateParkingSlotFormProps {
  onSubmit: (data: BulkCreateParkingSlotDto) => Promise<void>;
  onCancel: () => void;
}

export const BulkCreateParkingSlotForm: React.FC<
  BulkCreateParkingSlotFormProps
> = ({ onSubmit, onCancel }) => {
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<BulkCreateParkingSlotDto>({
    resolver: yupResolver(BulkCreateSchema) as Resolver<
      BulkCreateParkingSlotDto,
      any
    >,
    defaultValues: {
      count: 10,
      vehicleType: "CAR",
      size: "MEDIUM",
      location: "NORTH",
      status: "AVAILABLE",
    },
  });

  const handleFormSubmit = async (data: BulkCreateParkingSlotDto) => {
    try {
      setLoading(true);
      await onSubmit(data);
    } catch (error) {
      console.error("Bulk creation error:", error);
    } finally {
      setLoading(false);
    }
  };

  const getInputClass = (hasError: boolean) => {
    const baseClass = "w-full px-4 py-2 border rounded-lg transition";
    const errorClass = hasError
      ? "border-red-500"
      : "border-gray-300 hover:border-gray-400";
    const focusClass =
      "focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:z-10";
    return `${baseClass} ${errorClass} ${focusClass}`;
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit(handleFormSubmit)}>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Number of Slots*
        </label>
        <input
          type="number"
          {...register("count", { valueAsNumber: true })}
          className={getInputClass(!!errors.count)}
          min="1"
          max="100"
        />
        {errors.count && (
          <p className="mt-1 text-xs text-red-500">{errors.count.message}</p>
        )}
        <p className="text-xs text-gray-500 mt-1">
          You can create up to 100 slots at once
        </p>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Vehicle Type*
        </label>
        <select
          {...register("vehicleType")}
          className={getInputClass(!!errors.vehicleType)}
        >
          <option value="CAR">Car</option>
          <option value="MOTORCYCLE">Motorcycle</option>
          <option value="TRUCK">Truck</option>
        </select>
        {errors.vehicleType && (
          <p className="mt-1 text-xs text-red-500">
            {errors.vehicleType.message}
          </p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Size*
        </label>
        <select {...register("size")} className={getInputClass(!!errors.size)}>
          <option value="SMALL">Small</option>
          <option value="MEDIUM">Medium</option>
          <option value="LARGE">Large</option>
        </select>
        {errors.size && (
          <p className="mt-1 text-xs text-red-500">{errors.size.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Location*
        </label>
        <select
          {...register("location")}
          className={getInputClass(!!errors.location)}
        >
          <option value="NORTH">North</option>
          <option value="SOUTH">South</option>
          <option value="EAST">East</option>
          <option value="WEST">West</option>
        </select>
        {errors.location && (
          <p className="mt-1 text-xs text-red-500">{errors.location.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Status
        </label>
        <select
          {...register("status")}
          className={getInputClass(!!errors.status)}
        >
          <option value="AVAILABLE">Available</option>
          <option value="UNVAILABLE">Unavailable</option>
        </select>
        {errors.status && (
          <p className="mt-1 text-xs text-red-500">{errors.status.message}</p>
        )}
      </div>

      <div className="flex justify-end space-x-3 pt-4">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors"
          disabled={loading}
        >
          Cancel
        </button>
        <button
          type="submit"
          className={`px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center ${
            loading ? "opacity-80 cursor-not-allowed" : ""
          }`}
          disabled={loading}
        >
          {loading ? (
            <>
              <BiLoaderAlt className="animate-spin mr-2" size={18} />
              Creating...
            </>
          ) : (
            "Create Slots"
          )}
        </button>
      </div>
    </form>
  );
};
