import { useState } from "react"
import Cookies from 'js-cookie';
import axios from "axios";

const Test =()=>{
    const[num,setNum]=useState()
    const [experienceLetter,setExperienceLetter]=useState([])
    const [profilePicture,setProfilePicture] =useState()
const [formData,setFormData]=useState({
    name:"",
    gender:"",
    skills:[]
})
const token = Cookies.get("token")

const handleOnChange=(e)=>{
const{name,value}=e.target;
setFormData({...formData,[name]:value})
}

const handleSubmit=()=>{
const data=new FormData()
data.append("profilePicture",profilePicture)
experienceLetter.forEach((file)=>data.append("experienceLetter",file))
console.log(Object.fromEntries(data.entries()));
handleFormDataApi(data)
}
const numSubmit =(e)=>{
    setNum(4)
    alert("your random number is 4")
}

const handleProfilePicture=(e)=>{
    setProfilePicture(e.target.files[0])
}

const handleCheckboxChange=(e)=>{
const {checked,value}=e.target
console.log(checked,value)
let updateData=[...formData.skills]
if(checked){
    updateData.push(value)
}
else{
updateData=updateData.filter((ele)=>ele!==value)
}
setFormData({...formData,skills:updateData})
}

const handleExpLetter=(e)=>{
const files=e.target.files
setExperienceLetter(Array.from(files))

}

const handleFormDataApi = async (data) => {
    try {
      const res = await axios.post("http://localhost:4000/api/update-profile", data, {
        headers: {
          'Authorization': `Bearer ${token}`,
          // Let Axios set the correct Content-Type for FormData
        }
      });
      console.log('Response from server:', res.data);
    } catch (error) {
      console.error('Error during API call:', error.message);
    }
  }
    return(
        <>
        <h1>Hellow test</h1>

        <div>
        <input type="text" placeholder="enter random number"  value={num} onChange={(e)=> setNum(e.target.value)}/> <button onClick={numSubmit}>Submit</button>
        <input type="text" value={formData.name} name="name" onChange={handleOnChange} placeholder="enter name" /><br></br>
        <label>Select Gender</label>
<input type="radio"  name ="gender" onChange={handleOnChange} value={"male"} checked={formData.gender==="male"} /> Male
 <input type="radio" name ="gender" onChange={handleOnChange} value={"female"} checked={formData.gender=="female"}/> Female<br></br>
 
 
 <label>Select Skill</label>
 <input type="checkbox" value={"HTML"} onChange={handleCheckboxChange} checked={formData.skills.includes("HTML")} />HTML       
 <input type="checkbox" value={"CSS"} onChange={handleCheckboxChange} checked={formData.skills.includes("CSS")} /> CSS       
 <input type="checkbox" value={"JavaScript"} onChange={handleCheckboxChange} checked={formData.skills.includes("JavaScript")}/> JavaScript      
 <input type="checkbox" value={"React"} onChange={handleCheckboxChange} checked={formData.skills.includes("React")}/> React      
 <input type="checkbox" value={"Node Js"} onChange={handleCheckboxChange} checked={formData.skills.includes("Node Js")}/>      Node Js <br></br>
 <label>Select Job Type</label>

<select onChange={handleOnChange} name="jobType" >
<option value={"part-time"}>part-time</option>
<option value={"full-time"}>full-time</option>
<option value={"day-shift"}>day-shift</option>
<option value={"night-shift"}>night shift</option>
</select><br></br>
<label>  Profile Picture</label>
<input type="file"  onChange={handleProfilePicture}/>
<input type="file" onChange={handleExpLetter} multiple/>
<button onClick={handleSubmit}>Submit</button>
        </div>
        </>)
}

export default Test