import React from "react";
import { Box, Typography } from "@mui/material";
import healthcare from "../Images/healthcare.jpg"

import { Buttoncomponent } from "../Components/Buttoncomp";

const Home = () => {
  return (
    <Box sx={{ width: "100%" }}>
       <Typography variant="h3">
        HealthLens
      </Typography>
      <Typography variant="h4">
        Home to check the cost of health care
      </Typography>
      <Typography variant="h6">I am...</Typography>
      <Buttoncomponent
        href="/patient"
        size="medium"
        type="button"
        fullWidth={false}
        variant="contained"
        color="primary"
      >
        Patient
      </Buttoncomponent><br></br>



      <Buttoncomponent
        href="/provider"
        size="medium"
        type="button"
        fullWidth={false}
        variant="contained"
        color="primary"
      >
        Provider
      </Buttoncomponent><br></br>
      <Buttoncomponent
        href="/payer"
        size="medium"
        type="button"
        fullWidth={false}
        variant="contained"
        color="primary"
      >
        Payer
      </Buttoncomponent><br></br>
      <img
            src={healthcare}
            alt="Home"
            style={{
              width: "550px",
              height: "480px",
              //  top: "35px",
              // right: "60%",
              borderRadius: "13px"
            }}
          /> 
    </Box>
  );
};

export default Home;
