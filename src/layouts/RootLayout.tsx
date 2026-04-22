import React, { FunctionComponent, SVGProps, useEffect, useState } from 'react';
import { NavLink, Outlet } from "react-router";
import { useMenu } from "@/context/MenuContext";

import { IMAGES } from '@/constans/constans';

import "./RootLayout.scss"


const RootLayout = () => {
  const { isFullSizeMenu } = useMenu();
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  console.log("isMobile", isMobile);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

   const menuOpen = isMobile ? false : isFullSizeMenu;

  const renderNavItem = (path: string, Icon: FunctionComponent<SVGProps<SVGSVGElement>>, text: string) => {
    return(
      <NavLink to={path} className="navItem">
      <Icon width="24px" height="24px" className="icon" />
      {menuOpen && <span className="text">{text}</span>}
    </NavLink>
    )
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'row', minHeight: '100vh' }}>
      <div 
      className={`sidebar ${menuOpen ? '' : 'collapsed'}`} style={{ width: menuOpen ? '207px' : '75px' }}>
        <div>
          <IMAGES.Logo className={`logo ${menuOpen ? '' : 'collapsed'}`} />
        </div>
        <nav className="menu">
          {renderNavItem('/', IMAGES.DashboardIcon, 'Dashboard')}
          {renderNavItem('/products', IMAGES.ProductIcon, 'Products')}
          {renderNavItem('/support', IMAGES.SupportIcon, 'Support')}
        </nav>
      </div>
      <main style={{ width: menuOpen ? 'calc(100% - 207px)' : 'calc(100% - 75px)', }}>
        <Outlet />
      </main>
    </div>
  );
};

export default RootLayout;

