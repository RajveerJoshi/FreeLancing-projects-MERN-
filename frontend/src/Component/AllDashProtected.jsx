import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

const AllDashProtected=()=> {

    const token=false

   return token?<Outlet/>:<Navigate to={"/login"} />

 

//   return (
//     <>
//     ProtectedClientRoute
    
//     </>
//   )
}

export default AllDashProtected