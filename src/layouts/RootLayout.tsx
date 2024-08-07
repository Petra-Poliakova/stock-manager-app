import React, { FunctionComponent, SVGProps } from 'react';
import { NavLink, Outlet } from "react-router-dom";
import { useMenu } from "context/MenuContext";

import { IMAGES } from 'constans/constans';

import "../styles/layouts/RootLayout.scss"


interface RootLayoutProps {}

const RootLayout: React.FC<RootLayoutProps> = () => {
  const { isFullSizeMenu } = useMenu();

  const menuClasses = `sidebar ${isFullSizeMenu ? '' : 'collapsed'}`;
  const menuStyle = { width: isFullSizeMenu ? '207px' : '75px' };
  const mainStyle = { width: isFullSizeMenu ? 'calc(100% - 207px)' : 'calc(100% - 75px)' };

  const renderNavItem = (path: string, Icon: FunctionComponent<SVGProps<SVGSVGElement>>, text: string) => {
    return(
      <NavLink to={path} className="navItem">
      <Icon width="24px" height="24px" className="icon" />
      {isFullSizeMenu && <span className="text">{text}</span>}
    </NavLink>
    )
   
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'row' }}>
      <div className={menuClasses} style={menuStyle}>
        <div>
          <IMAGES.Logo className={`logo ${isFullSizeMenu ? '' : 'collapsed'}`} />
        </div>
        <nav className="menu">
          {renderNavItem('/', IMAGES.DashboardIcon, 'Dashboard')}
          {renderNavItem('/products', IMAGES.ProductIcon, 'Products')}
          {renderNavItem('/support', IMAGES.SupportIcon, 'Support')}
        </nav>
      </div>

      <main style={mainStyle}>
        <Outlet />
      </main>
    </div>
  );
};

export default RootLayout;

