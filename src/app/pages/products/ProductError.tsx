import React from 'react'
import { Link, useRouteError } from 'react-router-dom'

interface ErrorProps {
    message: string;
  }

const ProductError: React.FC = () => {
    const error = useRouteError() as ErrorProps;
  return (
    <div>
        <h1>Error</h1>
        <p>{error?.message}</p>
        <Link to='/'>Back to Homepage</Link>
    </div>
  )
}

export default ProductError