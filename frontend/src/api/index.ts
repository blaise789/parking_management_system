// src/services/api.js (or .ts)
import axios from "axios";
import { server_uri } from "./api";
// Import your Redux store
import { logout } from "../redux/slices/UserSlice"; // Import the logout action
import { useDispatch } from "react-redux";

// Create a function to get a fresh instance with the current token

const createApiInstance = () => {
  const token = localStorage.getItem("token");

  return axios.create({
    baseURL: server_uri,
    headers: {
      "Content-Type": "application/json",
      Authorization: token ? `Bearer ${token}` : "",
    },
    // withCredentials: true
  });
};

// Create the base API instance
const api = createApiInstance();

// Add a response interceptor to handle token expiration
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const originalRequest = error.config;

    // If the error is due to an expired token (status code 401)
    if (
      error.response &&
      error.response.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;
      const dispatch = useDispatch();

      // Token expired - logout the user
      dispatch(logout());

      // Redirect to login page is already handled by the logout action
      return Promise.reject(error);

      /* 
      // If you want to implement token refresh instead of immediate logout:
      
      return refreshToken().then(newToken => {
        // Update the header
        originalRequest.headers['Authorization'] = `Bearer ${newToken}`;
        // Return the request
        return axios(originalRequest);
      }).catch(() => {
        // If refresh fails, logout
        store.dispatch(logout());
        return Promise.reject(error);
      });
      */
    }

    // For other errors, just reject the promise
    return Promise.reject(error);
  }
);

// Add a request interceptor to ensure we always have the latest token
api.interceptors.request.use(
  (config) => {
    // Get the latest token from localStorage on every request
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

/* 
// Optional: Implement token refresh function if your backend supports it
const refreshToken = async () => {
  try {
    // Call your refresh token endpoint
    const response = await axios.post(
      `${server_uri}/refresh-token`,
      {},
      { 
        headers: { 
          'Authorization': `Bearer ${localStorage.getItem("refresh_token")}` 
        }
      }
    );
    
    // Save the new token
    const newToken = response.data.token;
    localStorage.setItem("token", newToken);
    
    // If you have a refresh action in your Redux store:
    // store.dispatch(refreshToken(newToken));
    
    return newToken;
  } catch (err) {
    // If refresh fails, clear tokens
    localStorage.removeItem("token");
    localStorage.removeItem("refresh_token");
    throw err;
  }
};
*/

export default api;
