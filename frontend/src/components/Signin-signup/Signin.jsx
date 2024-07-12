import React, { useState } from 'react';
import './SignUp.css';
import { NavLink, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Signin = ({ onLogin }) => {
  const navigate = useNavigate();

  const [logdata, setLogdata] = useState({
    email: '',
    pwd: ''
  });

  const adddata = (e) => {
    const { name, value } = e.target;
    setLogdata(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSignIn = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/login', logdata);
      console.log('Login response:', response.data);

      // Store token in localStorage
      localStorage.setItem('authToken', response.data.token);

      onLogin(); // Trigger onLogin function passed from props

      // Show toast after successful login
      toast.success('Login successful!', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });

      navigate('/shop'); // Navigate to '/shop' after successful login
    } catch (error) {
      console.error('Error signing in:', error);
      toast.error('Login failed. Please check your credentials.', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  return (
    <>
      <section>
        <div className="sign_container">
          <div className="sign_header">
            <img src="Amazon.jpg" alt="logo" />
          </div>
          <div className="sign_form">
            <form onSubmit={handleSignIn}>
              <h1>Sign-In</h1>
              <div className='form_data'>
                <label htmlFor='email'>Email</label>
                <input
                  type='text'
                  onChange={adddata}
                  value={logdata.email}
                  name='email'
                  id='email'
                />
              </div>
              <div className='form_data'>
                <label htmlFor='pwd'>Password</label>
                <input
                  type='password'
                  onChange={adddata}
                  value={logdata.pwd}
                  name='pwd'
                  placeholder='At least 6 char'
                  id='pwd'
                />
              </div>
              <button className='signin_btn' type="submit">Continue</button>
            </form>
          </div>
          <div className="create_accountinfo">
            <p>New To Amazon</p>
            <NavLink to='/signup'><button>Create your Account</button></NavLink>
          </div>
        </div>
      </section>
    </>
  );
};

export default Signin;
