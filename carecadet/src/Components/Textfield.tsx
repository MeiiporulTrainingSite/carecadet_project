import React from 'react'
import {Field, ErrorMessage} from 'formik'
import {TextField} from "@mui/material"
import ErrorProps from "./Errorprops"
interface props{
    name:string;
    // value?:string;
    placeholder:string;
    type:string;
    container:any;
    //component?: React.ComponentType<{}> 
    // error:any;
    // helperText:React.ComponentType<{}> 
}

const textfield = (props:props) => {
  return (
    <>
    <Field
          as={props.container}
        //   value={props.value}
          name={props.name}
          placeholder={props.placeholder}
          type={props.type}
        //  helperText={props.helperText}
      helperText={
        <ErrorMessage name={props.name}>
          {(error) => (
            <ErrorProps >
                {error}
            </ErrorProps>
          )}
        </ErrorMessage>

      }
          
        />
      {/* <ErrorMessage name={props.name}>
          {(error) => (
            <ErrorProps >
                {error}
            </ErrorProps>
          )}
        </ErrorMessage>  */}

        </>
  )
}

export default textfield