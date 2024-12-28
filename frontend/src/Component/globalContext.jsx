import { createContext, useState } from "react";

const CreateGlobalContext=createContext()

const HandleGlobalContext=({children})=>{
const [email,setEmail]=useState("")
const [forgotKey,setForgotKey]=useState(false)
const handleEmail=(email)=>{
    setEmail(email)
}

const handleForgotKey=(key)=>{
    setForgotKey(key)
}
    return(
        <CreateGlobalContext.Provider value={{
            email,handleEmail,handleForgotKey,forgotKey
        }} >
   

{children}

        </CreateGlobalContext.Provider>
    )
  
    

}
 export {HandleGlobalContext,CreateGlobalContext}