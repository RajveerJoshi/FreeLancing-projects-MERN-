
import Login from "./Component/login"
import OTPassword from "./Component/OTPassword"
import ResetPassword from "./Component/ForgotPassword"
import Signup from "./Component/signup"
import Dashboard from "./Component/dashboard"
import { Route, Routes } from "react-router-dom"
import { HandleGlobalContext } from "./Component/globalContext"
import CreateNewPassword from "./Component/CreateNewPassword"
import UpdateProfile from "./Component/UpdateProfile"
import Test from "./Component/Test"
import CreatePost from "./Component/dashboard/client/clientPost"
import FreelancerDashboard from "./Component/dashboard/freelancer/Dashboard"

import ForgotPassword from "./Component/ForgotPassword"
import ClientDashboard from "./Component/dashboard/client/ClientDashboard"
import ViewPostDetails from "./Component/dashboard/client/ViewPostDetails"
import ProtectedClientRoute from "./Component/dashboard/client/ProtectedClientRoute"


function App() {
  
    return<div className="main_bg">
      <HandleGlobalContext >   
         <div className="container-fluid p-0 m-0">         
        <Routes>
          <Route path="/" element={<Login />}></Route>
          <Route path="/signup" element={<Signup />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/otpassword" element={<OTPassword />}></Route>
          <Route path="/forgotPassword" element={<ForgotPassword />}></Route>
          <Route path="/createNewPassword" element={<CreateNewPassword />}></Route>
          <Route path="/dashboard" element={<Dashboard />}></Route>
          <Route path="/updateProfile" element={<UpdateProfile />}></Route>
      
          <Route path="/clientPost" element={<CreatePost />}></Route>
          <Route path="/freelancer-dashboard" element={<FreelancerDashboard />}></Route>
          <Route path="/client" element={<ProtectedClientRoute />}>

          <Route index element={<ClientDashboard />}></Route>
          <Route path="test" element={<Test />}></Route>
          </Route>
      
       <Route path="/viewpostdetails" element={<ViewPostDetails/>} />
        </Routes>
               
    </div>
    </HandleGlobalContext>

    </div>


}
export default App  