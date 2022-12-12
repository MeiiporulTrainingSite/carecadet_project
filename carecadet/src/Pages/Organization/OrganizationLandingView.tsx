import React from "react";

import { Box, Grid, Typography,Paper } from "@mui/material";

import { axiosPrivate } from "../../axios/axios";
import { useAppDispatch, useAppSelector } from "../../Redux/Hook";
import { Buttoncomponent } from "../../Components/Buttoncomp";

import { organizationEdit } from "../../Redux/orgSlice";
// import { editButton } from "../../Redux/LoginSlice";
import { Navigate, useNavigate } from "react-router-dom";

type Props = {};

const OrganizationLandingView = (props: Props) => {
  const [data, setData] = React.useState<any>([]);
  const [popUp, setPopUp] = React.useState<boolean>(false);
  const userID = useAppSelector((state) => state.auth.login.userID);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const typo="1.2rem"
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
        <Box display={"flex"} justifyContent="center">
          <Paper elevation={5} sx={{padding:"2rem",backgroundColor: "primary.light", maxWidth: '78vw', borderRadius: '15px'}}>
        <Grid container justifyContent={"center"} >
          <Grid container item justifyContent="right">
            <Buttoncomponent
              type="submit"
              size="large"
              fullWidth={false}
              variant="contained"
              onClick={() => {
                dispatch(organizationEdit({ ...data[0] }));
                // dispatch(editButton())
                navigate("/editOrg");
              }}
              
              sx={{
                fontSize:"1rem",
                mb:"0.5rem",
                backgroundColor: "secondary.dark",
                width: "15vw",
                color: "#fff",
                "&:hover": {
                  color: "secondary.dark",
                  border: "1px solid blue",
                  // letterSpacing: "0.2rem",
                  fontSize: "1rem",
                },
              }}
            >
              Edit
            </Buttoncomponent>
          </Grid>
          
          <Grid container rowGap="1rem" >
            
            <Grid item xs={12}>
              <Typography mb={"0.5rem"} sx={{
                  backgroundColor: "#B4C8FC",
                  padding: "0.3rem",
                  textAlign: "center",
                  fontSize: "2rem",
                }}>Organization Detail</Typography>
            </Grid>

            <Grid item xs={3} >
              <Typography fontSize={typo}>Orgainzation ID</Typography>
            </Grid>
            <Grid item xs={1}>
              <Typography fontSize={typo}>:</Typography>
            </Grid>
            <Grid item xs={8}>
              <Typography fontSize={typo}>{data[0].organizationID}</Typography>
            </Grid>
            <Grid item xs={3}>
              <Typography fontSize={typo}>Orgainzation Name</Typography>
            </Grid>
            <Grid item xs={1}>
              <Typography fontSize={typo}>:</Typography>
            </Grid>
            <Grid item xs={8}>
              <Typography fontSize={typo}>{data[0].organizationName}</Typography>
            </Grid>
            <Grid item xs={3}>
              <Typography fontSize={typo}>Email</Typography>
            </Grid>
            <Grid item xs={1}>
              <Typography fontSize={typo}>:</Typography>
            </Grid>
            <Grid item xs={8}>
              <Typography fontSize={typo}>{data[0].email}</Typography>
            </Grid>
            <Grid item xs={3}>
              <Typography fontSize={typo}>Address</Typography>
            </Grid>
            <Grid item xs={1}>
              <Typography fontSize={typo}>:</Typography>
            </Grid>
            <Grid item xs={8}>
              <Typography fontSize={typo}>
                {data[0].address.addressLine1}, {data[0].address.addressLine2}, {data[0].address.city}, {data[0].address.state}, {data[0].address.zipCode}
              </Typography>
            </Grid>
            <Grid item xs={3}>
              <Typography fontSize={typo}>Contact</Typography>
            </Grid>
            <Grid item xs={1}>
              <Typography fontSize={typo}>:</Typography>
            </Grid>
            <Grid item xs={8}>
              <Typography fontSize={typo}>{data[0].contact}</Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography mb={"0.5rem"} sx={{
                  backgroundColor: "#B4C8FC",
                  padding: "0.3rem",
                  textAlign: "center",
                  fontSize: "2rem",
                }}>Contact Person Detail</Typography>
            </Grid>

            <Grid item xs={3}>
              <Typography fontSize={typo}>Name</Typography>
            </Grid>
            <Grid item xs={1}>
              <Typography fontSize={typo}>:</Typography>
            </Grid>
            <Grid item xs={8}>
              <Typography fontSize={typo}>{data[0].contactPerson.firstName} {data[0].contactPerson.lastName}</Typography>
            </Grid>
            <Grid item xs={3}>
              <Typography fontSize={typo}>Role</Typography>
            </Grid>
            <Grid item xs={1}>
              <Typography fontSize={typo}>:</Typography>
            </Grid>
            <Grid item xs={8}>
              <Typography fontSize={typo}>{data[0].contactPerson.role}</Typography>
            </Grid>
            <Grid item xs={3}>
              <Typography fontSize={typo}>Email</Typography>
            </Grid>
            <Grid item xs={1}>
              <Typography fontSize={typo}>:</Typography>
            </Grid>
            <Grid item xs={8}>
              <Typography fontSize={typo}>{data[0].contactPerson.email}</Typography>
            </Grid>
            <Grid item xs={3}>
              <Typography fontSize={typo}>Contact No</Typography>
            </Grid>
            <Grid item xs={1}>
              <Typography fontSize={typo}>:</Typography>
            </Grid>
            <Grid item xs={8}>
              <Typography fontSize={typo}>{data[0].contactPerson.contact}</Typography>
            </Grid>
            
          </Grid>
         
        </Grid>
        </Paper>
        </Box>
      ) : (
        navigate("/org")
      )}
    </>
  );
};

export default OrganizationLandingView;
