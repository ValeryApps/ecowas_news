import React from "react";
import { Navigate, Outlet } from "react-router";
import { SpinnerComponent } from "../components/SpinnerComponent";
import { useAuthStatus } from "../hooks/useAuthStatus";

export const PrivateRoute = () => {
  const { loading, loggedInAsMod, loggedInAsAdmin } = useAuthStatus();
  if (loading) {
    return <SpinnerComponent />;
  }
  return (
    <div>
      {loggedInAsMod || loggedInAsAdmin ? <Outlet /> : <Navigate to="/" />}
    </div>
  );
};
