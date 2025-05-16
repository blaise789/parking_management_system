import React, { useContext } from "react";
import { BrowserRouter, Navigate, Route, Routes, useNavigate } from "react-router-dom";
import Layout from "../layout/Layout";
import NotFound from "@/pages/404/Notfound";
import { CommonContext } from "@/context/CommonContext";
const Login=React.lazy(()=>import("@/pages/Login"))
const SignUp=React.lazy(()=>import("@/pages/SignUp"))
const Home=React.lazy(() => import('../pages/Home'))

const PagesRouter: React.FC = () => {

  const {isLoggedIn}=useContext(CommonContext)
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={isLoggedIn ?<Home/>:<Navigate to={"/login"} />}/>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} /> 
        
          <Route path="*" element={<NotFound/>}/>
        </Routes>
      </Layout>
    </BrowserRouter>
  );
};

export default PagesRouter;
