import React from 'react'
import { Header } from 'components/Header'
import { useFetch } from 'hooks/useFetch'
import LoadingSpinner from 'components/LoadingSpinner'

import { TData } from './products/Products'

import 'styles/globalStyle.scss'

type TDataCategory = {
    slug: string,
    name: string,
    url: string,
}

const HomePage = () => {
  const {data, error, isLoading} = useFetch<TData[]>('https://dummyjson.com/products?limit=0',)
  const {data: categories, error: errorCategories, isLoading: isLoadingCategories} = useFetch<TDataCategory[]>('https://dummyjson.com/products/categories',)  

  console.log('Data HP', data, categories)

  if (isLoading || isLoadingCategories) {
    return <LoadingSpinner />
  }
  if (error || errorCategories) {
    return <div>Error: {error?.message}</div>
  }


  return (
    <div >
      <Header title='Dashboard' userName='AV'></Header>
      <div className='box-container'>
        <div className='box'>
          <div className='box-text'>
            <p></p>
            <p></p>
          </div>
          <div className='box-icon'></div>
        </div>
        <div className='box'>
          <div className='box-text'>
            <p></p>
            <p></p>
          </div>
          <div className='box-icon'></div>
        </div>
        <div className='box'>
          <div className='box-text'>
            <p></p>
            <p></p>
          </div>
          <div className='box-icon'></div>
        </div>
        <div className='box'>
          <div className='box-text'>
            <p></p>
            <p></p>
          </div>
          <div className='box-icon'></div>
        </div>
       
      </div>

      <ul>
        {categories?.map((category) => (
          <li key={category.slug}>
            <a href={category.url}>{category.name}</a>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default HomePage