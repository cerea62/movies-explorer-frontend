import React from 'react';
import { Navigate } from "react-router-dom";

function ProtectedRouteElement({ children }) {
  const isLoggedIn = localStorage.getItem("isLogin")
  return <>  {isLoggedIn ? children : <Navigate to="/" replace />}</>;
}

export default ProtectedRouteElement;