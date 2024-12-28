import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CreateGlobalContext } from './globalContext';
import axios from 'axios';
import './common.css'; // Import the common CSS
import Loader from './microComponent/Loader';

const OTPassword = () => {
    const [otp, setOtp] = useState('');
    const[loader,setLoader]=useState(false)
    const { email, forgotKey, handleForgotKey } = useContext(CreateGlobalContext);
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = { email: email, otp: otp.toString() };
        await handleFormDataApi(data);
    };

    const handleFormDataApi = async (data) => {
        try {
            setLoader(true)
            const res = await axios.post('http://localhost:4000/api/verify-otp', data);
            if (forgotKey) {
                handleForgotKey(false);
                navigate('/createNewPassword');
            } else {
                navigate('/login');
            }
 
        } catch (error) {
            console.log(error);
      
        }
        finally{
            setLoader(false)
        }
 
    };

    return (
        <div className="flex-center">
            <div className="page-container">
                <h1 className="page-header">Verify Your Account</h1>
                <form onSubmit={handleSubmit} className="page-form">
{loader?<Loader/>:<div>
    

                    <div className="form-group">
                        <label>Enter OTP Here</label>
                        <input
                            type="text"
                            required
                            value={otp}
                            onChange={(e) => setOtp(e.target.value)}
                            placeholder="Enter OTP"
                            className="page-input"
                        />
                    </div>
                    <div className="form-group">
                        <button className="page-button" type="submit">
                            SUBMIT OTP
                        </button>
                    </div>
                    <div className="page-footer">
                        Haven't Received OTP? <Link to="#">Resend OTP!</Link>
                    </div>

                    </div>
                    }

                </form>
            </div>
        </div>
    );
};

export default OTPassword;
