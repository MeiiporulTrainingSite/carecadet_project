import React from "react";
import { Route, RouteProps, Navigate } from "react-router";
import SideNavBar from './component/SideNav/SideNavComp';
import "./check.css"

interface Props {
  children: JSX.Element;
}
const ProtectedRoute = ({ children }: Props) => {
  const isAuth = true;
  return isAuth ? <div className="check"><div><SideNavBar/></div>{children}</div> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
