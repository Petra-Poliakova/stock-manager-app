import React from 'react'
import { Header } from 'components/Header'
import { useFetch } from 'hooks/useFetch'
import LoadingSpinner from 'components/LoadingSpinner'

import { TData } from './products/Products'
import { IMAGES } from 'constans/constans'

import salesData from 'data/sales.json'

import 'styles/globalStyle.scss'
import './HomePage.scss'

const HomePage = () => {
  const {data, error, isLoading} = useFetch<TData>('https://dummyjson.com/products?limit=0',)

  console.log('Data HP', data)
  
  if (isLoading) {
    return <LoadingSpinner />
  }
  if (error) {
    return <div>Error: {error?.message}</div>
  }

  const getFormatNumberWithDot = (number: number) => {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
  }

  const totalSalesQuantity = salesData.sales.map(item => item.quantitySold).reduce((a, b) => a + b, 0);
  const totalSalesRevenue = salesData.sales.map(item => item.unitPrice * item.quantitySold).reduce((a, b) => a + b, 0);
  const averageRevenuePerUnit = (totalSalesRevenue / totalSalesQuantity) * 100;

  //const inStockProducts = data?.products.filter(product => product.availabilityStatus === 'In Stock');
  const lowStockProducts = data?.products.filter(product => product.availabilityStatus === 'Low Stock');
  //const outOfStockProducts = data?.products.filter(product => product.availabilityStatus === 'Out of Stock');

  return (
    <div className='page-container'>
      <Header title='Dashboard' userName='AV'></Header>
      <div className='box-container'>
        <div className='box'>
          <div className='box-text'>
            <span>New sales</span>
            <span>{(getFormatNumberWithDot(Math.floor(totalSalesQuantity)))}</span>
          </div>
          <div className='box-icon'>
            <IMAGES.ChartBar/>
          </div>
        </div>
        <div className='box'>
          <div className='box-text'>
            <span>New sales revenue</span>
            <span>€{(getFormatNumberWithDot(Math.floor(totalSalesRevenue)))}</span>
          </div>
          <div className='box-icon'>
            <IMAGES.Money/>
          </div>
        </div>
        <div className='box'>
          <div className='box-text'>
            <span>Revenue per unit</span>
            <span>{getFormatNumberWithDot(Math.floor(averageRevenuePerUnit))}%</span>
          </div>
          <div className='box-icon'>
            <IMAGES.ChartLine/>
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
        
       
      </div>
    </div>
  )
}

export default HomePage