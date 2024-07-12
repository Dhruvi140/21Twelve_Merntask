import React, { useState } from 'react';
import './SignUp.css';
import { NavLink } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { useNavigate } from 'react-router-dom'; 

function SignUp() {
  const [signupData, setSignupData] = useState({
    fname: '',
    email: '',
    mobile: '',
    pwd: '',
    cpwd: ''
  });
  const [error, setError] = useState('');
  const navigate = useNavigate(); 

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSignupData({ ...signupData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Simple form validation
    if (!signupData.fname || !signupData.email || !signupData.mobile || !signupData.pwd || !signupData.cpwd) {
      setError('Please fill in all fields');
      showToastMessage('Please fill in all fields', 'error');
      return;
    }

    if (signupData.pwd !== signupData.cpwd) {
      setError('Passwords do not match');
      showToastMessage('Passwords do not match', 'error');
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/api/user', {
        fname: signupData.fname,
        email: signupData.email,
        mobile: signupData.mobile,
        pwd: signupData.pwd,
        cpwd: signupData.cpwd
      });

      console.log(response.data);

      // Show success toast
      showToastMessage('User Added Successfully', 'success');

      // Redirect to login page after successful signup
      navigate('/login');

    } catch (error) {
      if (error.response) {
        setError(error.response.data.error);
        showToastMessage(error.response.data.error, 'error');
      } else {
        setError(error.message);
        showToastMessage(error.message, 'error');
      }
    }
  };

  const showToastMessage = (message, type) => {
    
    toast[type](message, {
      position: 'top-right',
      autoClose: 3000 // 3 seconds
    });
  };

  return (
    <section>
      <ToastContainer /> 
      <div className="sign_container">
        <div className="sign_header">
          <img src="Amazon.jpg" alt="logo" />
        </div>
        <div className="sign_form">
          <form onSubmit={handleSubmit}>
            <h1>Create Account</h1>
            {error && <p className="error">{error}</p>}
            <div className='form_data'>
              <label htmlFor='fname'>Your Name</label>
              <input
                type='text'
                onChange={handleChange}
                value={signupData.fname}
                name='fname'
                id='fname'
              />
            </div>
            <div className='form_data'>
              <label htmlFor='email'>Email</label>
              <input
                type='text'
                onChange={handleChange}
                value={signupData.email}
                name='email'
                id='email'
              />
            </div>
            <div className='form_data'>
              <label htmlFor='mobile'>Mobile</label>
              <input
                type='text'
                onChange={handleChange}
                value={signupData.mobile}
                name='mobile'
                id='mobile'
              />
            </div>
            <div className='form_data'>
              <label htmlFor='pwd'>Password</label>
              <input
                type='password'
                onChange={handleChange}
                value={signupData.pwd}
                name='pwd'
                placeholder='At least 6 characters'
                id='pwd'
              />
            </div>
            <div className='form_data'>
              <label htmlFor='cpwd'>Confirm Password</label>
              <input
                type='password'
                onChange={handleChange}
                value={signupData.cpwd}
                name='cpwd'
                id='cpwd'
              />
            </div>
            <button type='submit' className='signin_btn'>Continue</button>
            <div className="signin_info">
              <p>Already have an Account?</p>
              <NavLink to='/login'>Sign In</NavLink>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

export default SignUp;
