import { useState } from "react";
import { Header } from "@/components/Header";
import { useLoaderData, LoaderFunctionArgs, useNavigate } from "react-router";
import { ProductDetailData } from "@/types/product";
import UniversalImg from "@/assets/univesral-image.jpg";
import { ProductSideMenu } from "@/components/ProductSideMenu/ProductSideMenu";
import type { ProductMenuItem, ProductTab, } from "@/components/ProductSideMenu/ProductSideMenu";
import { LuInfo, LuMessageSquare, LuRuler, LuHash, LuSave, } from "react-icons/lu";

import "./ProductEdit.scss";

export const ProductEdit = () => {
  const [activeTab, setActiveTab] = useState<ProductTab>("details");
  const navigate = useNavigate();
  const product = useLoaderData() as ProductDetailData;

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
          <div className="img-slider">
            {images.map((imgSrc, index) => (
              <div key={index}>
                <img src={imgSrc} alt={`${product.title} image ${index + 1}`} />
              </div>
            ))}
          </div>
          <div className="product-info">
            {activeTab === "details" && (
              <div>
                <h2>General information</h2>
              </div>
            )}
            {activeTab === "dimensions" && (
              <div>
                <h2>Product Dimensions</h2>
              </div>
            )}
            {activeTab === "meta" && (
              <div>
                <h2>Product Meta</h2>
              </div>
            )}
            {activeTab === "reviews" && (
              <div>
                <h2>Customer Reviews</h2>
              </div>
            )}
          </div>
          <div className="product-content-footer">
            <button
              type="button"
              className="product-content-footer-btn primary"
              onClick={() => navigate(`/products/${product.id}`)}
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
