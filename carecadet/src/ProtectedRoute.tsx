import React,{FC} from 'react'
import {Route,RouteProps,Navigate} from "react-router"


interface Props   {
    
    children:JSX.Element
  
}
const ProtectedRoute = ({children}: Props) => {
  const isAuth=false
   return isAuth?children:<Navigate to="/login" replace/>
 
}

export default ProtectedRoute