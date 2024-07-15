import React from 'react';
import { NavLink, Outlet } from "react-router-dom";
import { useMenu } from "../context/MenuContext";

import { IMAGES } from '../constans/constans';

import "../styles/layouts/RootLayout.scss"


interface RootLayoutProps {}

const RootLayout: React.FC<RootLayoutProps> = () => {
  const { isFullSizeMenu } = useMenu();

  const menuClasses = `sidebar ${isFullSizeMenu ? '' : 'collapsed'}`;
  const menuStyle = { width: isFullSizeMenu ? '207px' : '75px' };
  const mainStyle = { width: isFullSizeMenu ? 'calc(100% - 207px)' : 'calc(100% - 75px)' };

  return (
    <div style={{ display: 'flex', flexDirection: 'row' }}>
      <div className={menuClasses} style={menuStyle}>
        <div>
          <IMAGES.Logo className={`logo ${isFullSizeMenu ? '' : 'collapsed'}`} />
        </div>
        <nav className="menu">
          <NavLink to="/" className="navItem">
            <IMAGES.DashboardIcon width="24px" height="24px" className="icon" />
            {isFullSizeMenu && <span className="text">Dashboard</span>}
          </NavLink>
          <NavLink to="/products" className="navItem">
            <IMAGES.ProductIcon width="24px" height="24px" className="icon" />
            {isFullSizeMenu && <span className="text">Products</span>}
          </NavLink>
          <NavLink to="/support" className="navItem">
            <IMAGES.SupportIcon width="24px" height="24px" className="icon" />
            {isFullSizeMenu && <span className="text">Support</span>}
          </NavLink>
        </nav>
      </div>

      <main style={mainStyle}>
        <Outlet />
      </main>
    </div>
  );
};

export default RootLayout;

