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
import dentallogo from "../Images/dentallogo.jpg";
import lab from "../Images/lab.png";
import emergency from "../Images/emergency.jpg"
import care from "../Images/care.jpg";

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
const Searchone = () => {
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
                    <Box sx={{ width: "100%", height: "110vh", backgroundColor: "primary.light" }}>
                        
                            <Grid
                                container sx={{padding:"10px"}}>

                                <Grid
                                    container
                                    direction="row"
                                    justifyContent="center"
                                    alignItems="center"
                                    item>

                                    <Typography variant="h3" sx={{ display: "flex", color: "#728AB7", fontWeight: "bold", padding: "20px" }} >I am <Box sx={{ color: "#4D77FF" }}>Provider/Employer</Box></Typography>

                                </Grid>
                               
                                <Grid
                                    container
                                    spacing={1}
                                    direction="row"
                                    justifyContent="center"
                                    alignItems="center"
                                                                    >
                                  
                                    <Grid item xs={3}>
                                        <SelectField container={Select} name="Payer" label="Payer" selectData={options} />
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
                                        />
                                    </Grid>
                                    <Grid container
                                        justifyContent="center"
                                        alignItems="center"
                                        item
                                    >
                                        <Buttoncomponent
                                            type="submit"
                                            size="large"
                                            fullWidth={false}
                                            variant="contained"
                                            sx={{
                                                // margin: "10px",
                                                backgroundColor: "secondary.dark",
                                                width: "20vw",
                                                color: "#fff",

                                                "&:hover": {
                                                    color: "secondary.dark",
                                                    border: "1px solid blue"
                                                    // letterSpacing: "0.2rem",
                                                    // fontSize: "1rem",

                                                },
                                            }}
                                        >
                                            Find negotiated rates
                                        </Buttoncomponent>
                                    </Grid>
                                </Grid>
                               
                            </Grid>
                            

                        
                            <Card raised sx={{backgroundColor: "primary.light",padding:"20px"}}>

                                <Grid
                                    container
                                    direction="column"
                                    justifyContent="center"
                                    alignItems="center"
                                    item>
                                    <Typography variant="h6" sx={{ color: "#4D77FF",fontWeight:"bold" }}>Providers</Typography>
                                    <Typography variant="h3" sx={{ color: "#728AB7" }}>Help Patients find you</Typography>
                                    <Typography sx={{padding:"5px",fontSize: "1rem"}} >Use our free service to manage your price listing</Typography>
                                    </Grid>
                            
                            <Grid
                                container
                                direction="row"
                               item
                               spacing={1}
                               
                            >
                                <Grid item xs={4}>
                              <Card raised sx={{display:"flex",flexDirection:"row"}}>
                                <CardMedia sx={{ width: "120px", height: "100px" }}
                                    component="img"
                                    image={dashboardicon}
                                    title="payer dashboard"

                                />
                                <CardContent>

                                    <Typography variant="body2" color="textSecondary">
                                        Dashboards for Payer negotiated rates
                                    </Typography>
                                </CardContent>
                                
                                </Card>
                                </Grid>
                                <Grid item xs={4}>
                                <Card raised sx={{display:"flex",flexDirection:"row"}}>
                                <CardMedia sx={{ width: "120px", height: "100px" }}
                                    component="img"
                                    image={dashboardicon}
                                    title="payer dashboard"

                                />
                                <CardContent>

                                    <Typography variant="body2" color="textSecondary">
                                        Dashboards for hospital cash price
                                    </Typography>
                                </CardContent>
                                </Card>
                                </Grid>
                                <Grid item xs={4}>
                                <Card raised sx={{display:"flex",flexDirection:"row"}}>
                                <CardMedia sx={{ width: "120px", height: "100px" }}
                                    component="img"
                                    image={dashboardicon}
                                    title="payer dashboard"

                                />
                                <CardContent>

                                    <Typography variant="body2" color="textSecondary">
                                        Customized rate report
                                    </Typography>
                                </CardContent>
                                </Card></Grid>
                            </Grid>
                        </Card>






                       
                            <Grid container sx={{padding:"10px"}}>

                                <Grid
                                    container
                                    direction="row"
                                    justifyContent="center"
                                    alignItems="center"
                                    item>


                                    <Typography variant="h3" sx={{ color: "#728AB7",padding:"10px" }}>Products</Typography></Grid>
                            
                            <Grid
                                container
                                direction="row"
                                justifyContent="center"
                                alignItems="center"
                                spacing={1}
                                item
                            >
                                <Grid item xs={3}>
                                 <Card raised sx={{display:"flex",flexDirection:"row"}} >
                                 <CardMedia sx={{ width: "120px", height: "120px" }}
                                    component="img"
                                    image={emergency}
                                    title="emergency"

                                />
                                <CardContent>

                                    <Typography variant="body2" color="textSecondary">
                                        Urgent care
                                    </Typography>
                                </CardContent>
                                </Card>
                                </Grid>
                                <Grid item xs={3}>
                                <Card raised sx={{display:"flex",flexDirection:"row"}}>
                                <CardMedia sx={{ width: "120px", height: "120px" }}
                                    component="img"
                                    image={dentallogo}
                                    title="dentalcarelogo"

                                />
                                <CardContent>

                                    <Typography variant="body2" color="textSecondary">
                                        Dental care
                                    </Typography>
                                </CardContent>
                                </Card></Grid>
                                <Grid item xs={3}>
                                <Card raised sx={{display:"flex",flexDirection:"row"}}>
                                <CardMedia sx={{ width: "120px", height: "120px" }}
                                    component="img"
                                    image={lab}
                                    title="lab"

                                />
                                <CardContent>

                                    <Typography variant="body2" color="textSecondary">
                                       Labs
                                    </Typography>
                                </CardContent>
                                </Card></Grid>
                                <Grid item xs={3}>
                                <Card raised sx={{display:"flex",flexDirection:"row"}}>
                                <CardMedia sx={{ width: "120px", height: "120px" }}
                                    component="img"
                                    image={care}
                                    title="care"

                                />
                                <CardContent>

                                    <Typography variant="body2" color="textSecondary">
                                        others
                                    </Typography>
                                </CardContent>
                                </Card></Grid>
                            </Grid>
                            </Grid>
                    </Box>
                </Form>
            </Formik>
        </Paper>
    );
};

export default Searchone;
