import * as React from "react";
import { Grid, Typography, Button, Paper,Box,Container } from "@mui/material";
import axios from "axios";
import { Buttoncomponent } from "../Components/Buttoncomp"

interface Props {
  SlNo:number;
  ServiceCode : string | number;
  DiagnosisTestorServiceName : string | number;
  OrganisationPrices:string | number;
  Facility1Prices ?: string | number;
  Facility2Prices ?: string | number;
  Facility3Prices ?: string | number;
  children:React.ReactNode;

}

// const Pricelisthome: React.FC<Props> = (props) =>{
  function Pricelisthome(){

  return(
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
    
        sx={{
           
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        marginTop:"50px"
      }}
    >
            Upload your facility's Pricelist
            </Typography>
            
             
          <Buttoncomponent 
            type="submit"
            variant="contained"
            size="large"
            color="primary"
           margin="100px"
              
              > Choose file here</Buttoncomponent>
       
        
     
  
        <br />
        <br />
        <Buttoncomponent    type="submit"
          variant="contained"
          size="large"
          color="primary"
         margin="100px"
              >
          Save
        </Buttoncomponent>
      
        <Buttoncomponent
        type="submit"
        variant="contained"
        size="large"
        color="primary"
       margin="100px"
      // onClick={onSubmit}
    >
        Publish
      </Buttoncomponent>
      </Container>
      </>
  )
 
}
export default Pricelisthome;