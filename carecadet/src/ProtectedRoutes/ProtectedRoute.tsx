import React from "react";
import { Route, RouteProps, Navigate } from "react-router";
import SideNavBar from "../component/SideNav/SideNavComp";
import { Box, Grid, Paper } from "@mui/material";

import { useAppSelector, useAppDispatch } from "../Redux/Hook";
import { refresh } from "../Redux/LoginSlice";

interface Props {
  children: JSX.Element;
}
const ProtectedRoute = ({ children }: Props) => {
  // const dispatch = useAppDispatch();
  // dispatch(refresh());
  const authUser = useAppSelector((state) => state.auth);
  let isAuth =
    authUser.pageUser === "PROVIDER" 
    &&
    (authUser.login.token !== null || undefined || "") &&
    (authUser.login.refreshToken !== null || undefined || "")&& authUser.logoutButton;
  console.log(isAuth, "check");
  // let isAuth=true
  return isAuth ? (
    <Grid container justifyContent="center">
      <Grid item xs={2.5} sx={{ display: { xs: "none", md:authUser.editOptions?"none":"block"} }}>
        <SideNavBar />
      </Grid>
      <Grid item xs={12} md={9.5} >
        {/* <Paper
        elevation={9}
          sx={{
            height: "88.8vh",
            borderRadius:"15px",

            "&::-webkit-scrollbar": {
              width: 20,
            },
            "&::-webkit-scrollbar-track": {
              backgroundColor: "grey",
            },
            "&::-webkit-scrollbar-thumb": {
              backgroundColor: "secondary.dark",
              borderRadius: 2,
            },
            overflowX: "hidden",
          }}
        > */}
        {children}
        {/* </Paper> */}
      </Grid>
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
