import React from 'react'
import {Field, ErrorMessage} from 'formik'
import {TextField, FormControl, InputLabel, MenuItem, Select} from "@mui/material"
import ErrorProps from "./Errorprops"
interface props{
    selectData:selectprops[];
    name:string;

}

interface selectprops{
    value:string | number;
    item:string | number;
}

const SelectField= (props:props) => {
  return (
<FormControl sx={{ width: "100%" }}>
        <InputLabel>Select</InputLabel>
        <Field as={Select} name={props.name} label="Select"  
         >
          {props.selectData.map((select, index) => (
            <MenuItem key={index + 1} value={select.value}>
              {select.item}
            </MenuItem>
          ))}
        </Field>
        <ErrorMessage name={props.name}>
          {(error) => (
            <ErrorProps >
                {error}
            </ErrorProps>
          )}
        </ErrorMessage>

     
      </FormControl>
  )}
export default SelectField