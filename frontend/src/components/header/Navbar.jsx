import React from 'react';
import "./Navbar.css";
import SearchIcon from '@mui/icons-material/Search';
import Badge from '@mui/material/Badge';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'; 
import Avatar from '@mui/material/Avatar';
import { NavLink } from 'react-router-dom';

function Navbar({ isLoggedIn, handleLogout }) {
  return (
    <header>
      <nav>
        <div className="left"> 
          <div className='navlogo'>
            <img src='1688364164amazon-logo-transparent.webp' alt='Amazon Logo'/>
          </div>
        </div>
        <div className="nav_searchbar">
          <input type="text" name='' id='' />
          <div className="search_icon">
            <SearchIcon id='search'/>
          </div>
        </div>
        <div className='right'>
          {isLoggedIn ? (
            <>
              <div className="nav_btn">
                <NavLink to='/' onClick={handleLogout}>
                  Signout
                </NavLink>
              </div>
              <div className="cart_btn">
                <Badge badgeContent={4} color="primary">
                  <ShoppingCartIcon id='icon'/>
                </Badge>
                <p>Cart</p>
              </div>
              <Avatar className='avtar'/>
            </>
          ) : (
            <>
              <div className="nav_btn">
                <NavLink to='/login'>
                  Signin
                </NavLink>
              </div>
              <div className="cart_btn">
                <Badge badgeContent={4} color="primary">
                  <ShoppingCartIcon id='icon'/>
                </Badge>
                <p>Cart</p>
              </div>
              <Avatar className='avtar'/>
            </>
          )}
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
