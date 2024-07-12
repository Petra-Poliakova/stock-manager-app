import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';

import '../app/pages/support/Contact';
import '../app/pages/support/ContactForm'

import './../styles/globalStyle.scss'
//import './../../styles/layouts/SupportLayout.scss'
import './../styles/layouts/SupportLayout.scss'

const SupportLayout = () => {
  return (
    <div className='container'>
        <h1>Website Support</h1>
        <p style={{textAlign:'center', width:'80%', margin: '0 auto', padding:'50px 0'}}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi diam turpis, laoreet non sodales sagittis, dapibus at erat. 
          Maecenas venenatis turpis purus, eget euismod dolor lobortis ut. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; 
          Quisque elit mauris, vestibulum in vulputate at, euismod ac erat. Donec placerat mauris enim, pretium vulputate odio mollis nec. Nam volutpat lorem at purus 
          auctor pretium. Integer luctus et erat nec elementum. Fusce at purus vitae magna rutrum tincidunt iaculis sed mauris. Ut sed luctus ipsum, vitae ornare urna. 
          Nulla elementum metus est, vel fringilla magna scelerisque dignissim.
        </p>
        <nav className='supportNav'>
            <NavLink className='navLinkSupport' to='contact'>Contacts</NavLink>
            <NavLink className='navLinkSupport' to='contactForm'>Contact form</NavLink>
        </nav>

        <Outlet/>
    </div>
  )
}

export default SupportLayout