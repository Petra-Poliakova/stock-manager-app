import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import Logo from "../../assets/logo.png";

import "../../styles/globalStyle.scss";

const NavBar = () => {
  return (
    <>
      <header>
        <div className="logo-container">
          <div className="logo">
            <img src={Logo} alt="Logo" />
          </div>
        </div>

        <nav>
          <NavLink
            to="/"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            Home
          </NavLink>
          <NavLink
            to="/overview"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            Overview product
          </NavLink>
        </nav>
      </header>

      <main>
        <Outlet />
      </main>
    </>
  );
};

export default NavBar;
