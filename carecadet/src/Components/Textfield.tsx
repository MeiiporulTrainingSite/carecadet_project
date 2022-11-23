import React from "react";
import { Field, ErrorMessage } from "formik";
import ErrorProps from "./Errorprops";
interface props {
  name: string;
  placeholder: string;
  type: string;
  fullWidth?: boolean;
  container:any;
  sx?:any
  label?:string
}
const FormTextField = (props: props) => {
  return (
    <>
      <Field
      label={props.label}
        as={props.container}
        inputProps={{
          sx: props.sx,
        }}
        fullWidth={props.fullWidth}
        name={props.name}
        placeholder={props.placeholder}
        type={props.type}
        helperText={
          <ErrorMessage name={props.name}>
            {(error) => <ErrorProps>{error}</ErrorProps>}
          </ErrorMessage>
        }
      />
    </>
  );
};

export default FormTextField;
