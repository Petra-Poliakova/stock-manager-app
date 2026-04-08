import { type LoaderFunctionArgs, useLoaderData } from "react-router";

import { FaInfoCircle } from "react-icons/fa";

import "./ProductDetail.scss";

interface DataType {
  id: number;
  title: string;
  description: string;
  brand: string;
  category: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  thumbnail: string;
  images: string[];
}

export const ProductDetail = () => {
  const productId = useLoaderData() as DataType;

  return (
    <div className="page-container">
      <h1>Product detail</h1>
      <div className="productDetailContainer">
        <div className="iconArea">
          <FaInfoCircle color={"#202e44"} size={24} />
        </div>
        <div className="detailBox">
          <div className="detailImgBox">
            <h2>Title: {productId.title}</h2>
            <p>
              <img src={productId.thumbnail} alt="product" />
            </p>
          </div>
          <div className="detailTextBox">
            <div className="text">
              <p>
                <b>Id: </b>
                {productId.id}
              </p>
              <p>
                <b>Category: </b> {productId.category}
              </p>
              <p>
                <b>Brand: </b> {productId.brand}
              </p>
            </div>

            <div className="text">
              <p>
                <b>Price: </b>
                {productId.price}€
              </p>
              <p>
                <b>Stock: </b> {productId.stock}pcs
              </p>
              <p>
                <b>Discount: </b> {productId.discountPercentage}%
              </p>
            </div>

            <div>
              <p>
                <b>Description: </b>
              </p>
              <p>{productId.description}</p>
            </div>
          </div>
        </div>

        <div className="iconArea">
          {/* <FaAngleDown color={"#202e44"} size={24} /> */}
        </div>
        {/* <div>
          <p>
            <b>Description: </b>
          </p>
          <p>{productId.description}</p>
        </div> */}
      </div>
    </div>
  );
};

export const ProductDetailLoader = async ({ params }: LoaderFunctionArgs) => {
  if (!params.id) {
    throw new Error("Missing product id");
  }

  const res = await fetch("https://dummyjson.com/products/" + params.id);

  if (!res.ok) {
    throw Error("Could not find that product");
  }

  return res.json();
};

//https://www.nerdwallet.com/best/investing/stock-apps
