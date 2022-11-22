import React, { FC } from "react";
import { Route, RouteProps, Navigate } from "react-router";
import "./check.css"

interface Props {
  children: JSX.Element;
}
const ProtectedRoute = ({ children }: Props) => {
  const isAuth = false;
  return isAuth ? <div className="check"><div>sidenav</div>{children}</div> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
