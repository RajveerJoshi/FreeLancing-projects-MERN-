// import React, { useState, useContext } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import { CreateGlobalContext } from './globalContext';
// import './ResetPasswordProfessional.css'; // Import the new CSS

// const ForgotPassword = () => {
//     const [email, setEmail] = useState('');
//     const { handleEmail, handleForgotKey } = useContext(CreateGlobalContext);
//     const navigate = useNavigate();

//     const handleSubmit = async (event) => {
//         event.preventDefault();
//         const data = { email: email };
//         handleForgotKey(true);
//         await handleFormDataApi(data);
//         handleEmail(email);
//     };

//     const handleFormDataApi = async (data) => {
//         try {
//             const res = await axios.post("http://localhost:4000/api/forgot-password", data);
//             if (res.data.statusCode === 200) {
//                 navigate("/otpassword");
//             } else {
//                 alert(res.data.error);
//             }
//         } catch (error) {
//             console.log(error.message);
//         }
//     };

//     return (
//         <div className="reset-container">  
//             <form onSubmit={handleSubmit} className="reset-form">
//                 <h1 className="reset-header">Forgot Password!</h1> 
//                 <div className="form-group">      
//                     <label>Email</label>
//                     <input 
//                         type='email' 
//                         required 
//                         value={email} 
//                         onChange={(e) => setEmail(e.target.value)} 
//                         placeholder='Enter Email' 
//                         className="reset-input"
//                     />
//                 </div>
//                 <div className="form-group">   
//                     <button className='reset-btn' type='submit'>SUBMIT</button>
//                 </div>
//                 <div className='reset-footer'>
//                     We Have Not Received OTP? <Link to="/otpassword">Login</Link>
//                 </div>
//             </form>
//         </div>
//     );
// };

// export default ForgotPassword;



import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CreateGlobalContext } from './globalContext';
import axios from 'axios';
import './common.css'; // Import the common CSS
import Loader from './microComponent/Loader';

const ResetPassword = () => {
  const [email, setEmail] = useState('');
  const [loader, setLoader] = useState(false);
  const { handleEmail, handleForgotKey } = useContext(CreateGlobalContext);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = { email: email };
    handleForgotKey(true);
    await handleFormDataApi(data);
    handleEmail(email);
  };

  const handleFormDataApi = async (data) => {

    try {
      setLoader(true)
      const res = await axios.post('http://localhost:4000/api/forgot-password', data);
        navigate('/otpassword');
        // setLoader(false)
    } catch (error) {
      console.log(error.message);
    }finally{
      setLoader(false)
    }

  };

  return (
    <div className="flex-center">
      <div className="page-container">  
        <form onSubmit={handleSubmit} className="page-form">
          <h1 className="page-header">Forgot Password!</h1>

          {loader?<Loader/>:
<div>

          <div className="form-group">
            <label>Email</label>
            <input
              type='email'
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder='Enter Email'
              className="page-input"
            />
          </div>
          <div className="form-group">
            <button className='page-button' type='submit'>SUBMIT</button>
          </div>
          <div className='page-footer'>
            Want to login? <Link to="/login">Click Here</Link>
          </div>
          </div>
          }
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;

