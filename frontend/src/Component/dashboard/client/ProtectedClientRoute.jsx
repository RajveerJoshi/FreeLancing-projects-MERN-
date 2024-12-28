import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import Cookies from "js-cookie";
const ProtectedClientRoute=()=> {

    // const token=false
    const token=Cookies.get("token")

   return token?<Outlet/>:<Navigate to={"/login"} />

 

//   return (
//     <>
//     ProtectedClientRoute
    
//     </>
//   )
}

export default ProtectedClientRoute