import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { BiLoaderAlt } from "react-icons/bi";
import {
  ParkingLocation,
  ParkingSlotInputs,
  SlotStatus,
  VehicleSize,
  VehicleType,
} from "@/types";

const ParkingSlotSchema = yup.object({
  slotNumber: yup
    .string()
    .required("Slot number is required")
    .matches(/^[A-Z]\d{3}$/, "Slot number must be in format A001"),
  vehicleType: yup
    .mixed<VehicleType>()
    .required("Vehicle type is required")
    .oneOf(["CAR", "MOTORCYCLE", "TRUCK"], "Invalid vehicle type"),
  size: yup
    .mixed<VehicleSize>()
    .required("Size is required")
    .oneOf(["SMALL", "MEDIUM", "LARGE"], "Invalid size"),
  location: yup
    .mixed<ParkingLocation>()
    .required("Location is required")
    .oneOf(["NORTH", "SOUTH", "EAST", "WEST"], "Invalid location"),
  status: yup
    .mixed<SlotStatus>()
    .oneOf(["AVAILABLE", "UNVAILABLE"], "Invalid status")
    .required("Status is required"),
});

interface ParkingSlotFormProps {
  initialData?: ParkingSlotInputs;
  onSubmit: (data: ParkingSlotInputs) => Promise<void>;
  onCancel: () => void;
}

export const ParkingSlotForm: React.FC<ParkingSlotFormProps> = ({
  initialData ,
  onSubmit,
  onCancel,
}) => {
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ParkingSlotInputs>({
    resolver: yupResolver(ParkingSlotSchema),
    mode: "onTouched",
    defaultValues: initialData || {
      status: "AVAILABLE",
    },
  });

  // Helper function to generate consistent input classes
  const getInputClass = (fieldName: keyof ParkingSlotInputs) => {
    const baseClass = "w-full px-4 py-2 border rounded-lg transition";
    const errorClass = errors[fieldName]
      ? "border-red-500"
      : "border-gray-300 hover:border-gray-400";
    const focusClass =
      "focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:z-10";

    return `${baseClass} ${errorClass} ${focusClass}`;
  };

  const handleFormSubmit: SubmitHandler<ParkingSlotInputs> = async (data) => {
    setLoading(true);
    try {
   console.log(data)
      await onSubmit(data);
    } catch (err) {
      console.error("Form submission error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit(handleFormSubmit)}>
      {/* Slot Number */}
      <div>
        <label
          htmlFor="slotNumber"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Slot Number*
        </label>
        <input
          id="slotNumber"
          type="text"
          placeholder="S001"
          className={getInputClass("slotNumber")}
          {...register("slotNumber")}
        />
        {errors.slotNumber && (
          <p className="mt-1 text-xs text-red-500">
            {errors.slotNumber.message}
          </p>
        )}
      </div>

      {/* Vehicle Type */}
      <div>
        <label
          htmlFor="vehicleType"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Vehicle Type*
        </label>
        <select
          id="vehicleType"
          className={getInputClass("vehicleType")}
          {...register("vehicleType")}
        >
          <option value="">Select vehicle type</option>
          <option value="CAR">CAR</option>
          <option value="MOTORCYCLE">MOTOCYCLE</option>
          <option value="TRUCK">TRUCK</option>
        </select>
        {errors.vehicleType && (
          <p className="mt-1 text-xs text-red-500">
            {errors.vehicleType.message}
          </p>
        )}
      </div>

      {/* Size */}
      <div>
        <label
          htmlFor="size"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Size*
        </label>
        <select
          id="size"
          className={getInputClass("size")}
          {...register("size")}
        >
          <option value="">Select size</option>
          <option value="SMALL">SMALL</option>
          <option value="MEDIUM">MEDIUM</option>
          <option value="LARGE">LARGE</option>
        </select>
        {errors.size && (
          <p className="mt-1 text-xs text-red-500">{errors.size.message}</p>
        )}
      </div>

      {/* Location */}
      <div>
        <label
          htmlFor="location"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Location*
        </label>
        <select
          id="location"
          className={getInputClass("location")}
          {...register("location")}
        >
          <option value="">Select location</option>
          <option value="NORTH">NORTH</option>
          <option value="SOUTH">SOUTH</option>
          <option value="EAST">EAST</option>
          <option value="WEST">WEST</option>
        </select>
        {errors.location && (
          <p className="mt-1 text-xs text-red-500">{errors.location.message}</p>
        )}
      </div>

      {/* Status */}
      <div>
        <label
          htmlFor="status"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Status*
        </label>
        <select
          id="status"
          className={getInputClass("status")}
          {...register("status")}
        >
          <option value="AVAILABLE">AVAILABLE</option>
          <option value="OCCUPIED">OCCUPIED</option>
        </select>
        {errors.status && (
          <p className="mt-1 text-xs text-red-500">{errors.status.message}</p>
        )}
      </div>

      {/* Form Actions */}
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
              {initialData ? "Updating..." : "Creating..."}
            </>
          ) : initialData ? (
            "Update Slot"
          ) : (
            "Create Slot"
          )}
        </button>
      </div>
    </form>
  );
};
