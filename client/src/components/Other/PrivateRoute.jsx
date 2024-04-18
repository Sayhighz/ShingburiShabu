import React from 'react'
import { Navigate } from 'react-router-dom'
 
const PrivateRoute = ({children}) => {
  return localStorage.getItem("validAdmin") ? children : <Navigate to="/" />
}

export default PrivateRoute