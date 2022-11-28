
import React from "react";
import { Form,Formik } from "formik";
import * as yup from "yup";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import styles from "./styles.module.css";
import { Grid,Box, Typography,TextField,Paper } from "@mui/material";
import Formtext from "../Components/Textfield";
import {Buttoncomponent} from "../Components/Buttoncomp";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

// interface Iconprops{
//  icon: any
// }
//create schema
const schema = yup.object().shape({
  firstName: yup.string().required("Username is a required field"),
  email: yup
    .string()
    .required("Email is a required field")
    .email("Invalid email"),
  password: yup
    .string()
    .required("Password is a required field")
    .min(4, "Password must be at least 4 characters"),
});

export default function Register() {
  const [text, setText] = useState("");

  const navigate = useNavigate();
  return (
   
    <Box sx={{ width: "100%",flexGrow: 1, backgroundColor: "primary.light" }}>
      
        
      <Formik
        initialValues={{
          firstName: "",
          email: "",
          password: "",
        }}
        validationSchema={schema}
      
        onSubmit={(values) => {
          alert(JSON.stringify(values));
          console.log(values, "values");
          const Registerdata = {
            firstName: values.firstName,
            password: values.password,
            email: values.email,
          };

          axios
            .post("http://localhost:5200/provider/createProvider", Registerdata)

            .then((res) => {
              navigate("/login");
              alert("Success");
            })

            .catch((err) => {
              toast.error(err.response.data);
          
           });
        
        }}
      >
       
            <Form>
          
             
      <Grid
              container
              direction="row"
              justifyContent="center"
              //  alignItems="center"
              
            >
      <Paper variant="outlined"   sx={{
          bgcolor: '#E4ECF7',
          boxShadow: 1,
          borderRadius: 2,
          padding: 5,
          minWidth: 300,
        }} >
       <Typography variant="h4" >
      Welcome Provider! </Typography>
      <Typography variant="h4" sx={{ml:9}} >
      Sign Up </Typography>
    {/* <Grid>
    <FontAwesomeIcon icon="fa-brands fa-twitter" />
    <FontAwesomeIcon icon ="fa-brands fa-facebook" />
    <FontAwesomeIcon icon="fa-brands fa-twitter" />
    </Grid> */}
      <Typography
                    variant="h6"
                    sx={{
                      mb: 2,
                      mt: 4,
                      
                    }}
                  >
                  Firstname
                  </Typography>
         <Formtext
         name="firstName"
         container={TextField}
         placeholder="firstName"
         type="text"
         sx={{
          width: "20vw",
          "&::placeholder": {
            color: "green",

            letterSpacing: "0.2rem",
            fontSize: "1rem",
          }
        }}
         />
            <Typography
                    variant="h6"
                    sx={{
                      mb: 2,
                      mt: 4,
                    }}
                  >
                 Email
                  </Typography>
         <Formtext
         name="email"
         container={TextField}
         placeholder="email"
         type="email"
         sx={{
          width: "20vw",
          "&::placeholder": {
            color: "green",

            letterSpacing: "0.2rem",
            fontSize: "1rem",
          }
        }}
         />
            <Typography
                    variant="h6"
                    sx={{
                      mb: 2,
                      mt: 4,
                    }}
                  >
                  Password
                  </Typography>
         <Formtext
         name="password"
         container={TextField}
         placeholder="password"
         type="password"
         sx={{
          width: "20vw",
          "&::placeholder": {
            color: "green",

            letterSpacing: "0.2rem",
            fontSize: "1rem",
          }
        }}
         />
         <Grid item>

         <Buttoncomponent
                    type="submit"
                    size="large"
                    fullWidth={false}
                    variant="contained"
                    sx={{
                      mt: 2,
                      backgroundColor: "secondary.dark",
                      width: "22vw",
                      color: "#fff",
                      "&:hover": {
                        color: "secondary.dark",
                        border: "1px solid blue",
                        // letterSpacing: "0.2rem",
                        // fontSize: "1rem",
                      },
                    }}
                    >Register</Buttoncomponent>
         </Grid>
         <Typography>Already have an account?<Link to="/login">Signin</Link></Typography>
         </Paper>
        
         </Grid>
                </Form>
        
      </Formik>
      </Box>
    
  );
}


