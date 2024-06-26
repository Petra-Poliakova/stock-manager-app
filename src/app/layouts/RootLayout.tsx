import React from 'react';
import { NavLink, Outlet } from "react-router-dom";
import Logo from "../../assets/logo_svg.svg";

//import "../../styles/globalStyle.scss";
import "../../styles/layouts/RootLayout.scss"

const RootLayout = () => {
  return (
    <div style={{width:'100%', display:'flex', flexDirection:'row'}}>
    <div className='sidebar'>
      <div className='logo'>
        <img src={Logo} alt="Logo" />
      </div>
      <nav className='menu'>
          <NavLink to="/"><div className='navItem'><span className='icon'>i</span> Home</div></NavLink>
          <NavLink to="/products"><div className='navItem'><span className='icon'>i</span> Products</div></NavLink>
          <NavLink to="/support"><div className='navItem'><span className='icon'>i</span> Support</div></NavLink>
      </nav>
    </div>
    {/* <header>
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
    </header> */}

    <main style={{width:'85%'}}>
      <Outlet />
    </main>
  </div>
  )
}

export default RootLayout

