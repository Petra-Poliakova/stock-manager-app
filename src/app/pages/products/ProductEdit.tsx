import { useState } from "react";
import { useFetch } from "@/hooks/useFetch";
import { Header } from "@/components/Header";
import { useLoaderData, LoaderFunctionArgs, useNavigate, useNavigation } from "react-router";
import { ProductDetailData } from "@/types/product";
import UniversalImg from "@/assets/univesral-image.jpg";
import { ProductSideMenu } from "@/components/ProductSideMenu/ProductSideMenu";
import type { ProductMenuItem, ProductTab, } from "@/components/ProductSideMenu/ProductSideMenu";
import { LuInfo, LuMessageSquare, LuRuler, LuHash, LuSave} from "react-icons/lu";
import { PiPencilSimpleLight } from "react-icons/pi";
import LoadingSpinner from "@/components/LoadingSpinner";
import {Box, TextField, Stack, FormLabel, InputAdornment, MenuItem} from '@mui/material';

import "./ProductEdit.scss";

export const ProductEdit = () => {
  const navigate = useNavigate();
  const navigation = useNavigation();
  const isLoading = navigation.state === "loading";
  const product = useLoaderData() as ProductDetailData;
  const [editData, setEditData] = useState<ProductDetailData>(product);
  const [activeTab, setActiveTab] = useState<ProductTab>("details");

  const { data: categoryList} = useFetch<string[]>( "https://dummyjson.com/products/category-list", );

  const images = [
    product.images[0] || UniversalImg,
    product.images[1] || UniversalImg,
    product.images[2] || UniversalImg,
  ];

  const menuItems: ProductMenuItem[] = [
    {
      id: "details",
      title: "General information",
      description: "Edit basic product information",
      icon: <LuInfo size={26} color="var(--color-primary-dark)" />,
    },
    {
      id: "dimensions",
      title: "Product Dimensions",
      description: "Edit size and weight",
      icon: <LuRuler size={26} color="var(--color-primary-dark)" />,
    },
    {
      id: "meta",
      title: "Product Meta",
      description: "View system product information",
      icon: <LuHash size={26} color="var(--color-primary-dark)" />,
    },
    {
      id: "reviews",
      title: "Customer Reviews",
      description: "Read what customers are saying",
      icon: <LuMessageSquare size={26} color="var(--color-primary-dark)" />,
    },
  ];

  const aviability = [
    {
      value: 'In Stock',
      label: 'In Stock',
    },
    {
      value: 'Low Stock',
      label: 'Low Stock'
    },
    {
      value: 'Out Of Stock',
      label: 'Out Of Stock'
    }
  ]

  const handleSave = async () => {
  try {
    const response = await fetch(`https://dummyjson.com/products/${product.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: editData.title,
        description: editData.description,
        price: editData.price,
        discountPercentage: editData.discountPercentage,
        stock: editData.stock,
        brand: editData.brand,
        category: editData.category,
        availabilityStatus: editData.availabilityStatus,
        //weight: editData.weight,
      }),
    });
    if (!response.ok) throw new Error("Failed to save product");
    alert("Product saved successfully!");
    //navigate(`/products/${product.id}`);
  } catch (error) {
    console.error("Error saving product:", error);
    alert("Saving product failed.");
  }
};

const SetTitle = (title: string) => { setEditData(prev => prev ? ({...prev, title}) : prev);}
const SetSku = (sku: string) => { setEditData(prev => prev ? ({...prev, sku}) : prev);}
const SetAvailableQuantity = (stock: number) => { setEditData(prev => prev ? ({...prev, stock}) : prev);}
const SetPrice = (price: number) => {setEditData(prev => prev ? ({...prev, price}): prev)};
const SetDiscount = (discountPercentage: number) => {setEditData(prev => prev ? ({...prev, discountPercentage}): prev)};
const SetCategory = (category: string) => {setEditData(prev => prev ? ({...prev, category}): prev)};
const SetBrand = (brand: string) => {setEditData(prev => prev ? ({...prev, brand}): prev)};
const SetAviabilityStatus = (availabilityStatus: string) => {setEditData(prev => prev ? ({...prev, availabilityStatus}): prev)};
const SetMinimumOrderQuantity = (minimumOrderQuantity: number) => {setEditData(prev => prev ? ({...prev, minimumOrderQuantity}): prev)};
const SetDescription = (description: string) => {setEditData(prev => prev ? ({...prev, description}): prev)};
const SetReturnPolicy = (returnPolicy: string) => {setEditData(prev => prev ? ({...prev, returnPolicy}): prev)};


  const handleDeleteProduct = async () => {
    try {
      const response = await fetch(
        `https://dummyjson.com/products/${product.id}`,
        {
          method: "DELETE",
        },
      );

      if (!response.ok) {
        throw new Error("Failed to delete product");
      }

      const deletedProduct = await response.json();

      alert(
        `Product ${deletedProduct.title}, id: ${deletedProduct.id} was deleted`,
      );
      navigate("/products");
    } catch (error) {
      console.error("Error deleting product:", error);
      alert("Deleting product failed.");
    }
  };

  return (
    <div  style={{display: 'flex', flexDirection: 'column', gap: '25px', minHeight: '100vh', }}>
      <div style={{margin: '25px 25px 0', }}>
        <Header title={product.title} userName="AV" />
      </div>

      <div className="product-edit">
        <div className="product-content">
          {isLoading && <LoadingSpinner />}
          <div className="img-slider">
            {images.map((imgSrc, index) => (
                <div key={index} className="img-slider-item">
                  <div><img src={imgSrc} alt={`${product.title} image ${index + 1}`} /></div>
                  <div className="img-slider-actions-edit"><PiPencilSimpleLight size={16} color="var(--color-primary-dark)" /></div>
                  <div className="img-slider-actions-replace">Replace image</div>
                </div>
            ))}
          </div>
          <div className="product-info">
            {activeTab === "details" && (
              <div className="product-info-details">
                <div>
                  <h2 style={{margin: 0}}>General information</h2>
                  <span>Main editable information for the product catalog.</span>
                </div>
                <Box sx={{ width: '100%', }}>
                  <FormLabel htmlFor="product-name" sx={{ display: "block", mb: 0.5 }}>Product name</FormLabel>
                  <TextField id="product-name" fullWidth hiddenLabel size="small" value={editData?.title || ""} 
                    onChange={(e) => SetTitle(e.target.value)}
                  />
                </Box>
                <Stack direction={{ xs: 'column', sm: 'row' }}  spacing={{xs: 1, sm: 2}}>
                  <Box sx={{ width: '100%', }}>
                    <FormLabel htmlFor="sku" sx={{ display: "block", mb: 0.5 }}>SKU</FormLabel>
                    <TextField id="sku" fullWidth hiddenLabel size="small" value={editData?.sku || ""} 
                      onChange={(e) => SetSku(e.target.value)}
                    />
                  </Box>
                  <Box sx={{ width: '100%', }}>
                    <FormLabel htmlFor="available-quantity" sx={{ display: "block", mb: 0.5 }}>Available quantity</FormLabel>
                    <TextField id="available-quantity" type='number' fullWidth hiddenLabel size="small" value={editData?.stock || ""} 
                      onChange={(e) => SetAvailableQuantity(Number(e.target.value))}
                    />
                  </Box>
                </Stack>
                 <Stack direction={{ xs: 'column', sm: 'row' }}  spacing={{xs: 1, sm: 2}}>
                  <Box sx={{ width: '100%', }}>
                    <FormLabel htmlFor="price" sx={{ display: "block", mb: 0.5 }}>Price</FormLabel>
                    <TextField id="price" type='number' fullWidth hiddenLabel size="small" value={editData?.price || ""} 
                      onChange={(e) => SetPrice(Number(e.target.value))}
                      slotProps={{input: {endAdornment: <InputAdornment position="end">€</InputAdornment>,},}}
                    />
                  </Box>
                  <Box sx={{ width: '100%', }}>
                    <FormLabel htmlFor="discount" sx={{ display: "block", mb: 0.5 }}>Discount</FormLabel>
                    <TextField id="discount" type='number' fullWidth hiddenLabel size="small" value={editData?.discountPercentage || ""} 
                      onChange={(e) => SetDiscount(Number(e.target.value))}
                      slotProps={{input: {endAdornment: <InputAdornment position="end">%</InputAdornment>,}}}
                    />
                  </Box>

                </Stack>
                <Stack direction={{ xs: 'column', sm: 'row' }}  spacing={{xs: 1, sm: 2}}>
                  <Box sx={{ width: '100%', }}>
                    <FormLabel htmlFor="category"  sx={{ display: "block", mb: 0.5 }}>Category</FormLabel>
                    <TextField id="category" select label="Select" defaultValue={editData?.category || ""} fullWidth hiddenLabel size="small" 
                      onChange={(e) => SetCategory(e.target.value)}
                    >
                        {categoryList?.map((option) => (
                          <MenuItem key={option} value={option}>
                            {option}
                          </MenuItem>
                        ))}
                    </TextField>
                  </Box>
                  <Box sx={{ width: '100%', }}>
                    <FormLabel htmlFor="brand" sx={{ display: "block", mb: 0.5 }}>Brand</FormLabel>
                    <TextField id="brand" fullWidth hiddenLabel size="small" value={editData?.brand || ""} 
                      onChange={(e) => SetBrand(e.target.value)}
                    />
                  </Box>
                </Stack>
                <Stack direction={{ xs: 'column', sm: 'row' }}  spacing={{xs: 1, sm: 2}}>
                  <Box sx={{ width: '100%', }}>
                    <FormLabel htmlFor="aviability"  sx={{ display: "block", mb: 0.5 }}>Aviability Status</FormLabel>
                    <TextField id="aviability" select label="Select" defaultValue={editData?.availabilityStatus || ""} fullWidth hiddenLabel size="small" 
                      onChange={(e) => SetAviabilityStatus(e.target.value)}
                    >
                        {aviability?.map((option) => (
                          <MenuItem key={option.value} value={option.value}>
                            {option.label}
                          </MenuItem>
                        ))}
                    </TextField>
                  </Box>
                  <Box sx={{ width: '100%', }}>
                    <FormLabel htmlFor="minimum-order-quantity" sx={{ display: "block", mb: 0.5 }}>Minimum Order Quantity</FormLabel>
                    <TextField id="minimum-order-quantity" type='number' fullWidth hiddenLabel size="small" value={editData?.minimumOrderQuantity || ""} 
                      onChange={(e) => SetMinimumOrderQuantity(Number(e.target.value))}
                    />
                  </Box>
                </Stack>
                <Box sx={{ width: '100%', }}>
                  <FormLabel htmlFor="description" sx={{ display: "block", mb: 0.5 }}>Description</FormLabel>
                  <TextField id="product-name" fullWidth hiddenLabel multiline={true} minRows={2} maxRows={10}  size="small" value={editData?.description || ""} 
                    onChange={(e) => SetDescription(e.target.value)}
                    sx={{ "& textarea": { resize: "vertical", }, }}
                  />
                </Box>
                <Box sx={{ width: '100%', }}>
                  <FormLabel htmlFor="return-policy" sx={{ display: "block", mb: 0.5 }}>Return Policy</FormLabel>
                  <TextField id="return-policy" fullWidth hiddenLabel size="small" value={editData?.returnPolicy || ""} 
                    onChange={(e) => SetReturnPolicy(e.target.value)}
                  />
                </Box>
              </div>
            )}
            {activeTab === "dimensions" && (
              <div className="product-info-dimensions">
                <div>
                  <h2 style={{margin: 0}}>Product Dimensions</h2>
                  <span>Physical size and weight of the product.</span>
                </div>
              </div>
            )}
            {activeTab === "meta" && (
              <div className="product-info-meta">
               <div>
                 <h2 style={{margin: 0}}>Product Meta</h2>
                 <span>System information is shown as read-only data.</span>
               </div>
               
              </div>
            )}
            {activeTab === "reviews" && (
              <div className="product-info-reviews">
                <div>
                  <h2 style={{margin: 0}}>Customer Reviews</h2>
                  <span>Reviews are displayed for context only.</span>
                </div>

              </div>
            )}
          </div>
          <div className="product-content-footer">
            <button
              type="button"
              className="product-content-footer-btn primary"
              onClick={handleSave}
            >
              <LuSave color="#fff" size={20} />
              <span style={{ marginLeft: "5px" }}>Save changes</span>
            </button>
            <button
              type="button"
              className="product-content-footer-btn secondary"
              onClick={() => navigate(`/products/${product.id}`)}
            >
              Cancel
            </button>
          </div>
        </div>
        <ProductSideMenu
          activeTab={activeTab}
          items={menuItems}
          onTabChange={setActiveTab}
          onDeactivate={handleDeleteProduct}
        />
      </div>
    </div>
  );
};

export const productEditLoader = async ({ params }: LoaderFunctionArgs) => {
  if (!params.id) throw new Error("Missing product id");
  const res = await fetch("https://dummyjson.com/products/" + params.id);
  if (!res.ok) throw Error("Could not find that product");
  return res.json();
};
