import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import { useUserDataStore } from "../store/userData";

export const ProtectedRoutes: React.FC = () => {
  const userData = useUserDataStore((state) => state.userData);
  const isLoggedIn = userData && userData.userName;

  if (isLoggedIn) {
    console.log("Entro");
  } else {
    console.log("No entro");
    console.log(userData);
  }

  return isLoggedIn ? <Outlet /> : <Navigate to="/" />;
};
