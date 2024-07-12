import React from 'react';
import { NavLink, Outlet } from "react-router-dom";
import { useMenu } from "../context/MenuContext";

import { IMAGES } from '../constans/constans';

import "../styles/layouts/RootLayout.scss"

interface RootLayoutProps {}

const RootLayout: React.FC<RootLayoutProps> = () => {
  const { isFullSizeMenu } = useMenu();

  return (
    <div style={{ display:'flex', flexDirection:'row'}}>
    <div className='sidebar' style={{width: isFullSizeMenu ? '207px' : '75px' }}>
      <div className='logo'>
        <IMAGES.Logo style={{width: isFullSizeMenu ? '75px' : '50px'}}/>
      </div>
      {isFullSizeMenu ? 
      <nav className='menu'>
          <NavLink to="/" className='navItem'><IMAGES.DashboardIcon width='24px' height='24px' className='icon'/> Dashboard</NavLink>
          <NavLink to="/products" className='navItem'><IMAGES.ProductIcon width='24px' height='24px' className='icon'/>Products</NavLink>
          <NavLink to="/support" className='navItem'><IMAGES.SupportIcon width='24px' height='24px' className='icon'/> Support</NavLink>
      </nav> : 
      <nav className='menu'>
        <NavLink to="/" className='navItem'><IMAGES.DashboardIcon width='24px' height='24px' className='icon'/></NavLink>
        <NavLink to="/products" className='navItem'><IMAGES.ProductIcon width='24px' height='24px' className='icon'/></NavLink>
        <NavLink to="/support" className='navItem'><IMAGES.SupportIcon width='24px' height='24px' className='icon'/></NavLink>
      </nav>}
    </div>

    <main style={{width:isFullSizeMenu ? 'calc(100% - 207px)' : 'calc(100% - 75px)'}}>
      <Outlet />
    </main>
  </div>
  )
}

export default RootLayout

