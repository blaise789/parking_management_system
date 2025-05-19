import api from "@/api";
import { User, UserInputs, IMeta } from "@/types";
import toast from "react-hot-toast";
import React from "react";

// Get all users with pagination + search
export const getUsers = async ({
  page,
  limit,
  setLoading,
  setMeta,
  setUsers,
  searchKey,
}: {
  page: number;
  limit: number;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setMeta: React.Dispatch<React.SetStateAction<IMeta>>;
  setUsers: React.Dispatch<React.SetStateAction<User[]>>;
  searchKey: string;
}) => {
  try {
    setLoading(true);
    let url = `/users?page=${page}&limit=${limit}`;
    if (searchKey) url += `&search=${encodeURIComponent(searchKey)}`;

    const response = await api.get(url);
    setUsers(response.data.data.users);
    setMeta(response.data.data.meta);
  } catch (error: any) {
    if (error.response?.status === 403) {
      return window.location.replace("/login");
    }

    error?.response?.data?.message
      ? toast.error(error.response.data.message)
      : toast.error("Error fetching users");
  } finally {
    setLoading(false);
  }
};

// Create a new user
export const createUser = async ({
  userData,
  setLoading,
}: {
  userData: UserInputs;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  try {
    setLoading(true);
    const url = "/users/create";
    const response = await api.post(url, userData);
    toast.success("User created successfully");
    return response.data;
  } catch (error: any) {
    error?.response?.data?.message
      ? toast.error(error.response.data.message)
      : toast.error("Error creating user");
    throw error;
  } finally {
    setLoading(false);
  }
};

// Update an existing user
export const updateUser = async ({
  id,
  userData,
  setLoading,
}: {
  id: string;
  userData: UserInputs;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  try {
    setLoading(true);
    const url = `/users/update/${id}`;
    const response = await api.put(url, userData);
    toast.success("User updated successfully");
    return response.data;
  } catch (error: any) {
    error?.response?.data?.message
      ? toast.error(error.response.data.message)
      : toast.error("Error updating user");
    throw error;
  } finally {
    setLoading(false);
  }
};

// Delete a user
export const deleteUser = async ({
  id,
  setLoading,
}: {
  id: string;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  try {
    setLoading(true);
    const url = `/users/${id}`;
    const response = await api.delete(url);
    toast.success("User deleted successfully");
    return response.data;
  } catch (error: any) {
    error?.response?.data?.message
      ? toast.error(error.response.data.message)
      : toast.error("Error deleting user");
    throw error;
  } finally {
    setLoading(false);
  }
};

