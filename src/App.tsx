import React, {lazy, Suspense} from "react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider, 
} from "react-router-dom";
import RootLayout from "./app/layouts/RootLayout";
import SupportLayout from "./app/layouts/SupportLayout";
import { productDetailLoader } from "./app/pages/products/ProductDetail";
import "./styles/globalStyle.scss";
import LoadingSpinner from "./app/components/LoadingSpinner"; 

const HomePage = lazy(() => import('./app/pages/HomePage'));
const Product = lazy(() => import('./app/pages/products/Products'));
const ProductDetail = lazy(() => import('./app/pages/products/ProductDetail'));
const ProductError = lazy(() => import('./app/pages/products/ProductError'));
const Contact = lazy(() => import('./app/pages/support/Contact'));
const ContactForm = lazy(() => import('./app/pages/support/ContactForm'));
const NotFound = lazy(() => import('./app/NotFound'));

const LoadingFallback = () => <LoadingSpinner size='large' loading={true}/>;

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
      <Route index element={<Suspense fallback={<LoadingFallback />}><HomePage /></Suspense>} />
      <Route path="products" element={<Suspense fallback={<LoadingFallback />}><Product /></Suspense> } />
      <Route path="products/:id" element={<Suspense fallback={<LoadingFallback />}><ProductDetail /></Suspense>} loader={productDetailLoader} errorElement={<Suspense fallback={<LoadingFallback />}><ProductError /></Suspense>} />

      <Route path="support" element={<SupportLayout/>}>
        <Route path="contact" element={<Suspense fallback={<LoadingFallback />}><Contact/></Suspense>}></Route>
        <Route path="contactForm" element={<Suspense fallback={<LoadingFallback />} ><ContactForm/></Suspense>}></Route>
      </Route>

      <Route path="*" element={<NotFound/>}></Route>
    </Route>
  )
);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
