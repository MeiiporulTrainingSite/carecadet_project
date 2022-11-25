import React from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { TextField, Box, Typography, Grid,Paper } from "@mui/material";
import axios from "axios";

import FormTextField from "../Components/Textfield";
import { Buttoncomponent } from "../Components/Buttoncomp";

interface initialValues {
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

const OrganizationInfo = () => {
  const initialValues: initialValues = {
    organizationInformation: {
      providerID: "",
      organizationName: "",
      streetAdd1: "",
      streetAdd2: "",
      city: "",
      state: "",
      zipCode: "",
      phone: "",
      Email: "",
    },
    contactPersonInformation: {
      firstName: "",
      lastName: "",
      role: "",
      contactno: "",
      email: "",
    },
  };
  const onSubmit = (values: initialValues) => {
    const orgdata = {
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
    axios
      .post("http://localhost:4200/organization/createOrganization", orgdata)
      .then((res) => {
        alert("success");
      });
  };

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
    <Paper elevation = {5}  sx={{ backgroundColor: "primary.light", padding: "1.5rem" ,borderRadius: "15px"}}>
      <Formik initialValues={initialValues} onSubmit={onSubmit}>
        <Form>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography
                mb={"0.5rem"}
                sx={{
                  backgroundColor: "secondary.light",
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
                  backgroundColor: "secondary.light",
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
                    border:"1px solid blue"
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

export default OrganizationInfo;
