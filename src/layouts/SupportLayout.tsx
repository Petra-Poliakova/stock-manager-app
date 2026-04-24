import { NavLink, Outlet } from 'react-router';
import { FaAddressBook, FaEnvelope, FaQuestionCircle } from 'react-icons/fa';
import { Header } from '@/components/Header';

import './SupportLayout.scss'

const SupportLayout = () => {
  return (
    <div className='page-container'>
        <Header title='Support' userName='PP' />
        <div className='supportHeader'>
          <h1>Website Support</h1>
          <p>Need help? Browse our FAQ, find our contact details, or send us a message directly. We're here to help you.</p>
        </div>
        <nav className='supportNav'>
            <NavLink className='navLinkSupport' to='faq'>
              <FaQuestionCircle size={18} />
              <span>FAQ</span>
            </NavLink>
            <NavLink className='navLinkSupport' to='contact'>
              <FaAddressBook size={18} />
              <span>Contacts</span>
            </NavLink>
            <NavLink className='navLinkSupport' to='contactForm'>
              <FaEnvelope size={18} />
              <span>Contact form</span>
            </NavLink>
        </nav>

        <Outlet/>
    </div>
  )
}

export default SupportLayout