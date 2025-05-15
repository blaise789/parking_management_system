import axios from "axios";
import { server_uri } from "./api";

const api = () => axios.create({
  baseURL:server_uri,
  
  headers: {
    'Content-Type': 'application/json',
    // "Authorization": "Bearer " + localStorage.getItem("token")
  },
//   withCredentials:true
});

export default api();