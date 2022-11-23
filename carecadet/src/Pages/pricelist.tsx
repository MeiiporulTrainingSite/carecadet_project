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
import { Buttoncomponent } from "../Components/Buttoncomp"
import Pricelisthome from "./Pricelisthome"

interface props {
    textalign : string
    children: JSX.Element;

}
function Pricelist() {
  const navigate = useNavigate();
  
  const navigateToupload = () => {
  
    // This will navigate to second component
    navigate('/Pricelisthome'); 
  };
 
 
  return (
    <>
    <Container
    //   sx={{
    //     maxWidth: "sm",
    //     display: "flex",
    //     flexDirection: "column",
    //     justifyContent: "center",
    //     alignItems: "center",
    //   }}
    >
      <Typography variant="h6" textAlign={"right"} justifyItems={"right"} sx={{ color: "Black" }} margin={"40px"} marginBottom={"5px"}>
        Hello User,
      </Typography>
      <div
          style={{
            flex: 1,
            height: "3px",
            backgroundColor: "darkgray",
          }}
        />
      <Typography   variant="h6"
      margin={"40px"}
        sx={{
           
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        marginTop:"50px"
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
        marginTop:"50px"
      }}>
        {/* <p className="para" style={{ paddingTop: "0" }}> */}I want to...
        {/* </p> */}
      </Typography>
      <Typography align='center'>
      <Buttoncomponent
          type="submit"
          variant="contained"
          size="large"
          color="primary"
         margin="100px"
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
      <Typography align='center'>
      <Buttoncomponent
      
      type="submit"
      variant="contained"
      size="large"
      color="primary"
     margin="100px"
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
        marginTop:"50px"
      }}>
        {/* <p className="para"> */}
        If you have more than one facility, you will be prompted to select files
        corresponding to each facility
        {/* </p> */}
      </Typography>
    </Container>
   
    </>
  );
}

export default Pricelist;
