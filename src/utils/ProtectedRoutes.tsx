import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import { useUserDataStore } from "../store/userData";

export const ProtectedRoutes: React.FC = () => {
  const loading = useUserDataStore((state) => state.loading);
  const isAuthenticated = useUserDataStore((state) => state.isAuthenticated);

  if (loading) {
    return <p>Loading...</p>;
  }

  return isAuthenticated ? <Outlet /> : <Navigate to="/" />;
};
