import React from 'react'
import { useLoaderData, useParams } from 'react-router-dom'

type dataType = {
  id: number;
  title: string;
  brand: string;
  category: string;
  price: number;
  }

const ProductDetail = () => {
    //const [data, setData] = useState<dataType>();

    const {id} = useParams();
    const product = useLoaderData() as dataType;

  return (
    <div>
        <h1>Products detail</h1>
        <p>I am detail product with id: {product.id}</p>
        <p>Title: {product.title}</p>
    </div>
  )
}

 export default ProductDetail

export const productDetailLoader = async ({params}: any) => {
 const {id} = params;

 const res = await fetch('https://dummyjson.com/products/' + id);

 if(!res.ok) {
  throw Error('Could not find that product')
 }

 return res.json();
}