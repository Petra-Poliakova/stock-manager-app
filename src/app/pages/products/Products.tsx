import React, { useState, useMemo } from "react";
import type { ChangeEvent } from "react";
import { Link } from "react-router";
import { Header } from "@/components/Header";
//import Filter from "@/components/Filter";
import { useFetch } from "@/hooks/useFetch";
import { useLocalStorage } from "@/hooks/useLocalSrorage";
import LoadingSpinner from "@/components/LoadingSpinner";
import CreateProductDialog from "@/components/CreateProductDialog";
import { DataGrid, GridColDef, GridRowSelectionModel, GridRenderCellParams, GridSortModel } from "@mui/x-data-grid";
import { Button, Box, TextField, Select, MenuItem, InputLabel, FormControl, SelectChangeEvent, } from "@mui/material";
import { FaRegTrashAlt } from "react-icons/fa";
import { LuDownload } from "react-icons/lu";
import { FiPlus } from "react-icons/fi";
import { MdFilterList } from "react-icons/md";
import { MdOutlineClose } from "react-icons/md";
import { flattenObject } from "@/helpers/flattenObject";

import { utils, writeFile } from "xlsx";

import "./Products.scss";

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
  products: TProducts[];
  total: number;
  skip: number;
  limit: number;
};

type TCategories = {
  name: string;
  slug: string;
  url: string;
}[];

type TTableState = {
  filters: {
    title: string;
    category: string;
  };
  sorting: GridSortModel;
  pagination: {
    page: number;
    pageSize: number;
  };
};

const defaultTableState: TTableState = {
  filters: {
    title: "",
    category: "",
  },
  sorting: [{ field: "id", sort: "asc" }],
  pagination: { page: 0, pageSize: 10,},
};



