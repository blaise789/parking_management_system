import React, { JSX, useContext } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Layout from "../layout/Layout";
import NotFound from "@/pages/404/Notfound";
import { CommonContext } from "@/context/CommonContext";
import Dashboard from "@/pages/dashboard/DashBoard";
import Vehicles from "@/pages/vehicles/Vehicle";
import Users from "@/pages/users/Users";
import AdminReservations from "@/pages/reservations/AdminReservations";
import UserReservations from "@/pages/reservations/UserReservations";

const Login = React.lazy(() => import("@/pages/auth/Login"));
const SignUp = React.lazy(() => import("@/pages/auth/SignUp"));
const ParkingSlots = React.lazy(
  () => import("../pages/parking-slots/ParkingSlots")
);

const PagesRouter: React.FC = () => {
  const { isLoggedIn, user } = useContext(CommonContext);

  const ProtectedRoute = ({
    children,
    roles,
  }: {
    children: JSX.Element;
    roles?: string[];
  }) => {
    if (!isLoggedIn) {
      return <Navigate to="/login" />;
    }
    if (roles && !roles.includes(user?.role)) {
      return <Navigate to="/" />;
    }
    return children;
  };

  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/parking-slots"
            element={
              <ProtectedRoute roles={["ADMIN"]}>
                <ParkingSlots />
              </ProtectedRoute>
            }
          />

          <Route
            path="/reservations"
            element={
              <ProtectedRoute>
                {user?.role === "ADMIN" ? (
                  <AdminReservations />
                ) : (
                  <UserReservations />
                )}
              </ProtectedRoute>
            }
          />

          <Route
            path="/vehicles"
            element={
              <ProtectedRoute>
                <Vehicles />
              </ProtectedRoute>
            }
          />

          <Route
            path="/users"
            element={
              <ProtectedRoute roles={["ADMIN"]}>
                <Users />
              </ProtectedRoute>
            }
          />

          <Route
            path="/login"
            element={!isLoggedIn ? <Login /> : <Navigate to="/" />}
          />
          <Route
            path="/signup"
            element={!isLoggedIn ? <SignUp /> : <Navigate to="/" />}
          />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
};

export default PagesRouter;
