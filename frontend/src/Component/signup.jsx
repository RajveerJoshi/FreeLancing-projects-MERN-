import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CreateGlobalContext } from './globalContext';
import InputField from './microComponent/InputField';
import Button from './microComponent/Button';
import Loader from './microComponent/Loader';
import { signUp } from '../services/authService';
import './common.css';  // Import the common CSS file
import axios from 'axios';

const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    cnfpassword: "",
    role: ""
  });

  const [loader, setLoader] = useState(false);
  const { handleEmail } = useContext(CreateGlobalContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.cnfpassword) {
      setError("Passwords do not match.");
      return;
    }

    const data = {
      name: formData.name,
      email: formData.email,
      password: formData.password,
      cnfpassword: formData.cnfpassword,
      role: formData.role
    };

    handleEmail(formData.email);

    await handleFormDataApi(data);
  };

  const handleFormDataApi = async (data) => {
    try {
      setLoader(true);
      await axios.post("http://localhost:4000/api/signup",data);
      setLoader(false);
      navigate('/otpassword');
    } catch (error) {
      setLoader(false);
      console.log(error);
      setError("Signup failed. Please try again.");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div className="flex-center">
      <div className="page-container">
        <h1 className="page-header ">Register Here!</h1>
        { <p className="error"></p>}
        <form className="page-form" onSubmit={handleSubmit}>
          {loader ? (
            <Loader />
          ) : (
            <>
              <InputField
                type="text"
                label="Name"
                placeholder="Enter Your Name"
                required
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="page-input form-control"
               
              />
              <InputField
                type="email"
                label="Email"
                placeholder="Enter Your Email"
                required
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="page-input "
              />
              <label>Select Role</label>
              <select
                name="role"
                onChange={handleChange}
                value={formData.role}
                className="page-input"
              >
                <option value="" disabled>Select Role</option>
                <option value="client">Client</option>
                <option value="freelancer">Freelancer</option>
              </select>
              <InputField
                type="password"
                label="Password"
                minLength={8}
                placeholder="Enter Password"
                required
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="page-input"
              />
              <InputField
                type="password"
                label="Confirm Password"
                minLength={8}
                placeholder="Enter Confirm Password"
                required
                name="cnfpassword"
                value={formData.cnfpassword}
                onChange={handleChange}
                className="page-input"
              />
              <Button type="submit" className="page-button">Submit</Button>
              <div className="page-footer">
                <span>If you have already registered, <Link to="/login">Click Here!</Link></span>
              </div>
            </>
          )}
        </form>
      </div>
    </div>
  );
};

export default Signup;
