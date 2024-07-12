import React, { useState } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import './App.css';
import Navbar from './components/header/Navbar';
import Newnav from './components/header/newnavbar/Newnav';
import Signin from './components/Signin-signup/Signin';
import SignUp from './components/Signin-signup/SignUp';
import Shop from './components/Shop/Shop';
import Home from './components/Home/Home';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Product from  './components/Shop/Product';



import 'bootstrap-icons/font/bootstrap-icons.css';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Function to handle login
  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  // Function to handle logout
  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  return (
    <>
    <ToastContainer />
      <Navbar isLoggedIn={isLoggedIn} onLogout={handleLogout} />
      <Newnav isLoggedIn={isLoggedIn} />

      <Routes>
        {/* Route for the home page, can be your landing page */}
        <Route path='/' element={<Home />} />

        {/* Route for the login page */}
        <Route path='/login' element={<Signin onLogin={handleLogin} />} />

        {/* Route for the sign up page */}
        <Route path='/signup' element={<SignUp />} />

        {/* Route for the shop page */}
        <Route path='/shop' element={<Shop />} />

       
 

        {/* Fallback route for shop when not logged in */}
        {!isLoggedIn && <Route path='/shop' element={<Navigate to='/login' />} />}

        {!isLoggedIn &&<Route path="/products/:shopId" element={<Product />} />}
      </Routes>
    </>
  );
}

// Example Home component to render when on '/'


export default App;
