import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CreateGlobalContext } from './globalContext';
import axios from 'axios';
import './common.css'; // Import the common CSS
import Loader from './microComponent/Loader';

const CreateNewPassword = () => {
    const [password, setPassword] = useState('');
    const[loader,setLoader]=useState(false)
    const [cnfPassword, setCnfPassword] = useState('');
    const navigate = useNavigate();
    const { email } = useContext(CreateGlobalContext);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = {
            email: email,
            password: password,
            cnfPassword: cnfPassword
        };

        await handleFormDataApi(data);
    };

    const handleFormDataApi = async (data) => {
        setLoader(true)
        try {
          
            const res = await axios.post('http://localhost:4000/api/create-password', data);
        navigate("/login")
        } catch (error) {
            console.log(error);
        }finally{
            setLoader(false)
        }
        

    };

    return (
        <div className="flex-center">
            <div className="page-container">
                <h1 className="page-header">Create New Password!</h1>
                <form onSubmit={handleSubmit} className="page-form">
                {loader?<Loader/>: <>
                   
                    
                    <div className="form-group">
                        <label>Password</label>
                        <input
                            type='password'
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder='Enter Password'
                            className="page-input"
                        />
                    </div>
                    <div className="form-group">
                        <label>Confirm Password</label>
                        <input
                            type='password'
                            required
                            value={cnfPassword}
                            onChange={(e) => setCnfPassword(e.target.value)}
                            placeholder='Confirm Password'
                            className="page-input"
                        />
                    </div>
                    <div className="form-group">
                        <button className="page-button" type='submit'>Submit</button>
                    </div>
                    </>}
                </form>
            </div>
        </div>
    );
};

export default CreateNewPassword;
