import { Box, Typography, Link, Grid } from "@mui/material";
import React from "react";
import { useLocation, NavLink, useNavigate } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "../Redux/Hook";
import { logoutButton } from "../Redux/ProviderRedux/LoginSlice";
import { refrestState } from "../Redux/ProviderRedux/orgSlice";
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';

import { Buttoncomponent } from "../Components/Buttoncomp";
import { axiosPrivate } from "../axios/axios";
import { toast } from "react-toastify";

const OrganizationNav = () => {
  const location = useLocation().pathname.split("/")[2];
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const logout = useAppSelector(
    (state) => state.providerAuth.providerLogoutButton
  );
  const userID=useAppSelector((state)=>state.providerAuth.login.userID)
  const userName=useAppSelector(state=>state.providerAuth.login.userName)
  const onLogout = () => {
    axiosPrivate.post("/user/logout",userName).then(res=>{
        console.log(res,"logout")
        dispatch(logoutButton());
        dispatch(refrestState());
        // Cookies.remove("token");
        toast.success(res.data.message)
        // localStorage.removeItem("pageUserType");
        navigate("/provider/home");
    })
    
  };
  return (
    <Box display={"flex"}>
      <Box display={"flex"} gap="2rem">
        <Link
          to="/provider/facility/viewFacility"
          component={NavLink}
          underline="none"
        >
          <Typography
            sx={{
              color: location === "facility" ? "#4D77FF" : "default",
              fontSize: "1.1rem",
              borderBottom: location === "facility" ? "3px solid blue" : "none",
              padding: "0.3rem",
            
              cursor:"pointer"
            }}
          >
            Facility
          </Typography>
        </Link>
        <Link
          to="/provider/service/listService"
          component={NavLink}
          underline="none"
        >
          <Typography
            sx={{
              color: location === "service" ? "#4D77FF" : "default",
              fontSize: "1.1rem",
              borderBottom: location === "service" ? "3px solid blue" : "none",
              padding: "0.3rem",
              cursor:"pointer"
            }}
          >
            Service
          </Typography>
        </Link>
      </Box>
      {logout ? (
        <Grid container item justifyContent="flex-end">
           <Box sx={{width:"7vw",display:"flex",flexWrap:"nowrap",gap:"0.5rem",margin:"0 0 0 1.5rem"}}>
              <AccountCircleOutlinedIcon fontSize="large"/>
              <Typography sx={{margin:"0.2rem 0 0 0"}}>{userID}</Typography>
              </Box>
          <Buttoncomponent
            type="button"
            size="small"
            fullWidth={false}
            variant="contained"
            onClick={onLogout}
            sx={{
              backgroundColor: "secondary.dark",
              width: "7vw",
              color: "#fff",
              ml: "15px",
              "&:hover": {
                color: "secondary.dark",
                border: "1px solid blue",
                // letterSpacing: "0.2rem",
                // fontSize: "1rem",
              },
            }}
          >
            Logout
          </Buttoncomponent>
        </Grid>
      ) : null}
    </Box>
  );
};

export default OrganizationNav;
