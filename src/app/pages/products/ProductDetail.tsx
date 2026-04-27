import { useState } from "react";
import { useLoaderData, LoaderFunctionArgs, useNavigate } from "react-router";
import { Header } from "@/components/Header";

import UniversalImg from '../../../assets/univesral-image.jpg';
import { LuInfo, LuMessageSquare, LuRuler, LuHash, LuTrash2, LuSave } from "react-icons/lu";
import { formatDate } from "@/helpers/formatDate";

import "./ProductDetail.scss";

export interface ProductReview {
  rating: number;
  comment: string;
  date: string; // ISO dátum
  reviewerName: string;
  reviewerEmail: string;
}

export interface ProductDimensions {
  width: number;
  height: number;
  depth: number;
}

export interface ProductMeta {
  createdAt: string;
  updatedAt: string;
  barcode: string;
  qrCode: string;
}

export interface ProductDetailData {
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
  dimensions: ProductDimensions;
  warrantyInformation: string;
  shippingInformation: string;
  availabilityStatus: string;
  reviews: ProductReview[];
  returnPolicy: string;
  minimumOrderQuantity: number;
  meta: ProductMeta;
  images: string[];
  thumbnail: string;
}

export const ProductDetail = () => {
  const productId = useLoaderData() as ProductDetailData;
  const [activeTab, setActiveTab] = useState< "details" | "reviews" | "dimensions" | "meta">("details");
  const reviews = productId.reviews ?? [];
  const reviewCount = reviews.length;
  const averageRating = reviewCount
    ? reviews.reduce((sum, review) => sum + review.rating, 0) / reviewCount
    : productId.rating;
  const roundedAverageRating = Number(averageRating.toFixed(1));
  const roundedProductRating = Math.round(averageRating);
  const ratingDistribution = [5, 4, 3, 2, 1].map((star) => {
  const count = reviews.filter((review) => Math.round(review.rating) === star).length;

    return {
      star,
      count,
      percentage: reviewCount ? (count / reviewCount) * 100 : 0,
    };
  });

const navigate = useNavigate();


  const images = [
    productId.images[0] || UniversalImg,
    productId.images[1] || UniversalImg,
    productId.images[2] || UniversalImg,
  ]

 const handleDeleteProduct = async () => {
  try {
    const response = await fetch(`https://dummyjson.com/products/${productId.id}`, {
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
    <div style={{display: 'flex', flexDirection: 'column', gap: '25px', minHeight: '100vh', }} >
      <div style={{margin: '25px 25px 0', }}>
        <Header title={productId.title} userName="AV" />
      </div>
      
      <div className="product-detail">
        <div className="product-content">
          <div className="img-slider">
            {images.map((imgSrc, index) => (
              <div key={index}><img src={imgSrc} alt={`${productId.title} image ${index + 1}`} /></div>
            ))}
           
          </div>
          <div className="product-info">
            {activeTab === "details" && (
              <div>
                <h2>General information</h2>
                <div className="product-info-section">
                  <div>Product name</div>
                  <div><strong>{productId.title}</strong></div>
                </div>
                <div className="product-details-section" >
                  <div>
                    <div><div>Sku</div> <div>{productId.sku}</div> </div>
                    <div><div>Available quantity</div> <div>{productId.stock}</div></div>
                  </div>
                  <div >
                    <div> <div>Price</div> <div>{productId.price}€</div> </div>
                    <div><div>Discount</div> <div>{productId.discountPercentage}%</div></div>
                  </div>
                  <div >
                    <div> <div>Category</div> <div>{productId.category}</div> </div>
                    <div><div>Brand</div> <div>{productId.brand}</div></div>
                  </div>
                </div>
                <div className="product-info-section" style={{marginTop: '15px'}} >
                  <div>Description</div>
                  <div>{productId.description}</div>
                </div>
              </div>
            )}
            {activeTab === "dimensions" && (
              <div>
                <h2>Product Dimensions</h2>
                <div className="product-details-section" >
                  <div>
                    <div><div>Width</div> <div>{productId.dimensions.width}cm</div> </div>
                    <div ><div>Height</div> <div>{productId.dimensions.height}cm</div></div>
                  </div>
                  <div>
                    <div><div>Depth</div> <div>{productId.dimensions.depth}cm</div> </div>
                    <div ><div>Weight</div> <div>{productId.weight}g</div></div>
                  </div>
                </div>
              </div>
            )}
            {activeTab === "meta" && (
              <div>
                <h2>Product Meta</h2>
                <div className="product-details-section" >
                  <div>
                    <div><div>createdAt</div> <div>{formatDate(productId.meta.createdAt)}</div> </div>
                    <div ><div>updatedAt</div> <div>{formatDate(productId.meta.updatedAt)}</div></div>
                  </div>
                  <div>
                    <div><div>Barcode</div> <div>{productId.meta.barcode}</div> </div>
                    <div ><div>QR Code</div><div>{productId.meta.qrCode}</div></div>
                  </div>
                </div>
              </div>
            )}
            {activeTab === "reviews" && (
              <div className="reviews-section">
                <h2>Customer Reviews</h2>
                <div className="reviews-summary">
                  <div className="reviews-overview-card">
                    <div className="reviews-overview-rating">{roundedAverageRating}</div>
                    <div className="reviews-stars" aria-label={`Average rating ${roundedAverageRating} out of 5`}>
                      {Array.from({ length: 5 }, (_, index) => (
                        <span
                          key={index}
                          className={index < roundedProductRating ? "filled" : ""}
                        >
                          ★
                        </span>
                      ))}
                    </div>
                    <div className="reviews-overview-text">
                      Based on {reviewCount} {reviewCount === 1 ? "customer review" : "customer reviews"}
                    </div>
                  </div>

                  <div className="reviews-breakdown-card">
                    {ratingDistribution.map((item) => (
                      <div key={item.star} className="reviews-breakdown-row">
                        <div>{item.star} stars</div>
                        <div className="reviews-breakdown-bar">
                          <span style={{ width: `${item.percentage}%` }} />
                        </div>
                        <div>{item.count}</div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="reviews-list">
                  {reviews.map((review, index) => (
                    <div key={index} className="review-card">
                      <div className="review-card-header">
                        <div>
                          <div className="reviewer-name">{review.reviewerName}</div>
                          <div className="reviewer-email">{review.reviewerEmail}</div>
                        </div>
                        <div className="review-rating-box">
                          <div className="reviews-stars" aria-label={`Rating ${review.rating} out of 5`}>
                            {Array.from({ length: 5 }, (_, starIndex) => (
                              <span
                                key={starIndex}
                                className={starIndex < Math.round(review.rating) ? "filled" : ""}
                              >
                                ★
                              </span>
                            ))}
                          </div>
                          <div className="review-rating-meta">
                            <span>{review.rating.toFixed(1)}/5</span>
                            <span>{formatDate(review.date)}</span>
                          </div>
                        </div>
                      </div>

                      <div className="review-comment">
                        <div>Comment</div>
                        <p>{review.comment}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
          <div className="product-content-footer">
            <button
              type="button"
              className="product-content-footer-btn primary"
              onClick={() => navigate(`/products/${productId.id}/edit`)}
            >
              <LuSave color='#fff' size={20}/>
              <span style={{marginLeft:'5px'}}>Edit</span>
            </button>
            <button
              type="button"
              className="product-content-footer-btn secondary"
              onClick={() => navigate("/products")}
            >
              Close
            </button>
          </div>
        </div>
        <div className="product-menu">
          <div className="product-menu-items">
            <div className={activeTab === "details" ? "active" : ""} onClick={() => setActiveTab("details")}>
              <div><LuInfo size={26} color="var(--color-primary-dark)"/></div>
              <div>
                <div><strong>General information</strong></div>
                <div style={{ color: activeTab === "details" ? "#1b2a3f" : "#666", }}>Basic product information</div>
              </div>
            </div>
            <div className={activeTab === "dimensions" ? "active" : ""} onClick={() => setActiveTab("dimensions")}>
              <div><LuRuler size={26} color="var(--color-primary-dark)"/></div>
              <div>
                <div><strong>Product Dimensions</strong></div>
                <div style={{ color: activeTab === "dimensions" ? "#1b2a3f" : "#666" }}>View the size and weight of the product</div>
              </div>
            </div>
            <div className={activeTab === "meta" ? "active" : ""} onClick={() => setActiveTab("meta")}>
              <div><LuHash size={26} color="var(--color-primary-dark)" /></div>
              <div>
                <div><strong>Product Meta</strong></div>
                <div style={{ color: activeTab === "meta" ? "#1b2a3f" : "#666" }}>Additional product information</div>
              </div>
            </div>
            <div className={activeTab === "reviews" ? "active" : ""} onClick={() => setActiveTab("reviews")}>
              <div><LuMessageSquare size={26} color="var(--color-primary-dark)"/></div>
              <div>
                <div><strong>Customer Reviews</strong></div>
                <div style={{ color: activeTab === "reviews" ? "#1b2a3f" : "#666" }}>Read what our customers are saying</div>
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
  );
};

export const productDetailLoader = async ({ params }: LoaderFunctionArgs) => {
  if (!params.id) throw new Error("Missing product id");
  const res = await fetch("https://dummyjson.com/products/" + params.id);
  if (!res.ok) throw Error("Could not find that product");
  return res.json();
};

//https://www.nerdwallet.com/best/investing/stock-apps