const Products = () => {
  const [rowSelectionModel, setRowSelectionModel] = useState<GridRowSelectionModel>({ type: 'include', ids: new Set() });
  const [open, setOpen] = useState<boolean>(false);
  const [category, setCategory] = useState<string>("");
  const [tableState, setTableState] = useLocalStorage<TTableState>("products-table-state", defaultTableState,);
  
  const { data, error, isLoading } = useFetch<TData>( "https://dummyjson.com/products?limit=0", );
  const { data: dataCategories } = useFetch<TCategories>( "https://dummyjson.com/products/categories", );
  const { data: categoryList} = useFetch<string[]>( "https://dummyjson.com/products/category-list", );

  /*------------------- Table data ---------------------------*/
  const columns: GridColDef[] = [
      {
        field: "id",
        headerName: "ID",
        headerClassName: "header-class",
        width: 70,
        filterable: false,
      },
      {
        field: "title",
        headerName: "Title",
        headerClassName: "header-class",
        filterable: false,
        flex: 2,
        cellClassName: "title",
        renderCell: (params: GridRenderCellParams) => (
          <Link
            to={`/products/${params.id.toString()}`}
            onClick={(event) => event.stopPropagation()}
          >
            {params.value}
          </Link>
        ),
      },
      {
        field: "brand",
        headerName: "Brand",
        headerClassName: "header-class",
        flex: 1,
        filterable: false,
      },
      {
        field: "category",
        headerName: "Category",
        headerClassName: "header-class",
        flex: 1,
        filterable: false,
      },
      {
        field: "price",
        headerName: "Price ( € )",
        headerClassName: "header-class",
        flex: 1,
        filterable: false,
        cellClassName: "price",
      },
    ];

  const rows = useMemo(() => {
  const titleFilter = tableState.filters.title.trim().toLowerCase();
  const categoryFilter = tableState.filters.category;

  return (data?.products ?? [])
    .filter((product) => {
      const matchesTitle =
        !titleFilter ||
        product.title.toLowerCase().includes(titleFilter);

      const matchesCategory =
        !categoryFilter ||
        product.category === categoryFilter;

      return matchesTitle && matchesCategory;
    })
    .map((product) => ({
      id: product.id,
      title: product.title,
      brand: product.brand,
      category: product.category,
      price: product.price,
    }));
}, [data, tableState.filters]);

  const rowSelectedProducts = useMemo(() => {
    if (!rowSelectionModel?.ids?.size) return [];
    return rows?.filter((product) => rowSelectionModel.ids.has(product.id));
  }, [rowSelectionModel, rows]);

  const deleteSelectedProducts = async () => {
  if (!rowSelectedProducts?.length) {
    alert("Please select at least one product to delete.");
    return;
  }

  try {
    await Promise.all(
      rowSelectedProducts.map(async (product) => {
        const response = await fetch(`https://dummyjson.com/products/${product.id}`, {
          method: "DELETE",
        });

        if (!response.ok) {
          throw new Error(`Failed to delete product ${product.id}`);
        }

        return response.json();
      }),
    );

    setRowSelectionModel({ type: "include", ids: new Set() });
    alert(`${rowSelectedProducts.length} product(s) deleted.`);
  } catch (error) {
    console.error("Error deleting products:", error);
    alert("Deleting products failed.");
  }
};

  const handleExportProducts = () => {
    if (rowSelectedProducts?.length === 0) { alert("Please select at least one product to export."); return; }

    const flatData = rowSelectedProducts?.map((product: TProducts) =>
        flattenObject(product),
    );

    const wb = utils.book_new();
    //let ws = utils.json_to_sheet(selectedProducts);
    const ws = utils.json_to_sheet(flatData ?? []);
    utils.book_append_sheet(wb, ws, "Products");
    writeFile(wb, "products.xlsx");
  };

  const openDialogAddProduct = () => {
    setOpen(true);
    setCategory("");
  };

  const closeDialogAddProduct = () => {
    setOpen(false);
  };

  const handleAddProduct = async (newProduct: TProducts) => {
    try {
      await fetch("https://dummyjson.com/products/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newProduct),
      })
        .then((response) => response.json())
        .then(console.log);
      closeDialogAddProduct();
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const formJson = Object.fromEntries(formData.entries());

    const newProduct: TProducts = {
      id: 0, 
      title: formJson.title as string,
      brand: formJson.brand as string,
      category: category,
    };

    handleAddProduct(newProduct);
    alert(`Product "${newProduct.title}" with category "${newProduct.category}" added successfully!`);
  };

  const handleCategoryChange = (event: ChangeEvent<HTMLInputElement>) => {
    setCategory(event.target.value);
  };

  const handleTitleFilterChange = (event: ChangeEvent<HTMLInputElement>) => {
  setTableState((prev) => ({
    ...prev,
    filters: {
      ...prev.filters,
      title: event.target.value,
    },
    pagination: {
      ...prev.pagination,
      page: 0,
    },
  }));
  
};

const handleCategoryFilterChange = (event: SelectChangeEvent) => {
  const selectedCategory = event.target.value; 

  setTableState((prev) => ({
    ...prev,
    filters: {
      ...prev.filters,
      category: selectedCategory,
    },
    pagination: {
      ...prev.pagination,
      page: 0,
    },
    
  }));
};

const clearTitleFilter = () => {
  setTableState((prev) => ({
    ...prev,
    filters: {
      ...prev.filters,
      title: "",
    },
    pagination: {
      ...prev.pagination,
      page: 0,
    },
  }));
};

const clearCategoryFilter = () => {
  setTableState((prev) => ({
    ...prev,
    filters: {
      ...prev.filters,
      category: "",
    },
    pagination: {
      ...prev.pagination,
      page: 0,
    },
  }));
};

const handleClearFilters = () => {
  setTableState((prev) => ({
    ...prev,  
    filters: {
      title: "",
      category: "",
    },  
    pagination: {
      ...prev.pagination,
      page: 0,
    },
  }));
};

const hasActiveFilters =
  Boolean(tableState.filters.title) || Boolean(tableState.filters.category);


  if (isLoading) {
    return <LoadingSpinner />;
  }
  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="page-container">
      <Header title="Products" userName="AV"></Header>
      <div className="filter-container">
        <div className="filter-bar">
          <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
            <MdFilterList size={20} />
            <span>Filter</span>
          </div>
          <div>
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <TextField
                label="Product name"
                variant="outlined"
                size="small"
                sx={{ width: 160 }}
                value={tableState.filters.title}
                onChange={handleTitleFilterChange}
              />
              <FormControl size="small" sx={{ width: 160 }}>
                <InputLabel id="category-label">Category</InputLabel>
                <Select
                  labelId="category-label"
                  label="Category"
                  value={tableState.filters.category}
                  onChange={handleCategoryFilterChange}
                >
                  <MenuItem value="">
                    <em>All categories</em>
                  </MenuItem>
                  {categoryList?.map((category) => (
                    <MenuItem key={category} value={category}>
                      {category}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
          </div>
        </div>
        <div className="filter-active">
          {tableState.filters.title && <Button variant="contained" endIcon={<MdOutlineClose />} 
          sx={{textTransform: "none", color: 'var(--accent)', backgroundColor: 'var(--color-neutral-secondary)', "&:hover": { backgroundColor: 'var(--accent)', color: '#fff' },}}
          onClick={clearTitleFilter}>
            Product name: {tableState.filters.title}
            </Button>}
          {tableState.filters.category && <Button variant="contained" endIcon={<MdOutlineClose />} 
          sx={{textTransform: "none", color: 'var(--accent)', backgroundColor: 'var(--color-neutral-secondary)', "&:hover": { backgroundColor: 'var(--accent)', color: '#fff' },}}
          onClick={clearCategoryFilter}>
            Category: {tableState.filters.category}
            </Button>}
          </div>
        {hasActiveFilters && <div className="filter-clear">
          <Button size="medium" variant="outlined" onClick={handleClearFilters}
            sx={{
              textTransform: "none", color: 'var(--accent)', borderColor: 'var(--accent)',
              "&:hover": { backgroundColor: 'var(--color-neutral-secondary)' },
            }} 
          >Clear all filters</Button>
        </div>}
      </div>
      <div className="table-container" style={{ display: "flex", justifyContent: "center", alignItems: "center", }} >
        <div style={{ width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center", }} >
          <div style={{ display: "flex", flexDirection: "column", padding: "25px", }} >
            <div className="title-box">Overview</div>
            <div>Quickly access product details directly from the table.</div>
          </div> 
          <div style={{ display: "flex", flexDirection: "row", padding: "25px", gap: "10px", }} >
            <Button
              variant="text"
              sx={{color: "#202e44", textTransform: "none", "&:hover": { backgroundColor: "transparent", color: "#8b734c" },}}
              startIcon={<FaRegTrashAlt size={15} />}
              onClick={deleteSelectedProducts}
            >
              Delete
            </Button>
            <Button
              variant="outlined"
              sx={{color: "#202e44", textTransform: "none", "&:hover": { backgroundColor: "transparent", color: "#8b734c" },}}
              startIcon={<LuDownload size={15} />}
              onClick={handleExportProducts}
            >
              Export
            </Button>
            <Button
              variant="contained"
              sx={{
                color: "#fff",
                textTransform: "none",
                backgroundColor: "#8b734c",
                "&:hover": { backgroundColor: "#7a623f" },
              }}
              startIcon={<FiPlus size={15} />}
              onClick={openDialogAddProduct}
            >
              Add new
            </Button>
          </div>
        </div>

              <CreateProductDialog
                open={open}
                closeDialogAddProduct={closeDialogAddProduct}
                handleSubmit={handleSubmit}
                category={category}
                handleCategoryChange={handleCategoryChange}
                dataCategories={dataCategories ?? null}
              />

        <div style={{ width: "100%" }}>
          <DataGrid
            rows={rows}
            columns={columns}
            autoHeight
            sortModel={tableState.sorting}
            onSortModelChange={(newSortModel) => {
              setTableState((prev) => ({ ...prev, sorting: newSortModel,})); 
            }}
            paginationModel={tableState.pagination}
            onPaginationModelChange={(newPaginationModel) => {
              setTableState((prev) => ({
                ...prev,
                pagination: newPaginationModel,
              }));
            }}
            pageSizeOptions={[10, 20, 30]}
            checkboxSelection
            onRowSelectionModelChange={(newRowSelectionModel: GridRowSelectionModel) => {
              setRowSelectionModel(newRowSelectionModel);
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

