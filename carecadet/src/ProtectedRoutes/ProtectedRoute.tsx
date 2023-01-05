import React from "react";
import {  Navigate, useNavigate } from "react-router";
import { Box, Grid,Tabs,Tab,Typography } from "@mui/material";


import OrganizationLandingView from "../Pages/Organization/OrganizationLandingView";
import { useAppSelector, useAppDispatch } from "../Redux/Hook";
import { axiosPrivate } from "../axios/axios";
import { organizationEdit } from "../Redux/orgSlice";

interface Props {
  children: JSX.Element;
  getData: string;
}

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
  };
}


const ProtectedRoute = ({ children, getData }: Props) => {
 
  const navigate = useNavigate();

  const dispatch = useAppDispatch();
  const userID = useAppSelector((state) => state.auth.login.userID);
  const authUser = useAppSelector((state) => state.auth);
 
  const [data, setData] = React.useState<any>([]);
  const [value, setValue] = React.useState(0);
  
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
    if(newValue===0){
      navigate("/viewFacility")
    }
    if(newValue===1){
      navigate("/listService")
    }
  };

 
 
 
  React.useEffect(() => {
    if (data.length === 0 || getData === "providerorg") {
      axiosPrivate.get(`/organization/getOrganizationByProvider?providerID=${userID}`) 
        .then((res) => {
         const resData = res.data.data;
          if (resData.length === 0) {
            navigate("/org");
          } else {
            dispatch(organizationEdit(resData));
            setData(res.data.data);
          }
        })
        .catch((err) => console.log(err));
    }
  }, [getData]);


  let isAuth =authUser.pageUser === "PROVIDER" &&(authUser.login.token !== null || undefined || "") &&authUser.logoutButton;
 
  return isAuth ? (
    <Grid container columnSpacing={"1rem"}>
      <Grid item xs={2.5}
        sx={{
          display: { xs: "none", md: data.length === 0 ? "none" : "block" },
        }}
      >
        <OrganizationLandingView data={data} />
      </Grid>
      <Grid item xs={data.length === 0 ? 12 : 9.5}>
      {(getData!=="org")&&(getData!=="editOrg")?( 
      <Box sx={{ m: 0, p: 0 }}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <Tabs value={value} onChange={handleChange}>
              <Tab label="Facility " {...a11yProps(0)} />
              <Tab label="Services" {...a11yProps(1)} />
            </Tabs>
          </Box>
       
          {value === 0 ? (
          <TabPanel value={value} index={0}>{children}</TabPanel>
          ) : (
            <TabPanel value={value} index={1}>{children}</TabPanel>
          )}
        </Box>):(
        <>{children}</>
        )}
       
      </Grid>
    </Grid>
  ) : (
    <Navigate to="/login" replace />
  );
};

export default ProtectedRoute;
