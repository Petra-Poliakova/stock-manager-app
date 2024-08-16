import React, { useEffect, useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { Header } from 'components/Header'
import Filter from "components/Filter";
import { useFetch } from "hooks/useFetch";
import LoadingSpinner from 'components/LoadingSpinner';
import { DataGrid, GridColDef, GridRowSelectionModel } from '@mui/x-data-grid';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { FaRegTrashAlt } from "react-icons/fa";
import { LuDownloadCloud } from "react-icons/lu";
import { FiPlus } from "react-icons/fi";

import { utils, writeFile } from 'xlsx';

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
  description?: string;
  category?: string;
  price?: number;
  discountPercentage?: number;
  rating?: number;
  stock?: number;
  tags?: string[];
  brand?: string;
  sku?: string;
  weight?: number;
  dimensions?: TDimensions;
  warrantyInformation?: string;
  shippingInformation?: string;
  availabilityStatus?: string;
  reviews?: TReview[];
  returnPolicy?: string;
  minimumOrderQuantity?: number;
  meta?: TMeta;
  images?: string[];
  thumbnail?: string;
};

export type TData = {
  products: TProducts[],
  total: number,
  skip: number,
  limit: number,
}

type FlatObject = { [key: string]: any };

const flattenObject = (obj: FlatObject, parent: string = '', res: FlatObject = {}): FlatObject => {
  for (let key in obj) {
      const propName = parent ? `${parent}.${key}` : key;

      if (Array.isArray(obj[key])) {
        if (typeof obj[key][0] === 'object') {
          obj[key].forEach((item: FlatObject, index: number) => {
              flattenObject(item, `${propName}[${index}]`, res);
          });
      } else {
          res[propName] = obj[key].join(', ');
      }
          // res[propName] = obj[key].map((item: any) => 
          //     typeof item === 'object' ? JSON.stringify(item) : item
          // ).join(', ');
          
      } else if (typeof obj[key] === 'object' && obj[key] !== null) {
          flattenObject(obj[key], propName, res);
      } else {
          res[propName] = obj[key];
      }
  }
  return res;
};

const Products = () => {
  const [rowSelectionModel, setRowSelectionModel] = useState<GridRowSelectionModel>([]);
  const [open, setOpen] = useState<boolean>(false);
  //const [addedProduct, setAddedProduct] = useState<TProducts | null>(null);

  const {data, error, isLoading} = useFetch<TData>('https://dummyjson.com/products?limit=0',)
  //const {doFetch: doFetchAdd, error: errorAdd, isLoading: isLoadingAdd } = useFetch('https://dummyjson.com/products/add', { method: 'POST' })
  //const {doFetch: doFetchDelete, error: errorDelete, isLoading: isLoadingDelete } = useFetch<TProducts>(`https://dummyjson.com/products/${id}`, { method: 'DELETE' })

  const rows = useMemo(() => data?.products.map(product => product as TProducts) ?? [], [data]);
  const selectedProducts = useMemo(() => { return rows.filter(product => rowSelectionModel.includes(product.id)); }, [rowSelectionModel, rows]); //lepsi pre vykon, jednoduchost a presnost
  //const selectedProducts = useMemo(() => rowSelectionModel.map(id => rows.find(row => row.id === id) as TProducts), [rowSelectionModel, rows]) // ak rowSelectionModel obsahuje v ID ktore nie su v rows, vrati undefined. Moze dojst k neocakavanemu spravaniu alebo je nutnost dalsieho osetrenia. Uzitocny, ked chcem zachovat presne poradie
  

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
    if (selectedProducts.length === 0) {
      alert("Please select at least one product to delete.");
      return;
    }

    try {
      const deletePromises = selectedProducts.map(async (product) => {
        const url = `https://dummyjson.com/products/${product.id}`;
        const response = await fetch(url, { method: 'DELETE' });
        const result = await response.json();
        alert(`Deleted product with ID ${product.id}: ${product.title}`);
        setRowSelectionModel([]);
      });

      await Promise.all(deletePromises);
    } catch (error) {
      console.error("Error deleting products:", error);
    }
  };

  const hnandleExportProducts = () => {
    if (selectedProducts.length === 0) {
      alert("Please select at least one product to export.");
      return;
    }

    const flatData = selectedProducts.map(product => flattenObject(product) as TProducts);

    let wb = utils.book_new();
    //let ws = utils.json_to_sheet(selectedProducts);
    let ws = utils.json_to_sheet(flatData);
    utils.book_append_sheet(wb, ws, "Products");
    writeFile(wb, "products.xlsx");
    console.log('selectedProducts', selectedProducts)
  }

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleAddProduct = async (newProduct: TProducts) => {
    try {
      const response = await fetch('https://dummyjson.com/products/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newProduct),
      })
      .then(response => response.json())
      .then(console.log);
      handleClose()
    } catch (error) {
      console.error("Error adding product:", error);
    }
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const formJson = Object.fromEntries(formData.entries());

    const newProduct: TProducts = {
      id: 0, // Dočasná hodnota, bude vygenerovaná backendom
      title: formJson.title as string,
      brand: formJson.brand as string,
      category: formJson.category as string,
      
    };

    handleAddProduct(newProduct);
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
              onClick={hnandleExportProducts}
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
              onClick={handleClickOpen}
            >
              Add new
            </Button>
          </div>
        </div>

        <Dialog
          open={open}
          onClose={handleClose}
          PaperProps={{
            component: "form",
            onSubmit: handleSubmit,
          }}
        >
          <DialogTitle>Create new product</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Please fill in the following details to add a new product to the
              catalog. Ensure all required fields are completed accurately.
            </DialogContentText>
            <TextField
              required
              margin="dense"
              id="title"
              name="title"
              label="Product Title"
              fullWidth
              variant="standard"
            />
            <TextField
              margin="dense"
              id="brand"
              name="brand"
              label="Brand"
              fullWidth
              variant="standard"
            />
            <TextField
              margin="dense"
              id="category"
              name="category"
              label="Category"
              fullWidth
              variant="standard"
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button type="submit">Save</Button>
          </DialogActions>
        </Dialog>

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
            onRowSelectionModelChange={(ids) => {
              setRowSelectionModel(ids);
              //const selectedRows = rows.filter(row => ids.includes(row.id));
              //console.log('selectedRows', selectedRows);
            }}
            rowSelectionModel={rowSelectionModel}
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

