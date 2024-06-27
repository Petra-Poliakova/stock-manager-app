import React, {useEffect, useState} from 'react'
import './LoadingSpinner.scss'

interface LoadingSpinnerProps {
    size?: 'large' | 'medium' | 'small';
    loading?: boolean;
}

const LoadingSpinner = ({size = 'medium', loading = true}: LoadingSpinnerProps) => {
    const [isLoading, setIsLoading] = useState<boolean>(loading);

    useEffect(() => {
        setIsLoading(loading);
    },[loading]);

    if(!isLoading) return null

  return (
    <div className='spinner-container'>
        <div className='spinner' data-size={size} ></div>
    </div>
    
  )
}

export default LoadingSpinner