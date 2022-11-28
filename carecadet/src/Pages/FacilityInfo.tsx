import React from "react";
import { Formik, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from 'axios';
// import {toast} from 'react-toastify';
import {
    Grid, Typography, Paper, TextField, Select
} from "@mui/material";

//components
import FormTextField from "../Components/Textfield";
import { Buttoncomponent } from "../Components/Buttoncomp";
import SelectField from '../Components/Select';
import ErrorProps from "../Components/Errorprops";

interface forminitialValues {

    providerID: string;
    facilityNPI?: string | number;
    facilityName: string;
    facilityType: string;
    addressLine1: string;
    addressLine2?: string;
    city: string;
    state: string;
    zipCode: string;
    contact: string;
    email: string;
}


const options = [
    { value: "Type1", item: "Type1" },
    { value: "Type2", item: "Type2" },
    { value: "Type3", item: "Type3" }
];

export default function FacilityPage() {

    const initialValues: forminitialValues = {

        providerID: "",
        facilityNPI: "",
        facilityName: "",
        facilityType: "",
        addressLine1: "",
        addressLine2: "",
        city: "",
        state: "",
        zipCode: "",
        contact: "",
        email: "",
    }

    const validationSchema = Yup.object().shape({
        facilityName: Yup.string().required("Required"),
        facilityType: Yup.string().required("Required"),
        addressLine1: Yup.string().required("Required"),
        // addressLine2: Yup.string().required("Required field"),
        city: Yup.string().nullable().required("Required"),
        zipCode: Yup.string()
            .required("Required")
            .test(
                "len",
                (val: any) => val && val.length === 6
            ),
        state: Yup.string().nullable().required("Required"),
        contact: Yup.string().required("Required"),
        email: Yup.string().email().required("Required")
    });



    const onSubmit = (values: forminitialValues, actions: any) => {
        const facilitydata = {
            providerID: values.providerID,
            facilityNPI: values.facilityNPI,
            facilityName: values.facilityName,
            facilityType: values.facilityType,
            address: {
                addressLine1: values.addressLine1,
                addressLine2: values.addressLine2,
                city: values.city,
                state: values.state,
                zipCode: values.zipCode,
            },
            email: values.email,
            contact: values.contact,

        };
        alert(JSON.stringify(facilitydata, null, 2));
        actions.resetForm({
            values: {
                facilityNPI: "",
                facilityName: "",
                facilityType: " ",
                addressLine1: "",
                addressLine2: "",
                city: "",
                state: "",
                zipCode: "",
                email: "",
                contact: ""
            }

        });
        axios
            .post("http://localhost:5200/facility/createFacility", facilitydata)
            .then((res) => {
                alert('success')
                console.log("i", res.data)
            })
            .catch((e) => console.log(e));
    };

    return (
        <Paper elevation={5} sx={{ backgroundColor: "primary.light", padding: "1.8rem", borderRadius: "15px" }}>
           <Typography
          variant="h6"
          textAlign={"right"}
          justifyItems={"right"}
          sx={{ color: "Black" }}
          margin={"10px"}
          marginBottom={"5px"}
        >
          Hello User,
        </Typography>
        <div
          style={{
            marginBottom:"10px",
            flex: 1,
            height: "3px",
            backgroundColor: "darkgray",
          }}
        />
            <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
                <Form>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Typography
                                mb={"0.5rem"}
                                sx={{
                                    backgroundColor: "#B4C8FC",
                                    padding: "1.2rem",
                                    textAlign: "center",
                                    fontSize: "1.5rem",
                                }}
                            >
                                Facility Information
                            </Typography>
                        </Grid>
                        <Grid item xs={12} sm={12}>
                            <Typography
                                sx={{
                                    fontSize: "1.2rem",
                                    m: "0.5rem 0 0.2rem 0",
                                }}
                            >
                                Facility NPI
                            </Typography>
                            <FormTextField
                                container={TextField}
                                label="Facility NPI"
                                name="facilityNPI"
                                placeholder="Facility NPI"
                                type="text"
                                fullWidth={true}
                                sx={{
                                    ".MuiFormLabel-root ": {
                                        letterSpacing: "0.2rem"
                                    },
                                    ".MuiInputLabel-shrink": {
                                        letterSpacing: 0
                                    }
                                }}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Typography
                                sx={{
                                    fontSize: "1.2rem",
                                    m: "0.5rem 0 0.2rem 0",
                                }}
                            >
                                Facility Name
                            </Typography>
                            <FormTextField
                                container={TextField}
                                label="Facility Name"
                                name="facilityName"
                                placeholder="FacilityName"
                                type="text"
                                fullWidth={true}
                                sx={{
                                    ".MuiFormLabel-root ": {
                                        letterSpacing: "0.2rem"
                                    },
                                    ".MuiInputLabel-shrink": {
                                        letterSpacing: 0
                                    },
                                    //  ".Mui-focused":{
                                    //     letterSpacing: "0.2rem"
                                    //  }

                                }}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Typography
                                // variant="h6"
                                sx={{
                                    fontSize: "1.2rem",
                                    m: "0.5rem 0 0.2rem 0",
                                }}
                            >
                                Facility Type
                            </Typography>
                            <SelectField container={Select} name="facilityType" label="Facility Type" selectData={options} />
                            {/* <ErrorMessage name="facilityType">
                                {(error) => <ErrorProps>{error}</ErrorProps>}
                            </ErrorMessage> */}
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Typography
                                sx={{
                                    fontSize: "1.2rem",
                                    m: "0.5rem 0 0.2rem 0",

                                }}
                            >
                                Street Address1
                            </Typography>
                            <FormTextField
                                container={TextField}
                                label="Street Address1"
                                name="addressLine1"
                                placeholder="Street Address1"
                                type="text"
                                fullWidth={true}
                                sx={{
                                    ".MuiFormLabel-root ": {
                                        letterSpacing: "0.2rem"
                                    },
                                    ".MuiInputLabel-shrink": {
                                        letterSpacing: 0
                                    }
                                }}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Typography
                                sx={{
                                    fontSize: "1.2rem",
                                    m: "0.5rem 0 0.2rem 0",
                                }}
                            >
                                Street Address2
                            </Typography>
                            <FormTextField
                                container={TextField}
                                label="Street Address2"
                                name="addressLine2"
                                placeholder="Street Address2"
                                type="text"
                                fullWidth={true}
                                sx={{
                                    ".MuiFormLabel-root ": {
                                        letterSpacing: "0.2rem"
                                    },
                                    ".MuiInputLabel-shrink": {
                                        letterSpacing: 0
                                    }
                                }}
                            />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <Typography
                                sx={{
                                    fontSize: "1.2rem",
                                    m: "0.5rem 0 0.2rem 0",
                                }}
                            >
                                City
                            </Typography>
                            <FormTextField
                                container={TextField}
                                label="City"
                                name="city"
                                placeholder="City"
                                type="text"
                                fullWidth={true}
                                sx={{
                                    ".MuiFormLabel-root ": {
                                        letterSpacing: "0.2rem"
                                    },
                                    ".MuiInputLabel-shrink": {
                                        letterSpacing: 0
                                    }
                                }}
                            />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <Typography
                                sx={{
                                    fontSize: "1.2rem",
                                    m: "0.5rem 0 0.2rem 0",
                                }}
                            >
                                State
                            </Typography>
                            <FormTextField
                                container={TextField}
                                label="State"
                                name="state"
                                placeholder="State"
                                type="text"
                                fullWidth={true}
                                sx={{
                                    ".MuiFormLabel-root ": {
                                        letterSpacing: "0.2rem"
                                    },
                                    ".MuiInputLabel-shrink": {
                                        letterSpacing: 0
                                    }
                                }}
                            />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <Typography
                                sx={{
                                    fontSize: "1.2rem",
                                    m: "0.5rem 0 0.2rem 0",
                                }}
                            >
                                ZipCode
                            </Typography>
                            <FormTextField
                                container={TextField}
                                label="ZipCode"
                                name="zipCode"
                                placeholder="ZipCode"
                                type="text"
                                fullWidth={true}
                                sx={{
                                    ".MuiFormLabel-root ": {
                                        letterSpacing: "0.2rem"
                                    },
                                    ".MuiInputLabel-shrink": {
                                        letterSpacing: 0
                                    }
                                }}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Typography
                                sx={{
                                    fontSize: "1.2rem",
                                    m: "0.5rem 0 0.2rem 0",
                                }}
                            >
                                Phone
                            </Typography>
                            <FormTextField
                                container={TextField}
                                label="Phone"
                                name="contact"
                                placeholder="Phone"
                                type="text"
                                fullWidth={true}
                                sx={{
                                    ".MuiFormLabel-root ": {
                                        letterSpacing: "0.2rem"
                                    },
                                    ".MuiInputLabel-shrink": {
                                        letterSpacing: 0
                                    }
                                }}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Typography
                                sx={{
                                    fontSize: "1.2rem",
                                    m: "0.5rem 0 0.2rem 0",
                                }}
                            >
                                Email
                            </Typography>
                            <FormTextField
                                container={TextField}
                                label="Email"
                                name="email"
                                placeholder="Email"
                                type="email"
                                fullWidth={true}
                                sx={{
                                    ".MuiFormLabel-root ": {
                                        letterSpacing: "0.2rem"
                                    },
                                    ".MuiInputLabel-shrink": {
                                        letterSpacing: 0
                                    }
                                }}
                            />
                        </Grid>
                        <Grid container item xs={12} justifyContent="right">
                            <Buttoncomponent
                                type="submit"
                                size="large"
                                fullWidth={false}
                                variant="contained"
                                sx={{
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
                                Submit
                            </Buttoncomponent>
                        </Grid>
                    </Grid>
                </Form>
            </Formik>
        </Paper>
    );
};





