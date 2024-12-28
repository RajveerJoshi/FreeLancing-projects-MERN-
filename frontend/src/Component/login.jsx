import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import InputField from "./microComponent/InputField";
import Button from "./microComponent/Button";
import Cookies from "js-cookie";
import './common.css';  // Import the common CSS file

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const loginsubmit = async (e) => {
    e.preventDefault(); // Prevent the default form submission
    const data = {
      email: username,
      password: password,
    };

    handleFormDataApi(data);
  };

  const handleFormDataApi = async (data) => {
    try {
      const res = await axios.post("http://localhost:4000/api/login", data);
      Cookies.set("token", res.data.token,{ expires: 1 });

      console.log(res.data.data.role)
if(res.data.data.role==="client"){
        navigate("/client");
}else if(res.data.data.role==="freelancer"){
  navigate("/freelancer");
}
else{
  navigate("/admin")
}

    } catch (error) {
      console.log(error.message);
      setError("Login failed. Please check your credentials and try again.");
    }
  };

  return (
    <div className="flex-center">
      <div className="page-container">
        <h1 className="page-header">Login Here!</h1>
        {error && <p className="error">{error}</p>}
        <form className="page-form" onSubmit={loginsubmit}>
          <InputField
            label={"Email"}
            type={"email"}
            required
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder={"Enter Your Email"}
            className="page-input"
          />
          <InputField
            label={"Password"}
            type={"password"}
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder={"Enter Password"}
            className="page-input"
          />
          <div className="form-group">
            <Button type={"submit"} className="page-button" />
          </div>
          <div className="page-footer">
            <Link to="/forgotPassword">Forgot Password?</Link>
          </div>
          <div className="page-footer">
            Don't have an account? <Link to="/signup">Sign Up</Link>
          </div>
        </form>
       
      </div>
    </div>
  );
};

export default Login;
