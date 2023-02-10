import React from "react";
import { Navigate, Outlet } from "react-router";
import { SpinnerComponent } from "../components/SpinnerComponent";
import { useAuthStatus } from "../hooks/useAuthStatus";

export const PrivateRoute = () => {
  const { isLoading, loggedInAsAuthor, loggedInAsAdmin } = useAuthStatus();
  if (isLoading) {
    return <SpinnerComponent />;
  }
  return (
    <div>
      {loggedInAsAuthor || loggedInAsAdmin ? <Outlet /> : <Navigate to="/" />}
    </div>
  );
};
