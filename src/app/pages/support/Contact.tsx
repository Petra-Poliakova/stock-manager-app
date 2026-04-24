import './Contact.scss'
import { FaMapMarkerAlt, FaPhone, FaFax, FaEnvelope } from 'react-icons/fa';

const Contact = () => {
  return (
    <div className='container'>
      <div className='contatWrapper'>
        <div className='contactBox'>
          <FaMapMarkerAlt size={'35px'}/> 
          <h2>Our main office</h2>
          <p>
            <a href='https://maps.google.com/?q=Street+12/34,+Country+012+34' target='_blank' rel='noopener noreferrer'>
              Street 12/34, Country 012 34
            </a>
          </p>
        </div>
        <div className='contactBox'>
          <FaPhone size={'35px'}/>
          <h2>Phone number</h2>
          <p><a href='tel:+421900123456'>+421 900 123 456</a></p>
        </div>
        <div className='contactBox'>
          <FaFax size={'35px'}/>
          <h2>Fax</h2>
          <p><a href='tel:+4212123456'>+421 2123 456</a></p>
        </div>
        <div className='contactBox'>
          <FaEnvelope size={'35px'}/>
          <h2>Email</h2>
          <p><a href='mailto:example@support.com'>example@support.com</a></p>
        </div>
      </div>
    </div>
  )
}

export default Contact