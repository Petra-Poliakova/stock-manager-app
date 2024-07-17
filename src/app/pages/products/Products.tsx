import React, { useEffect, useState, ChangeEvent } from "react";
import { Link } from "react-router-dom";
import Filter from "../../../components/Filter";
import { useFetch } from "../../../hooks/useFetch";
import LoadingSpinner from '../../../components/LoadingSpinner'

import "./../../../styles/globalStyle.scss";

export type TReview = {
  rating: number;
  comment: string;
  date: string;
  reviewerName: string;
  reviewerEmail: string;
};

export type TDimensions = {
  width: number;
  height: number;
  depth: number;
};

export type TMeta = {
  createdAt: string;
  updatedAt: string;
  barcode: string;
  qrCode: string;
};

export type TProducts = {
  id: number;
  title: string;
  description: string;
  category: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  tags: string[];
  brand: string;
  sku: string;
  weight: number;
  dimensions: TDimensions;
  warrantyInformation: string;
  shippingInformation: string;
  availabilityStatus: string;
  reviews: TReview[];
  returnPolicy: string;
  minimumOrderQuantity: number;
  meta: TMeta;
  images: string[];
  thumbnail: string;
};

export type TData = {
  products: TProducts[],
  total: number,
  skip: number,
  limit: number,
}

const Products = () => {

  const {data, error, isLoading} = useFetch<TData>('https://dummyjson.com/products',)

  console.log('data', data)

  if (isLoading) { return <LoadingSpinner /> }
  if (error) { return <div>Error: {error.message}</div> }

  return (
    <>
        <div className="table" style={{ width: "100%" }}>
          <table
            style={{
              width: "95%",
              borderCollapse: "collapse",
              margin: "25px auto",
            }}
          >
            <thead>
              <tr>
                <th className="tableHeaderStyle">Id</th>
                <th className="tableHeaderStyle">Title</th>
                <th className="tableHeaderStyle">Brand</th>
                <th className="tableHeaderStyle">Category</th>
                <th className="tableHeaderStyle">Price</th>
              </tr>
            </thead>
            <tbody>
              {data?.products?.map((item, index) => (
                <tr key={index}>
                  <td className="tableCellStyle">
                    <Link to={item.id.toString()}>{item.id}</Link>
                  </td>
                  <td className="tableCellStyle">{item.title}</td>
                  <td className="tableCellStyle">{item.brand}</td>
                  <td className="tableCellStyle">{item.category}</td>
                  <td
                    className="tableCellStyle"
                    style={{ color: "#8b734c", fontWeight: "bold" }}
                  >
                    € {item.price}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
    </>
  );
};

export default Products;

//TODO
//1. Roddelenie kódu do menších komponentov Filter a Tabuľka
//2. Filter -> filtrovanie podľa kategorie, brand zmeniť na dropdown
//3. Tabuľla -> urobiť sortovanie
//4. Optimalizácia dopytov - teraz sa načítavajú všetky dáta. Paginácia a loader
//5. UI/UX vylepšenia: pridávaním rôznych vizuálnych efektov, animácií alebo zlepšovaním použiteľnosti filtrov a tabuľky.
//6.
