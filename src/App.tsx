import React, {lazy, Suspense} from "react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider, 
} from "react-router-dom";
import Contact from "./app/pages/support/Contact";
import ContactForm from "./app/pages/support/ContactForm";
import RootLayout from "./app/layouts/RootLayout";
import SupportLayout from "./app/layouts/SupportLayout";
import ProductDetail from "./app/pages/products/ProductDetail";
import { productDetailLoader } from "./app/pages/products/ProductDetail";
import ProductError from "./app/pages/products/ProductError";

import NotFound from "./app/NotFound";

import "./styles/globalStyle.scss";

const HomePage = lazy(() => import('./app/pages/HomePage'));
const Product = lazy(() => import('./app/pages/products/Products'));



const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
      <Route index element={<Suspense fallback='Loading...'><HomePage /></Suspense>} />
      <Route path="products" element={<Suspense fallback='Loading...'><Product /></Suspense> } />
      <Route path="products/:id" element={<ProductDetail /> } loader={productDetailLoader} errorElement={<ProductError/>}/>

      <Route path="support" element={<SupportLayout/>}>
        <Route path="contact" element={<Contact/>}></Route>
        <Route path="contactForm" element={<ContactForm/>}></Route>
      </Route>

      <Route path="*" element={<NotFound/>}></Route>
    </Route>
  )
);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
