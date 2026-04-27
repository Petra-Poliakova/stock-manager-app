import React from 'react'
import { Header } from '@/components/Header'
import { useLoaderData, LoaderFunctionArgs } from "react-router";
import { ProductDetailData } from '@/app/pages/products/ProductDetail'

export const ProductEdit = () => {
    const product = useLoaderData() as ProductDetailData
  return (
    <div className="page-container">
        <Header title={`Edit product: ${product.title}`} userName="AV"></Header>
       
    </div>
  )
}

export const productEditLoader = async ({ params }: LoaderFunctionArgs) => {
  if (!params.id) throw new Error("Missing product id");
  const res = await fetch("https://dummyjson.com/products/" + params.id);
  if (!res.ok) throw Error("Could not find that product");
  return res.json();
};
