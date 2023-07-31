import React from 'react';
import { NavLink, Outlet } from "react-router-dom";
import Logo from "../../assets/logo.png";

import "../../styles/globalStyle.scss";

const RootLayout = () => {
  return (
    <>
    <header>
      <div className="logo-container">
        <div className="logo">
          <img src={Logo} alt="Logo" />
        </div>
      </div>

      <nav className='rootNav'>
        <NavLink
          to="/"
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          Home
        </NavLink>
        <NavLink
          to="/products"
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          Products
        </NavLink>
        <NavLink
          to="/support"
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          Support
        </NavLink>
      </nav>
    </header>

    <main>
      <Outlet />
    </main>
  </>
  )
}

export default RootLayout