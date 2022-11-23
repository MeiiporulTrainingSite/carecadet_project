
import React from "react";
import { Form,Formik } from "formik";
import * as yup from "yup";
import { useState } from "react";
// import axios from "axios";
// import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import styles from "./styles.module.css";
import { Box, Typography,TextField } from "@mui/material";
import Formtext from "../Components/Textfield";
import {Buttoncomponent} from "../Components/Buttoncomp";
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
   
    <Box sx={{ width: "100%" }}>
        <Typography variant="h3">
      Welcome provider
      </Typography>
      <Typography variant="h4">
       Enter your email and password to signin
      </Typography>
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
          // const Registerdata = {
          //   firstName: values.firstName,
          //   password: values.password,
          //   email: values.email,
          // };

        //   axios
        //     .post("http://localhost:5200/provider/createProvider", Registerdata)

        //     .then((res) => {
        //       navigate("/login");
        //       alert("Success");
        //     })

        //     .catch((err) => {
        //       toast.error(err.response.data);
          
        //    });
        //    axios.get("http://localhost:5200/provider/getProviderList", { crossdomain: true }).then(response => {
        //     setText(response.data.data);
        //   console.log(response.data.data)
        // }
        // );
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
        }) => (
            <>
            <Form>
            {/* <label>firstName</label> */}
         <Formtext
        
         name="firstName"
         container={TextField}
         placeholder="firstName"
         type="text"
         />
        
         <Formtext
         name="email"
         container={TextField}
         placeholder="email"
         type="email"
         />
        
         <Formtext
         name="password"
         container={TextField}
         placeholder="password"
         type="password"
         />
         <Buttoncomponent 
        
         size="small"
         type="submit"
         fullWidth={false}
         variant="contained"
         color="primary">
          Submit
         </Buttoncomponent>
        
                </Form>
                </>
        )}
      </Formik>
      </Box>
    
  );
}


