import React from "react";

import { Formik, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from 'axios';


import { Grid, Typography, Paper, TextField, Select, IconButton, Button, Box, Card, CardContent, CardMedia } from "@mui/material";
import healthcare from "../Images/healthcare.jpg";
import { useNavigate } from "react-router-dom";

import { useAppDispatch } from "../Redux/Hook";
import { pageUser } from "../Redux/LoginSlice";

import { axiosPrivate } from "../axios/axios";
import { Buttoncomponent } from "../Components/Buttoncomp";
import SelectField from '../Components/Select';
import FormTextField from "../Components/Textfield";
import { toast } from "react-toastify";

import dashboardicon from "../Images/dashboardicon.png";

// import LocationOnIcon from '@material-ui/icons/LocationOn';
import InputAdornment from '@mui/material/InputAdornment';

interface forminitialValues {

    facilityName: string;

}
const options = [
    { value: "Type1", item: "Type1" },
    { value: "Type2", item: "Type2" },
    { value: "Type3", item: "Type3" }
];
const Searchtwo = () => {
    const initialValues: forminitialValues = {
        facilityName: ""
    }
    const validationSchema = Yup.object().shape({

        facilityName: Yup.string().required("Required"),

    });
    const onSubmit = (values: forminitialValues, actions: any) => {
        const facilitydata = {

            facilityName: values.facilityName,


        };
        alert(JSON.stringify(facilitydata, null, 2));
        actions.resetForm({
            values: {

                facilityName: "",

            }

        });
        axiosPrivate
            .post("http://localhost:5200/facility/createFacility", facilitydata)
            .then((res) => {
                // alert('success')
                toast.success("Successfully Added ")
                console.log("i", res.data)


            })
            .catch((e) => console.log(e));
    };
    return (
        <Paper elevation={5} sx={{
            backgroundColor: "primary.light",
            padding: "1.8rem",

        }}>
            <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
                <Form>
                    <Box sx={{ width: "100%", height: "100vh", backgroundColor: "primary.light" }}>
                        
                            <Grid
                                container sx={{padding:"10px"}}>

               
                               
                                <Grid
                                    container
                                    spacing={1}
                                    direction="row"
                                    justifyContent="center"
                                    alignItems="center"
                                                                    >
                                  
                                    <Grid item xs={3}>
                                        <SelectField container={Select} name="hospital" label="Hospital" selectData={options} />
                                    </Grid>
                                    <Grid item xs={3}>
                                        <FormTextField
                                            container={TextField}
                                            label="Service"
                                            name="Service"
                                            placeholder="Service"
                                            type="text"
                                            fullWidth={false}
                                            sx={{
                                                ".MuiFormLabel-root ": {
                                                    letterSpacing: "0.2rem",
                                                    fontSize: "0.8rem",

                                                },
                                                ".MuiInputLabel-shrink": {
                                                    letterSpacing: 0
                                                }
                                            }}
                                        // inputProps={{
                                        //     startAdornment: (
                                        //       <InputAdornment position="start">
                                        //         <LocationOnIcon />
                                        //       </InputAdornment>
                                        //     ),
                                        //   }}
                                        />
                                    </Grid>

                                    <Grid item xs={3}>
                                        <FormTextField
                                            container={TextField}
                                            label="location"
                                            name="location"
                                            placeholder="location"
                                            type="text"
                                            fullWidth={false}
                                            sx={{
                                                ".MuiFormLabel-root ": {
                                                    letterSpacing: "0.2rem",
                                                    fontSize: "0.8rem",

                                                },
                                                ".MuiInputLabel-shrink": {
                                                    letterSpacing: 0
                                                }
                                            }}
                                        />
                                    </Grid>
                                    <Grid 
                                               item xs={3}>
                                    
                                        <Buttoncomponent
                                            type="submit"
                                            size="large"
                                            fullWidth={false}
                                            variant="contained"
                                            sx={{
                                                // margin: "10px",
                                                backgroundColor: "secondary.dark",
                                                width: "10vw",
                                                color: "#fff",

                                                "&:hover": {
                                                    color: "secondary.dark",
                                                    border: "1px solid blue"
                                                    // letterSpacing: "0.2rem",
                                                    // fontSize: "1rem",

                                                },
                                            }}
                                        >
                                           Search
                                        </Buttoncomponent>
                                    </Grid>
                                </Grid>
                               
                            </Grid>
                            </Box>
                </Form>
            </Formik>
        </Paper>
    );
};

export default Searchtwo;
