import React from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { TextField, Box, Typography, Grid, Paper,Button } from "@mui/material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

import FormTextField from "../../Components/Textfield";
import { Buttoncomponent } from "../../Components/Buttoncomp";

import { useAppDispatch, useAppSelector } from "../../Redux/Hook";
import { axiosPrivate } from "../../axios/axios";
import { useNavigate } from "react-router-dom";
import { editButton, tabValueNav } from "../../Redux/LoginSlice";

interface InitialValues {
  organizationInformation: {
    providerID: string;
    organizationName: string;
    streetAdd1: string;
    streetAdd2: string;
    city: string;
    state: string;
    zipCode: string;
    phone: string;
    Email: string;
  };
  contactPersonInformation: {
    firstName: string;
    lastName: string;
    role: string;
    contactno: string;
    email: string;
  };
}

const EditOrganization = () => {
  const dispatch = useAppDispatch();
  const select = useAppSelector((state) => state.edit.orgEditData);
  const data = useAppSelector((state: { auth: { login: any; } }) => state.auth.login)
  const navigate = useNavigate();
  console.log(select, "s");

  const initialValues: InitialValues = {
    organizationInformation: {
      providerID: select.providerID,
      organizationName: select.organizationName,
      streetAdd1: select.address.addressLine1,
      streetAdd2: select.address.addressLine2,
      city: select.address.city,
      state: select.address.state,
      zipCode: select.address.zipCode,
      phone: select.contact,
      Email: select.email,
    },
    contactPersonInformation: {
      firstName: select.contactPerson.firstName,
      lastName: select.contactPerson.lastName,
      role: select.contactPerson.role,
      contactno: select.contactPerson.contact,
      email: select.contactPerson.email,
    },
  };
  const onSubmit = (values: InitialValues, actions: any) => {
    const orgdata = {
      organizationID: select.organizationID,
      providerID: values.organizationInformation.providerID,
      organizationName: values.organizationInformation.organizationName,

      address: {
        addressLine1: values.organizationInformation.streetAdd1,
        addressLine2: values.organizationInformation.streetAdd2,
        city: values.organizationInformation.city,
        state: values.organizationInformation.state,
        zipCode: values.organizationInformation.zipCode,
      },
      email: values.organizationInformation.Email,
      contact: values.organizationInformation.phone,
      contactPerson: {
        firstName: values.contactPersonInformation.firstName,
        lastName: values.contactPersonInformation.lastName,
        role: values.contactPersonInformation.role,
        contact: values.contactPersonInformation.contactno,
        email: values.contactPersonInformation.email,
      },
    };
    alert(JSON.stringify(orgdata, null, 2));
    axiosPrivate
      .put("/organization/updateOrganization", orgdata)
      .then((res) => {
        alert("success");
        // dispatch(organizationEdit(orgdata))
        // navigate("/org")
        // actions.resetForm({
        //   values: initialValues,
        // });
      });
  };

  const validationSchema = Yup.object().shape({
    organizationInformation: Yup.object().shape({
      organizationName: Yup.string().required("Organization Name is required"),
      streetAdd1: Yup.string().required("Address is required"),
      city: Yup.string().required("city is required"),
      state: Yup.string().required("state is required"),
      zipCode: Yup.string().required("zip code is required"),
      Email: Yup.string().required("Email is required").email("invalid email"),
    }),
    contactPersonInformation: Yup.object().shape({
      firstName: Yup.string().required("First Name is a required field"),
      lastName: Yup.string().required("Last Name is required"),
      role: Yup.string().required("Role is a required field"),
      contactno: Yup.string().required("Contact is a required field"),
      email: Yup.string()
        .required("Email is a required field")
        .email("invalid email"),
    }),
  });

  const organizationData = [
    {
      xs: 12,
      label: "Organization Name",
      name: "organizationInformation.organizationName",
      placeholder: "Organization Name",
      type: "text",
    },
    {
      xs: 6,
      label: "Street Address1",
      name: "organizationInformation.streetAdd1",
      placeholder: "Street Address1",
      type: "text",
    },
    {
      xs: 6,
      label: "Street Address2",
      name: "organizationInformation.streetAdd2",
      placeholder: "Street Address2",
      type: "text",
    },
    {
      xs: 4,
      label: "City",
      name: "organizationInformation.city",
      placeholder: "City",
      type: "text",
    },
    {
      xs: 4,
      label: "State",
      name: "organizationInformation.state",
      placeholder: "State",
      type: "text",
    },
    {
      xs: 4,
      label: "Zip Code",
      name: "organizationInformation.zipCode",
      placeholder: "Zip Code",
      type: "text",
    },
    {
      xs: 6,
      label: "Phone",
      name: "organizationInformation.phone",
      placeholder: "Phone Number",
      type: "text",
    },
    {
      xs: 6,
      label: "Email",
      name: "organizationInformation.Email",
      placeholder: "Email",
      type: "email",
    },
  ];
  const contactPersonData = [
    {
      xs: 6,
      label: "First Name",
      name: "contactPersonInformation.firstName",
      placeholder: "First Name",
      type: "text",
    },
    {
      xs: 6,
      label: "Last Name",
      name: "contactPersonInformation.lastName",
      placeholder: "Last Name",
      type: "text",
    },

    {
      xs: 6,
      label: "Role",
      name: "contactPersonInformation.role",
      placeholder: "Role",
      type: "text",
    },
    {
      xs: 6,
      label: "Contact",
      name: "contactPersonInformation.contactno",
      placeholder: "Contact Number",
      type: "text",
    },
    {
      xs: 12,
      label: "Email",
      name: "contactPersonInformation.email",
      placeholder: "Email",
      type: "email",
    },
  ];
  return (
    <Paper
      elevation={9}
      sx={{
        backgroundColor: "primary.light",
        padding: "1.5rem",
        borderRadius: "15px",
      }}
    >
      {/* <p>{JSON.stringify(select)}</p> */}
      <Typography
        variant="h6"
        textAlign={"right"}
        justifyItems={"right"}
        sx={{ color: "Black" }}
        margin={"10px"}
        marginBottom={"5px"}
      >
        Hello {data.userID},
      </Typography>
      <div
        style={{
          marginBottom: "10px",
          flex: 1,
          height: "3px",
          backgroundColor: "darkgray",
        }}
      />
      <Grid container item xs={12} justifyContent="left">
        <Button
          variant="outlined"
          type="button"
          onClick={() => {
            dispatch(tabValueNav(0))
            dispatch(editButton())
            navigate("/providerlanding");
          }}
          sx={{
            backgroundColor: "secondary.dark",
            width: "8vw",

            marginBottom: "0.5rem",
            color: "#fff",
            "&:hover": {
              color: "secondary.dark",
              border: "1px solid blue",
            },
          }}
          startIcon={<ArrowBackIcon fontSize="large" />}
        >
          BACK
        </Button>
      </Grid>
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        <Form>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography
                mb={"0.5rem"}
                sx={{
                  backgroundColor: "#B4C8FC",
                  padding: "0.7rem",
                  textAlign: "center",
                  fontSize: "1.5rem",
                }}
              >
                Organization Information
              </Typography>
            </Grid>
            {organizationData.map((org, i) => (
              <Grid item xs={org.xs} key={i}>
                <Typography
                  // variant="h6"
                  sx={{
                    fontSize: "1.2rem",
                    mb: "0.5rem",
                  }}
                >
                  {org.label}
                </Typography>
                <FormTextField
                  container={TextField}
                  name={org.name}
                  placeholder={org.placeholder}
                  type={org.type}
                  fullWidth={true}
                  sx={{
                    "&::placeholder": {
                      // color: "green",
                      letterSpacing: "0.2rem",
                      // fontSize: "1rem",
                    },
                  }}
                />
              </Grid>
            ))}

            <Grid item xs={12}>
              <Typography
                mb={"0.5rem"}
                sx={{
                  backgroundColor: "#B4C8FC",
                  padding: "0.7rem",
                  textAlign: "center",
                  fontSize: "1.5rem",
                }}
              >
                Contact Person Information
              </Typography>
            </Grid>
            {contactPersonData.map((person, i) => (
              <Grid item xs={person.xs} key={i}>
                <Typography
                  // variant="h6"
                  sx={{
                    fontSize: "1.2rem",
                    mb: "0.5rem",
                  }}
                >
                  {person.label}
                </Typography>
                <FormTextField
                  container={TextField}
                  sx={{
                    // boxShadow: "0 0 45px 1px red" ,
                    "&::placeholder": {
                      // color: "green",
                      letterSpacing: "0.2rem",
                      // fontSize: "1rem",
                    },
                  }}
                  name={person.name}
                  placeholder={person.placeholder}
                  type={person.type}
                  fullWidth={true}
                />
              </Grid>
            ))}

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
                    border: "1px solid blue",
                    // letterSpacing: "0.2rem",
                    // fontSize: "1rem",
                  },
                }}
              >
                Update
              </Buttoncomponent>
            </Grid>
          </Grid>
        </Form>
      </Formik>
    </Paper>
  );
};

export default EditOrganization;
