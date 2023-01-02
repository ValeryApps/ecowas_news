import React from "react";
import { Navigate, Outlet } from "react-router";
import { SpinnerComponent } from "../components/SpinnerComponent";
import { useAuthStatus } from "../hooks/useAuthStatus";

export const PrivateRoute = () => {
  const { isLoading, loggedIn } = useAuthStatus();
  if (isLoading) {
    return <SpinnerComponent />;
  }
  return <div>{loggedIn ? <Outlet /> : <Navigate to="/login" />}</div>;
};
