import {useState} from 'react'
import { Header } from '@/components/Header'
import { useLoaderData, LoaderFunctionArgs, useNavigate } from "react-router";
import { ProductDetailData } from '@/types/product';
import UniversalImg from '@/assets/univesral-image.jpg';
import { LuInfo, LuMessageSquare, LuRuler, LuHash, LuTrash2, LuSave } from "react-icons/lu";

import "./ProductDetail.scss";

export const ProductEdit = () => {
  const [activeTab, setActiveTab] = useState< "details" | "reviews" | "dimensions" | "meta">("details");
  const navigate = useNavigate();
  const product = useLoaderData() as ProductDetailData;

  const images = [
    product.images[0] || UniversalImg,
    product.images[1] || UniversalImg,
    product.images[2] || UniversalImg,
  ]

   const handleDeleteProduct = async () => {
  try {
    const response = await fetch(`https://dummyjson.com/products/${product.id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error("Failed to delete product");
    }

    const deletedProduct = await response.json();

    alert(`Product ${deletedProduct.title}, id: ${deletedProduct.id} was deleted`);
    navigate('/products');
  } catch (error) {
    console.error("Error deleting product:", error);
    alert("Deleting product failed.");
  }
};


  return (
    <div className="page-container">
        <Header title={`Edit product: ${product.title}`} userName="AV"></Header>

        <div className="product-detail">
                <div className="product-content">
                  <div className="img-slider">
                    {images.map((imgSrc, index) => (
                      <div key={index}><img src={imgSrc} alt={`${product.title} image ${index + 1}`} /></div>
                    ))}
                   
                  </div>
                  <div className="product-info">
                    {activeTab === "details" && (
                      <div>
                        <h2>General information</h2>
                        <div className="product-info-section">
                          <div>Product name</div>
                          <div><strong>{product.title}</strong></div>
                        </div>

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
                      <div className="reviews-section">
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
                      <LuSave color='#fff' size={20}/>
                      <span style={{marginLeft:'5px'}}>Save</span>
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
                <div className="product-menu">
                  <div className="product-menu-items">
                    <div className={activeTab === "details" ? "active" : ""} onClick={() => setActiveTab("details")}>
                      <div><LuInfo size={26} color="var(--color-primary-dark)"/></div>
                      <div>
                        <div><strong>General information</strong></div>
                        <div style={{ color: activeTab === "details" ? "#1b2a3f" : "#666", }}>Edit basic product information</div>
                      </div>
                    </div>
                    <div className={activeTab === "dimensions" ? "active" : ""} onClick={() => setActiveTab("dimensions")}>
                      <div><LuRuler size={26} color="var(--color-primary-dark)"/></div>
                      <div>
                        <div><strong>Product Dimensions</strong></div>
                        <div style={{ color: activeTab === "dimensions" ? "#1b2a3f" : "#666" }}>Edit size and weight</div>
                      </div>
                    </div>
                    <div className={activeTab === "meta" ? "active" : ""} onClick={() => setActiveTab("meta")}>
                      <div><LuHash size={26} color="var(--color-primary-dark)" /></div>
                      <div>
                        <div><strong>Product Meta</strong></div>
                        <div style={{ color: activeTab === "meta" ? "#1b2a3f" : "#666" }}>View system product information</div>
                      </div>
                    </div>
                    <div className={activeTab === "reviews" ? "active" : ""} onClick={() => setActiveTab("reviews")}>
                      <div><LuMessageSquare size={26} color="var(--color-primary-dark)"/></div>
                      <div>
                        <div><strong>Customer Reviews</strong></div>
                        <div style={{ color: activeTab === "reviews" ? "#1b2a3f" : "#666" }}>Read what customers are saying</div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="product-menu-footer" onClick={handleDeleteProduct}>
                    <div >
                      <div><LuTrash2 size={26} color="#283455"/></div>
                      <div>
                        <div><strong>Deactivate product</strong></div>
                        <div style={{ color: activeTab === "details" ? "#1b2a3f" : "#666" }}>Remove product from the catalog</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
       
    </div>
  )
}

export const productEditLoader = async ({ params }: LoaderFunctionArgs) => {
  if (!params.id) throw new Error("Missing product id");
  const res = await fetch("https://dummyjson.com/products/" + params.id);
  if (!res.ok) throw Error("Could not find that product");
  return res.json();
};
