import { useState } from "react"
import Loader from "../../microComponent/Loader";
import axios from "axios";
import Cookies from "js-cookie";

const CreatePost=()=>{


    const [loader,setLoader]=useState(false)
const [formdata,setFormData]=useState({
    projectTitle:"",
    projectDescription:"",
    requiredSkill:""
})
const token=Cookies.get("token")
const handleChange=(e)=>{
const {name,value}=e.target;
setFormData({
    ...formdata,[name]:value
})    
}

const handleSubmit=(e)=>{
    e.preventDefault()
    console.log(formdata)
    handleFormDataApi(formdata)
}



const handleFormDataApi=async(data)=>{
    try{
      setLoader(true)
    const res=await axios.post("http://localhost:4000/api/client/post",data,{headers:{
        "Authorization":`Bearer ${token}`,
        // "Content-Type":"application/json"
        "Content-Type":"multipart/form-data"
    }})
    setLoader(false)
console.log(res.data)  
  }catch(error){
      setLoader(false)
      console.log(error)
      console.log(error.message)
    }
    }

    return(
    <>

{loader? <Loader /> :

    <form onSubmit={handleSubmit}>
    <label>projectTitle</label>
    <input type="text" onChange={handleChange} value={formdata.projectTitle} name="projectTitle"/><br></br>
    <label>projectDescription</label>
    <input type="text" onChange={handleChange} value={formdata.projectDescription} name="projectDescription"/><br></br>
    <label>requiredSkill</label>
    <input type="text" onChange={handleChange} value={formdata.requiredSkill} name="requiredSkill"/><br></br>
   <button type="submit">Submit</button>
    </form>
}
    </>
)
}

export default CreatePost