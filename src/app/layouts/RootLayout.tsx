import React from 'react';
import { NavLink, Outlet } from "react-router-dom";
import Logo from "../../assets/logo_svg.svg";
import {ReactComponent as ProductIcon } from '../../assets/product.svg';
import {ReactComponent as DashboardIcon } from '../../assets/dashboard.svg';
import {ReactComponent as SupportIcon } from '../../assets/support.svg';

import "../../styles/layouts/RootLayout.scss"

interface RootLayoutProps {}

const RootLayout: React.FC<RootLayoutProps> = () => {
  return (
    <div style={{width:'100%', display:'flex', flexDirection:'row'}}>
    <div className='sidebar'>
      <div className='logo'>
        <img src={Logo} alt="Logo" />
      </div>
      <nav className='menu'>
          <NavLink to="/" className='navItem'><DashboardIcon style={{width:'24px', height:'24px'}} className='icon'/> Dashboard</NavLink>
          <NavLink to="/products" className='navItem'><ProductIcon style={{width:'24px', height:'24px'}} className='icon'/>Products</NavLink>
          <NavLink to="/support" className='navItem'><SupportIcon style={{width:'24px', height:'24px'}} className='icon'/> Support</NavLink>
      </nav>
    </div>

    <main style={{width:'85%'}}>
      <Outlet />
    </main>
  </div>
  )
}

export default RootLayout

