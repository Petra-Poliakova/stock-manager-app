import React from 'react'
import './../../../styles/support/ContactForm.scss';

const ContactForm = () => {
  return (
    <div className='container' style={{textAlign:'center'}}>
      <div className='formWrapper'>
        <h2>Contact us</h2>
        <div className='forms'>
        <input type='text' placeholder='Enter your Name' className='formItem'></input>
        <input type='text' placeholder='Enter a valid email address' className='formItem'></input>
        <textarea className='formItem' rows={6}> </textarea>
        <button type='submit'>Submit</button>
        </div>
        
      </div>
    </div>
  )
}

export default ContactForm