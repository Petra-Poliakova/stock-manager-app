import React from 'react'
import { Header } from '../../components/Header'
import { useFetch } from '../../hooks/useFetch'
import LoadingSpinner from '../../components/LoadingSpinner'

import './../../styles/globalStyle.scss'

type TData = {
    slug: string,
    name: string,
    url: string,
}

const HomePage = () => {
  const {data, error, isLoading} = useFetch<TData[]>('https://dummyjson.com/products/categories',)  

  if (isLoading) {
    return <LoadingSpinner />
  }
  if (error) {
    return <div>Error: {error.message}</div>
  }


  return (
    <div >
      <Header title='Dashboard' userName='AV'></Header>

      <ul>
        {data?.map((category) => (
          <li key={category.slug}>
            <a href={category.url}>{category.name}</a>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default HomePage