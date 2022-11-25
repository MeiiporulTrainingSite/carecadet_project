import React from "react";
import { Route, RouteProps, Navigate } from "react-router";
import SideNavBar from "./component/SideNav/SideNavComp";
import { Grid } from "@mui/material";
import "./check.css";

interface Props {
  children: JSX.Element;
}
const ProtectedRoute = ({ children }: Props) => {
  const isAuth = true;
  return isAuth ? (
    <Grid container >
      <Grid item xs={2.5}>
        <SideNavBar />
      </Grid>
      <Grid item xs={9.5}>{children}</Grid>
    </Grid>
  ) : (
    <Navigate to="/login" replace />
  );
};

export default ProtectedRoute;







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
