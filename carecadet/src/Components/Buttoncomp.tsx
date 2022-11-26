import * as React from 'react';
import {Button} from '@mui/material';
interface IAppProps {
href?:string;
size?: "small" | "large" | "medium";
type:"button" | "submit" | "reset" 
fullWidth?: boolean;
variant?: "text" | "outlined" | "contained" ;
color?: "inherit" | "primary" | "secondary" | "success" | "error" | "info" | "warning" ;
onClick?:React.MouseEventHandler<HTMLButtonElement> | undefined   
sx?:any
children:React.ReactNode;
}

export function Buttoncomponent (props: IAppProps) {
  return (
    <Button
         href={props.href}
          size={props.size}
          type={props.type}
          fullWidth={props.fullWidth}
          variant={props.variant} 
          color={props.color}
          onClick={props.onClick}
          sx={props.sx}
          >
            {props.children}
        </Button>
  );
}