import React from 'react'
import { Navigate } from 'react-router-dom'
 
const VisitorRoute = ({children}) => {
  return localStorage.getItem("validVisitor") ? children : <Navigate to="/" />
}

export default VisitorRoute