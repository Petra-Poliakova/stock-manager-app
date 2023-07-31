import React from 'react'
import './../../../styles/globalStyle.scss'
import './../../../styles/support/Contact.scss'
import { FaMapMarkerAlt, FaPhone, FaFax, FaMailBulk } from 'react-icons/fa';

const Contact = () => {
  return (
    <div className='container'>
      <div className='contatWrapper'>
        <div className='contactBox'>
          <FaMapMarkerAlt size={'35px'}/> 
          <h2>Our main office</h2>
          <p>Street 12/34, Country 012 34</p>
        </div>
        <div className='contactBox'>
          < FaPhone size={'35px'}/>
          <h2>Phone number</h2>
          <p>+421 900 123 456</p>
          </div>
        <div className='contactBox'>
          <FaFax size={'35px'}/>
          <h2>Fax</h2>
          <p>+421 2123 456</p>
          </div>
        <div className='contactBox'>
          <FaMailBulk size={'35px'}/>
          <h2>Email</h2>
          <p>example@support.com</p>
          </div>
      </div>
      
    </div>
  )
}

export default Contact