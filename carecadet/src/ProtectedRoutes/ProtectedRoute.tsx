import React from "react";
import { Route, RouteProps, Navigate ,useNavigate} from "react-router";
import SideNavBar from "../component/SideNav/SideNavComp";
import { Box, Grid, Paper } from "@mui/material";
import OrganizationLandingView from "../Pages/Organization/OrganizationLandingView";
import { useAppSelector, useAppDispatch } from "../Redux/Hook";
import { axiosPrivate } from "../axios/axios";
import { organizationEdit } from "../Redux/orgSlice";

interface Props {
  children: JSX.Element;
  getData:string
}
const ProtectedRoute = ({ children ,getData}: Props) => {
  // const dispatch = useAppDispatch();
  // dispatch(refresh());
   const [data, setData] = React.useState<any>([]);
 
  const userID = useAppSelector((state) => state.auth.login.userID);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const typo = "1.2rem";
  console.log(userID);
  React.useEffect(() => {
    if(data.length===0||getData==="providerorg"){
    axiosPrivate
      .get(`/organization/getOrganizationByProvider?providerID=${userID}`)
      .then((res) => {
        console.log(res,"resdata")
        const resData=res.data.data 
        console.log(res.data.data,'resdatadata')
        if(resData.length===0){
          navigate("/org")
        }
        else{
          dispatch(organizationEdit(res.data.data))
        setData(res.data.data);
        }
        console.log(res.data.data);
      })
      .catch((err) => console.log(err));
    }
  }, [getData]);

  const authUser = useAppSelector((state) => state.auth);
  let isAuth =
    authUser.pageUser === "PROVIDER" 
    &&
    (authUser.login.token !== null || undefined || "") &&
    (authUser.login.refreshToken !== null || undefined || "")&& authUser.logoutButton;
  console.log(isAuth, "check");
  // let isAuth=true
  return isAuth ? (
    <Grid container  columnSpacing={"1rem"} >
      <Grid item xs={2.5} sx={{ display: { xs: "none", md:data.length===0?"none":"block"} }}>
        <OrganizationLandingView data={data} />
      </Grid>
      {/* <Grid item xs={12} md={9.5} > */}
      <Grid item xs={data.length===0?12:9.5}  >
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
