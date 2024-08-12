import React, { useEffect, useState, ChangeEvent, useMemo } from "react";
import { Link } from "react-router-dom";
import { Header } from 'components/Header'
import Filter from "components/Filter";
import { useFetch } from "hooks/useFetch";
import LoadingSpinner from 'components/LoadingSpinner';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import Button from '@mui/material/Button';
import { FaRegTrashAlt } from "react-icons/fa";
import { LuDownloadCloud } from "react-icons/lu";
import { FiPlus } from "react-icons/fi";

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
  const [selectionProducts, setSelectionProducts] = useState<number[]>([]);

  const {data, error, isLoading} = useFetch<TData>('https://dummyjson.com/products?limit=0',)
  //const { data: dataDelete, error: errorDelete, isLoading: isLoadingDelete } = useFetch<TProducts>(`https://dummyjson.com/products/${id}`, { method: 'DELETE' })

  const rows = useMemo(() => data?.products.map(product => product as TProducts) ?? [], [data]);

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', headerClassName: 'header-class', width: 70, filterable: false },
    { field: 'title', headerName: 'Title', headerClassName: 'header-class', flex: 2, cellClassName: 'title',
      renderCell: (params) => (
        <Link to={`/products/${params.id.toString()}`} onClick={(event) => event.stopPropagation()}>{params.value}</Link>
      )
     },
    { field: 'brand', headerName: 'Brand', headerClassName: 'header-class', flex: 1 },
    { field: 'category', headerName: 'Category', headerClassName: 'header-class', flex: 1 },
    { field: 'price', headerName: 'Price ( € )', headerClassName: 'header-class', flex: 1, cellClassName: 'price' },
  ];

  

  const handleDeleteProducts = async () => {
    if (selectionProducts.length === 0) {
      alert("Please select at least one product to delete.");
      return;
    }

    try {
      const deletePromises = selectionProducts.map(async (productId) => {
        const url = `https://dummyjson.com/products/${productId}`;
        const response = await fetch(url, { method: 'DELETE' });
        const result = await response.json();
        alert(`Deleted product with ID ${productId}:`);
      });

      await Promise.all(deletePromises);
    } catch (error) {
      console.error("Error deleting products:", error);
    }
  };

  if (isLoading) { return <LoadingSpinner /> }
  if (error) { return <div>Error: {error.message}</div> }

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
        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              padding: "25px",
            }}
          >
            <div className="title-box">Overview</div>
            <div>Quickly access product details directly from the table.</div>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              padding: "25px",
              gap: "10px",
            }}
          >
            <Button
              variant="text"
              style={{ color: "#202e44", textTransform: "none" }}
              startIcon={<FaRegTrashAlt size={15} />}
              onClick={handleDeleteProducts}
            >
              Delete
            </Button>
            <Button
              variant="outlined"
              style={{ color: "#202e44", textTransform: "none" }}
              startIcon={<LuDownloadCloud size={15} />}
            >
              Export
            </Button>
            <Button
              variant="contained"
              style={{
                color: "#fff",
                textTransform: "none",
                backgroundColor: "#8b734c",
              }}
              startIcon={<FiPlus size={15} />}
            >
              Add new
            </Button>
          </div>
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
            onRowSelectionModelChange = {(ids) => {
              setSelectionProducts(ids as number[]);
            }}
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
// 2. Add filter

