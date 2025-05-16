import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "../layout/Layout";
import NotFound from "@/pages/Notfound";
const Login=React.lazy(()=>import("@/pages/Login"))
const SignUp=React.lazy(()=>import("@/pages/SignUp"))
const Home=React.lazy(() => import('../pages/Home'))

const PagesRouter: React.FC = () => {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} /> 
        
          <Route path="*" element={<NotFound/>}/>
        </Routes>
      </Layout>
    </BrowserRouter>
  );
};

export default PagesRouter;
