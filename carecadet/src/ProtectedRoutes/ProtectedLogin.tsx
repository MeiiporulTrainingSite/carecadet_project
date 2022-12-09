import React from "react";
import { Route, RouteProps, Navigate } from "react-router";
import SideNavBar from "../component/SideNav/SideNavComp";
import { Box, Grid, Paper } from "@mui/material";

import { useAppSelector, useAppDispatch } from "../Redux/Hook";
import { refresh } from "../Redux/LoginSlice";

type Props= {
  children: React.ReactNode
}
const ProtectedLogin = ({ children }: Props) => {
  // const dispatch = useAppDispatch();
  // dispatch(refresh());
  const authUser = useAppSelector((state) => state.auth.logoutButton);

  // let isAuth=true
  return !authUser ? <> { children }</> : <Navigate to="/org" replace />;
};

export default ProtectedLogin;

// import React from "react";
// import { Route, RouteProps, Navigate } from "react-router";
// import {Paper} from '@mui/material';
// import SideNavBar from './component/SideNav/SideNavComp';
// import "./check.css"

// interface Props {
//   children: JSX.Element;
// }
// const ProtectedRoute = ({ children }: Props) => {
//   const isAuth = true;
//   return isAuth ? <div className="check"><SideNavBar/>{children} </div> : <Navigate to="/login" replace />;
// };

// export default ProtectedRoute;
