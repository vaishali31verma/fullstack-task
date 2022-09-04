import React from 'react'
import { Navigate } from 'react-router-dom'

const PrivateRoute = ({children}) => {
    const id = JSON.parse(localStorage.getItem("loggedInId"))
    const time = JSON.parse(localStorage.getItem("time"))
   if(!!id && !!time){
    return <Navigate to="/home"></Navigate>
   }
  
   return children
}






export default PrivateRoute