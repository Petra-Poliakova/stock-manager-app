import React from 'react';

import './../pages/support/Contact';
import './../pages/support/ContactForm'

import './../../styles/globalStyle.scss'
import { NavLink, Outlet } from 'react-router-dom';

const SupportLayout = () => {
  return (
    <div>
        <h1>Website Support</h1>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut a massa nibh. Etiam venenatis nisl sed lectus consequat porttitor.
             Nullam sed imperdiet ligula. Nunc pharetra orci vel luctus maximus. Donec et tincidunt lectus. Donec eu metus sapien.
        </p>
        <nav style={{background:'#8b734c'}}>
            <NavLink to='contact'>List of contacts</NavLink>
            <NavLink to='contactForm'>Contact form</NavLink>
        </nav>

        <Outlet/>
    </div>
  )
}

export default SupportLayout