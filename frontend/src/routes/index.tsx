import React, { useContext } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Layout from "../layout/Layout";
import NotFound from "@/pages/404/Notfound";
import { CommonContext } from "@/context/CommonContext";
import Reservations from "@/pages/reservations/Reservations";
import Dashboard from "@/pages/dashboard/DashBoard";
import Vehicles from "@/pages/vehicles/Vehicle";
import Users from "@/pages/users/Users";
const Login=React.lazy(()=>import("@/pages/auth/Login"))
const SignUp=React.lazy(()=>import("@/pages/auth/SignUp"))
const ParkingSlots=React.lazy(() => import('../pages/parking-slots/ParkingSlots'))

const PagesRouter: React.FC = () => {

  const {isLoggedIn}=useContext(CommonContext)

  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={isLoggedIn?<Dashboard/>:<Navigate to={"/login"}/>}/>
          <Route path="/parking-slots" element={isLoggedIn ?<ParkingSlots/>:<Navigate to={"/login"} />}/>
          <Route path="/reservations" element={<Reservations/>}/>
          <Route path="/vehicles" element={<Vehicles/>}/>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} /> 
          <Route path="/users" element={<Users/>} />
        
          <Route path="*" element={<NotFound/>}/>
        </Routes>
      </Layout>
    </BrowserRouter>
  );
};

export default PagesRouter;
