import { useState, SubmitEvent } from 'react'
import './ContactForm.scss';

type FormErrors = {
  name?: string;
  email?: string;
  message?: string;
};

const ContactForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const validate = (): FormErrors => {
    const newErrors: FormErrors = {};
    if (!name.trim()) newErrors.name = 'Name is required';
    if (!email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    if (!message.trim()) newErrors.message = 'Message is required';
    return newErrors;
  };

  const handleSubmit = (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setIsSubmitted(false);
      return;
    }
    setErrors({});
    setIsSubmitted(true);
    setName('');
    setEmail('');
    setMessage('');
  };

  return (
    <div className='container' style={{textAlign:'center'}}>
      <div className='formWrapper'>
        <h2>Contact us</h2>
        {isSubmitted && (
          <div className='successMessage'>Your message has been sent successfully!</div>
        )}
        <form className='forms' onSubmit={handleSubmit} noValidate>
          <div className='formField'>
            <input
              type='text'
              placeholder='Enter your Name'
              className={`formItem ${errors.name ? 'error' : ''}`}
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            {errors.name && <span className='errorText'>{errors.name}</span>}
          </div>
          <div className='formField'>
            <input
              type='email'
              placeholder='Enter a valid email address'
              className={`formItem ${errors.email ? 'error' : ''}`}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {errors.email && <span className='errorText'>{errors.email}</span>}
          </div>
          <div className='formField'>
            <textarea
              className={`formItem ${errors.message ? 'error' : ''}`}
              rows={6}
              placeholder='Write your message...'
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            {errors.message && <span className='errorText'>{errors.message}</span>}
          </div>
          <button type='submit'>Submit</button>
        </form>
      </div>
    </div>
  )
}

export default ContactForm