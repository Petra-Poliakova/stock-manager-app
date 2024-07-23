import React from 'react'
import { Header } from 'components/Header'
import { useFetch } from 'hooks/useFetch'
import LoadingSpinner from 'components/LoadingSpinner'

import { TData } from './products/Products'
import { IMAGES } from 'constans/constans'

import 'styles/globalStyle.scss'
import './HomePage.scss'

const HomePage = () => {
  const {data, error, isLoading} = useFetch<TData[]>('https://dummyjson.com/products?limit=0',)

  console.log('Data HP', data)

  if (isLoading) {
    return <LoadingSpinner />
  }
  if (error) {
    return <div>Error: {error?.message}</div>
  }


  return (
    <div className='page-container'>
      <Header title='Dashboard' userName='AV'></Header>
      <div className='box-container'>
        <div className='box'>
          <div className='box-text'>
            <span>New sales</span>
            <span>1.355</span>
          </div>
          <div className='box-icon'>
            <IMAGES.ChartBar/>
          </div>
        </div>
        <div className='box'>
          <div className='box-text'>
            <span>New leads</span>
            <span>2.830</span>
          </div>
          <div className='box-icon'>
            <IMAGES.UserPlus/>
          </div>
        </div>
        <div className='box'>
          <div className='box-text'>
            <span>Income per leads</span>
            <span>€1.910</span>
          </div>
          <div className='box-icon'>
            <IMAGES.Money/>
          </div>
        </div>
        <div className='box'>
          <div className='box-text'>
            <span>Conversion rate</span>
            <span>3.51%</span>
          </div>
          <div className='box-icon'>
            <IMAGES.ChartLine/>
          </div>
        </div>
       
      </div>

    </div>
  )
}

export default HomePage