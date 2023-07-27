import React from 'react';
import { NavLink, Outlet } from "react-router-dom";

const NavBar = () => {
  return (
    <>
        <NavLink to="/" style={{color: 'black'}}> Home Page </NavLink>
        <NavLink to="/overview" style={{color: 'black'}}> Overview product </NavLink>

        <main>
          <Outlet/>
        </main>
    </>
  )
}

export default NavBar