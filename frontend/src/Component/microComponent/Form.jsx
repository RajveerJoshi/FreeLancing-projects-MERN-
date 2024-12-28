import axios from 'axios';
import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CreateGlobalContext } from './globalContext';
import InputField from './microComponent/InputField';
import Button from './microComponent/Button';
// import axios from 'axios'

const Form = ({FormHeading}) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    cnfpassword: ""
  })
  
  
const {handleEmail}=useContext(CreateGlobalContext)

  const navigate = useNavigate(); 
  const handleSubmit = async (e) => {
  e.preventDefault()
const data={
  name:formData.name,
  email:formData.email,
  password:formData.password,
  cnfpassword:formData.cnfpassword
}

handleEmail(formData.email)

 await handleFormDataApi(data)
  }

const handleFormDataApi=async(data)=>{
try{
const res=await axios.post("http://localhost:4000/api/signup",data)
  console.log(res)
  navigate('/otpassword')

}catch(error){
  console.log(error.message)
}

}




const handleChange=(e)=>{

  const {name,value}=e.target
  setFormData({...formData,[name]:value})
}

  return (
    <div className="row">  
      <div className='col-md-5'>
        <div className='img_cl'>
          <img src='src/assets/img/sign-page-abstract.avif' />
        </div>      
      </div>  
      
    <div className='col-md-4'>
      <div className='sig_sect'>
      
    <div className='container'>
    <div className='row'>
      <form onSubmit={handleSubmit}>
      <h1 className="text-center">{FormHeading}</h1>
        
      <InputField  type={'text'} label={" Name"} placeholder={'Enter Your Name'} required name={'name'} value={formData.name} onChange={handleChange} />
      <InputField type={'email'}  label={" Email"} placeholder={'Enter Your Email'} required name={'email'} value={formData.email} onChange={handleChange} />
      <InputField  type={'password'}label={" Password"} minLength={8} placeholder={'Enter Password'} required name={'password'} value={formData.password} onChange={handleChange} />
      <InputField  type='password' label={"Confirm Password"} minLength={8} placeholder='Enter confirm Password' required name='cnfpassword' value={formData.cnfpassword} onChange={handleChange} />
<Button type={"submit"} className={"sub_btn btn"}/>

        <span className='reg_link'>If you Have All Ready Register <Link to="/login">Click Here !</Link>  </span>

      </form>
        </div>
        </div>
        </div>
      </div>
    <div className='col-md-3'>
        <div className="rig_hd">            
          <p>WelCome To Supply chain platform Register as a member to Experience</p>
          <h2>WelCome To User <span className='yellow'>Registration</span> Info </h2>
        </div>
    </div>
      </div>
  )
}

export default Form
