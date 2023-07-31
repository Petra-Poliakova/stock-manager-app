import React from 'react'
import { Link, useRouteError } from 'react-router-dom'

import './../../../styles/globalStyle.scss'

interface ErrorProps {
    message: string;
  }

const ProductError: React.FC = () => {
    const error = useRouteError() as ErrorProps;
  return (
    <div className='container'>
        <h1>Error</h1>
        <p>{error?.message}</p>
        <Link to='/'>Back to Homepage</Link>
    </div>
  )
}

export default ProductError