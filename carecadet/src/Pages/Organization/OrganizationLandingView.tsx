import React from "react";

import { Box, Grid, Typography } from "@mui/material";

import { axiosPrivate } from "../../axios/axios";
import { useAppDispatch, useAppSelector } from "../../Redux/Hook";
import { Buttoncomponent } from "../../Components/Buttoncomp";
import { TypeOf } from "yup";
import EditOrganization from "./EditOrganization";
import { organizationEdit } from "../../Redux/orgSlice";
import { useNavigate } from "react-router-dom";
import OrganizationInfo from "./OrganizationInfo";
type Props = {};

const OrganizationLandingView = (props: Props) => {
  const [data, setData] = React.useState<any>([]);
  const [popUp, setPopUp] = React.useState<boolean>(false);
  const userID = useAppSelector((state) => state.auth.login.userID);
  const dispatch = useAppDispatch();
  const navigate=useNavigate()
  console.log(userID);
  React.useEffect(() => {
    axiosPrivate
      .get(`/organization/getOrganizationByProvider?providerID=${userID}`)
      .then((res) => {
        setData(res.data.data);
        console.log(res.data.data);
      })
      .catch((err) => console.log(err));
  }, []);
  
  return (
    <>
    
        {data.length !== 0 ? (
          <Grid container>
            <Grid container item justifyContent="right">
              <Buttoncomponent
                type="submit"
                size="large"
                fullWidth={false}
                variant="contained"
                onClick={() => {
                  dispatch(organizationEdit({ ...data[0] }));
                  navigate("/editOrg")
                }}
                sx={{
                  backgroundColor: "secondary.dark",
                  width: "15vw",
                  color: "#fff",
                  "&:hover": {
                    color: "secondary.dark",
                    border: "1px solid blue",
                    // letterSpacing: "0.2rem",
                    // fontSize: "1rem",
                  },
                }}
              >
                Edit
              </Buttoncomponent>
            </Grid>
            <Grid container rowGap="0.5rem">
              <Grid item xs={12}>
                <Typography>Organization Detail</Typography>
              </Grid>

              <Grid item xs={3}>
                <Typography>Orgainzation ID</Typography>
              </Grid>
              <Grid item xs={1}>
                <Typography>:</Typography>
              </Grid>
              <Grid item xs={8}>
                <Typography>{data[0].organizationID}</Typography>
              </Grid>
              <Grid item xs={3}>
                <Typography>Orgainzation Name</Typography>
              </Grid>
              <Grid item xs={1}>
                <Typography>:</Typography>
              </Grid>
              <Grid item xs={8}>
                <Typography>{data[0].organizationName}</Typography>
              </Grid>
              <Grid item xs={3}>
                <Typography>Email</Typography>
              </Grid>
              <Grid item xs={1}>
                <Typography>:</Typography>
              </Grid>
              <Grid item xs={8}>
                <Typography>{data[0].email}</Typography>
              </Grid>
              <Grid item xs={3}>
                <Typography>Address</Typography>
              </Grid>
              <Grid item xs={1}>
                <Typography>:</Typography>
              </Grid>
              <Grid item xs={8}>
                <Typography>
                  {data[0].address.addressLine1},{data[0].address.addressLine2},
                  {data[0].address.city},{data[0].address.state},
                  {data[0].address.zipCode}
                </Typography>
              </Grid>
              <Grid item xs={3}>
                <Typography>Contact</Typography>
              </Grid>
              <Grid item xs={1}>
                <Typography>:</Typography>
              </Grid>
              <Grid item xs={8}>
                <Typography>{data[0].contact}</Typography>
              </Grid>
            </Grid>
          </Grid>
        ) : navigate('/org')}
    
      
    </>
  );
};

export default OrganizationLandingView;
