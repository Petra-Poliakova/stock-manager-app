import { useState } from "react";
import { Header } from "@/components/Header";
import { useLoaderData, LoaderFunctionArgs, useNavigate, useNavigation } from "react-router";
import { ProductDetailData } from "@/types/product";
import UniversalImg from "@/assets/univesral-image.jpg";
import { ProductSideMenu } from "@/components/ProductSideMenu/ProductSideMenu";
import type { ProductMenuItem, ProductTab, } from "@/components/ProductSideMenu/ProductSideMenu";
import { LuInfo, LuMessageSquare, LuRuler, LuHash, LuSave} from "react-icons/lu";
import { PiPencilSimpleLight } from "react-icons/pi";
import LoadingSpinner from "@/components/LoadingSpinner";
import {Box, TextField} from '@mui/material';

import "./ProductEdit.scss";

export const ProductEdit = () => {
  const navigate = useNavigate();
  const navigation = useNavigation();
  const isLoading = navigation.state === "loading";
  const product = useLoaderData() as ProductDetailData;
  const [editData, setEditData] = useState<ProductDetailData>(product);
  const [activeTab, setActiveTab] = useState<ProductTab>("details");

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

  const handleSave = async () => {
  try {
    const response = await fetch(`https://dummyjson.com/products/${product.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: editData.title,
        //description: editData.description,
        //price: editData.price,
        //discountPercentage: editData.discountPercentage,
        //stock: editData.stock,
        //brand: editData.brand,
        //category: editData.category,
        //weight: editData.weight,
      }),
    });
    if (!response.ok) throw new Error("Failed to save product");
    alert("Product saved successfully!");
    navigate(`/products/${product.id}`);
  } catch (error) {
    console.error("Error saving product:", error);
    alert("Saving product failed.");
  }
};

const SetTitle = (title: string) => {
  setEditData(prev => prev ? ({...prev, title}) : prev);
}

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
                  <div>Product name</div>
                  <TextField fullWidth hiddenLabel id="fullWidth" size="small" value={editData?.title || ""} 
                    onChange={(e) => SetTitle(e.target.value)}
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
              <span style={{ marginLeft: "5px" }}>Save</span>
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
