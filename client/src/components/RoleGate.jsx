import React from "react";
import { Navigate } from "react-router-dom";

export const RoleGate = ({ roles, children }) => {
  const user = JSON.parse(localStorage.getItem("user") || "null");
  if (!user || !roles.includes(user.role))
    return <Navigate to="/dashboard" replace />;
  return children;
};
