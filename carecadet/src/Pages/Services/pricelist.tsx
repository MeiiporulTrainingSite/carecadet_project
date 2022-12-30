import React from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import {
  Grid,
  Typography,
  Button,
  Paper,
  Box,
  Container,
  Divider,
} from "@mui/material";
// import useStyles from "./style";
import { Buttoncomponent } from "../../Components/Buttoncomp";
import { useAppDispatch,useAppSelector } from "../../Redux/Hook";

interface props {
  textalign: string;
  children: JSX.Element;
}
function Pricelist() {
  const navigate = useNavigate();
  const data = useAppSelector((state: { auth: { login: any; } }) => state.auth.login)
  const navigateToupload = () => {
    // This will navigate to second component
    navigate("/Pricelisthome");
  };

  return (
    <Paper
      elevation={9}
      sx={{
        backgroundColor: "primary.light",
        padding: "1.5rem",
        // borderRadius: "15px",
      }}
    >
      {/* <Typography
        variant="h6"
        textAlign={"right"}
        justifyItems={"right"}
        sx={{ color: "Black" }}
        margin={"40px"}
        marginBottom={"5px"}
      >
        Hello {data.userID},
      </Typography> */}
      {/* <div
        style={{
          flex: 1,
          height: "3px",
          backgroundColor: "darkgray",
        }}
      /> */}
      <Typography
        variant="h6"
        margin={"40px"}
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "50px",
        }}
      >
        {/* <p className="para" style={{ paddingTop: "50px" }}> */}
        Please upload a discounted cash price information for procedures
        performed in your facility
        {/* </p> */}
      </Typography>

      <Typography
        variant="h6"
        margin={"40px"}
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "50px",
        }}
      >
        {/* <p className="para" style={{ paddingTop: "0" }}> */}I want to...
        {/* </p> */}
      </Typography>
      <Typography align="center">
        <Buttoncomponent
          type="submit"
          variant="contained"
          size="large"
          color="primary"
          sx={{
            mt: 2,
            backgroundColor: "secondary.dark",
            width: "10vw",
            color: "#fff",
            "&:hover": {
              color: "secondary.dark",
              border: "1px solid blue",
              letterSpacing: "0.2rem",
              fontSize: "1rem",
            },
          }}
          onClick={navigateToupload}
        >
          Upload Price List
        </Buttoncomponent>
      </Typography>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          margin: "20px",
        }}
      >
        <div
          style={{
            flex: 1,
            height: "3px",
            backgroundColor: "darkgray",
          }}
        />

        <div>
          <p style={{ width: "70px", textAlign: "center", fontSize: "20px" }}>
            Or
          </p>
        </div>

        <div
          style={{
            flex: 1,
            height: "3px",
            backgroundColor: "darkgray",
          }}
        />
      </div>
      <Typography align="center">
        <Buttoncomponent
          type="submit"
          variant="contained"
          size="large"
          color="primary"
          sx={{
            mt: 2,
            backgroundColor: "secondary.dark",
            width: "10vw",
            color: "#fff",
            "&:hover": {
              color: "secondary.dark",
              border: "1px solid blue",
              letterSpacing: "0.2rem",
              fontSize: "1rem",
            },
          }}
          // className={classes.button}
          // sx={{ mt: 5 }}
        >
          Create Manually
        </Buttoncomponent>
      </Typography>
      <Typography
        variant="h6"
        margin={"40px"}
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "50px",
        }}
      >
        {/* <p className="para"> */}
        If you have more than one facility, you will be prompted to select files
        corresponding to each facility
        {/* </p> */}
      </Typography>
    </Paper>
  );
}

export default Pricelist;
