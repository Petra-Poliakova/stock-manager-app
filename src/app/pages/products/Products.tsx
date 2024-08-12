import React, { useEffect, useState, ChangeEvent, useMemo } from "react";
import { Link } from "react-router-dom";
import { Header } from 'components/Header'
import Filter from "components/Filter";
import { useFetch } from "hooks/useFetch";
import LoadingSpinner from 'components/LoadingSpinner';
import { DataGrid, GridColDef } from '@mui/x-data-grid';

import "./../../../styles/globalStyle.scss";
import "../../../styles/products/Products.scss";

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

  const {data, error, isLoading} = useFetch<TData>('https://dummyjson.com/products?limit=0',)


  if (isLoading) { return <LoadingSpinner /> }
  if (error) { return <div>Error: {error.message}</div> }

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', headerClassName: 'header-class', width: 70 },
    { field: 'title', headerName: 'Title', headerClassName: 'header-class', flex: 2, cellClassName: 'title',
      renderCell: (params) => (
        <Link to={`/products/${params.id.toString()}`} onClick={(event) => event.stopPropagation()}>{params.value}</Link>
      )
     },
    { field: 'brand', headerName: 'Brand', headerClassName: 'header-class', flex: 1 },
    { field: 'category', headerName: 'Category', headerClassName: 'header-class', flex: 1 },
    { field: 'price', headerName: 'Price ( € )', headerClassName: 'header-class', flex: 1, cellClassName: 'price' },
  ];

  const rows = data?.products.map(product => product as TProducts) ?? [];

  return (
    <div className="page-container">
      <Header title="Products" userName="AV"></Header>
      <div
        className="table-container"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div style={{ width: "100%" , display: "flex", justifyContent: "space-between", alignItems: "center", margin:'25px'}}>
          <div>
            <div className="title-box">Overview</div>
            <div>Quickly access product details directly from the table.</div>
          </div>
          <div>Buttons</div>
        </div>

        <div style={{ width: "100%" }}>
          <DataGrid
            rows={rows}
            columns={columns}
            autoHeight
            initialState={{
              pagination: {
                paginationModel: { page: 0, pageSize: 10 },
              },
            }}
            pageSizeOptions={[10, 20, 30]}
            checkboxSelection
            sx={{
              "& .header-class": {
                backgroundColor: "#FCFCFD",
                color: "#667085",
                fontWeight: "bold",
              },
              "& .MuiDataGrid-columnHeaderCheckbox": {
                backgroundColor: "#FCFCFD",
                color: "#667085",
                fontWeight: "bold",
              },
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Products;

//TODO
// 1. Add error handling  
// 2. Add loading spinner
// 3. Add filter
// 4. Add pagination
// 5. Add sorting
// 6. Add images
