import React from 'react'
import { Link } from 'react-router-dom'

const NotFound = () => {
  return (
    <div>
        <h1>Page Not Found</h1>
        <p>Go to link: <Link to='/'>Home</Link></p>
    </div>
  )
}

export default NotFound