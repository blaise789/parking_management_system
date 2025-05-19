// components/forms/UserForm.tsx
import React, { useState } from "react";
import { Resolver, SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { BiLoaderAlt } from "react-icons/bi";
import { User, UserInputs } from "@/types";
import {
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";

const UserSchema = yup.object({
  name: yup.string().required("Name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup
    .string()
    .when("isEdit", {
      is: false,
      then: (schema) => schema.required("Password is required"),
      otherwise: (schema) => schema.notRequired(),
    })
    .min(6, "Password must be at least 6 characters"),
  role: yup
    .mixed<"user" | "admin">()
    .oneOf(["user", "admin"], "Invalid role")
    .required("Role is required"),
  status: yup
    .mixed<"active" | "inactive">()
    .oneOf(["active", "inactive"], "Invalid status")
    .required("Status is required"),
});

interface UserFormProps {
  initialData?: User | UserInputs | null;
  onSubmit: (data: UserInputs) => Promise<void>;
  onCancel: () => void;
  isEdit?: boolean;
}

export const UserForm: React.FC<UserFormProps> = ({
  initialData,
  onSubmit,
  onCancel,
  isEdit = false,
}) => {
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<UserInputs>({
    resolver: yupResolver(UserSchema) as Resolver<UserInputs>,
    mode: "onTouched",
    defaultValues: initialData || {
      role: "user",
      status: "active",
    },
    context: { isEdit },
  });

  const handleFormSubmit: SubmitHandler<UserInputs> = async (data) => {
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
      <TextField
        label="Full Name"
        variant="outlined"
        fullWidth
        {...register("name")}
        error={!!errors.name}
        helperText={errors.name?.message}
      />

      <TextField
        label="Email"
        variant="outlined"
        fullWidth
        type="email"
        {...register("email")}
        error={!!errors.email}
        helperText={errors.email?.message}
      />

      {!isEdit && (
        <TextField
          label="Password"
          variant="outlined"
          fullWidth
          type="password"
          {...register("password")}
          error={!!errors.password}
          helperText={errors.password?.message}
        />
      )}

      <FormControl fullWidth variant="outlined" error={!!errors.role}>
        <InputLabel>Role</InputLabel>
        <Select
          label="Role"
          defaultValue={initialData?.role || "user"}
          {...register("role")}
        >
          <MenuItem value="user">User</MenuItem>
          <MenuItem value="admin">Admin</MenuItem>
        </Select>
        {errors.role && (
          <p className="mt-1 text-xs text-red-500">{errors.role.message}</p>
        )}
      </FormControl>

      <FormControl fullWidth variant="outlined" error={!!errors.status}>
        <InputLabel>Status</InputLabel>
        <Select
          label="Status"
          defaultValue={initialData?.status || "active"}
          {...register("status")}
        >
          <MenuItem value="active">Active</MenuItem>
          <MenuItem value="inactive">Inactive</MenuItem>
        </Select>
        {errors.status && (
          <p className="mt-1 text-xs text-red-500">{errors.status.message}</p>
        )}
      </FormControl>

      <div className="flex justify-end space-x-3 pt-4">
        <Button variant="outlined" onClick={onCancel} disabled={loading}>
          Cancel
        </Button>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          disabled={loading}
        >
          {loading ? (
            <>
              <BiLoaderAlt className="animate-spin mr-2" size={18} />
              {isEdit ? "Updating..." : "Creating..."}
            </>
          ) : isEdit ? (
            "Update User"
          ) : (
            "Create User"
          )}
        </Button>
      </div>
    </form>
  );
};
