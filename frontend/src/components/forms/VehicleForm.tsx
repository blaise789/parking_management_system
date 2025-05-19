// components/forms/VehicleForm.tsx
import React, { useState } from "react";
import { Resolver, SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { BiLoaderAlt } from "react-icons/bi";
import { VehicleInputs, VehicleType, VehicleSize } from "@/types";

const VehicleSchema = yup.object({
  plateNumber: yup
    .string()
    .required("Plate number is required")
    .matches(
      /^[A-Z]{2,3}\d{3,4}$/,
      "Plate number must be in format ABC123 or AB1234"
    ),
  vehicleType: yup
    .mixed<VehicleType>()
    .required("Vehicle type is required")
    .oneOf(["CAR", "MOTORCYCLE", "TRUCK"], "Invalid vehicle type"),
  size: yup
    .mixed<VehicleSize>()
    .required("Size is required")
    .oneOf(["SMALL", "MEDIUM", "LARGE"], "Invalid size"),
  brand: yup.string(),
  color: yup.string(),
});

interface VehicleFormProps {
  initialData?: VehicleInputs;
  onSubmit: (data: VehicleInputs) => Promise<void>;
  onCancel: () => void;
}

export const VehicleForm: React.FC<VehicleFormProps> = ({
  initialData,
  onSubmit,
  onCancel,
}) => {
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<VehicleInputs>({
    resolver: yupResolver(VehicleSchema) as unknown as Resolver<VehicleInputs>,

    mode: "onTouched",
    defaultValues: initialData,
  });

  // Helper function to generate consistent input classes
  const getInputClass = (fieldName: keyof VehicleInputs) => {
    const baseClass = "w-full px-4 py-2 border rounded-lg transition";
    const errorClass = errors[fieldName]
      ? "border-red-500"
      : "border-gray-300 hover:border-gray-400";
    const focusClass =
      "focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:z-10";

    return `${baseClass} ${errorClass} ${focusClass}`;
  };

  const handleFormSubmit: SubmitHandler<VehicleInputs> = async (data) => {
    setLoading(true);
    try {
      await onSubmit(data);
    } catch (err) {
      console.error("Form submission error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit(handleFormSubmit)}>
      {/* Plate Number */}
      <div>
        <label
          htmlFor="plateNumber"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Plate Number*
        </label>
        <input
          id="plateNumber"
          type="text"
          placeholder="ABC123"
          className={getInputClass("plateNumber")}
          {...register("plateNumber")}
        />
        {errors.plateNumber && (
          <p className="mt-1 text-xs text-red-500">
            {errors.plateNumber.message}
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
          <option value="MOTORCYCLE">MOTORCYCLE</option>
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

      {/* brand */}
      <div>
        <label
          htmlFor="brand"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          brand
        </label>
        <input
          id="brand"
          type="text"
          placeholder="Corolla"
          className={getInputClass("brand")}
          {...register("brand")}
        />
        {errors.brand && (
          <p className="mt-1 text-xs text-red-500">{errors.brand.message}</p>
        )}
      </div>

      {/* Color */}
      <div>
        <label
          htmlFor="color"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Color*
        </label>
        <input
          id="color"
          type="text"
          placeholder="Red"
          className={getInputClass("color")}
          {...register("color")}
        />
        {errors.color && (
          <p className="mt-1 text-xs text-red-500">{errors.color.message}</p>
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
            "Update Vehicle"
          ) : (
            "Create Vehicle"
          )}
        </button>
      </div>
    </form>
  );
};
