import {lazy, Suspense} from "react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider, 
} from "react-router";
import { MenuProvider } from "@/context/MenuContext";
import RootLayout from "@/layouts/RootLayout";
import SupportLayout from "@/layouts/SupportLayout";
import { productDetailLoader } from "@/app/pages/products/ProductDetail";
import "./App.scss";
import LoadingSpinner from "@/components/LoadingSpinner"; 

const HomePage = lazy(() => import('@/app/pages/HomePage'));
const Product = lazy(() => import('@/app/pages/products/Products'));
const ProductDetail = lazy(() => import('@/app/pages/products/ProductDetail').then(module => ({ default: module.ProductDetail })));
const ProductError = lazy(() => import('@/app/pages/products/ProductError'));
const Contact = lazy(() => import('@/app/pages/support/Contact'));
const ContactForm = lazy(() => import('@/app/pages/support/ContactForm'));
const Faq = lazy(() => import('@/app/pages/support/Faq'));
const NotFound = lazy(() => import('@/app/NotFound'));

const LoadingFallback = () => <LoadingSpinner size='large' loading={true}/>;

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
      <Route index element={<Suspense fallback={<LoadingFallback />}><HomePage /></Suspense>} />
      <Route path="products" element={<Suspense fallback={<LoadingFallback />}><Product /></Suspense> } />
      <Route path="products/:id" element={<Suspense fallback={<LoadingFallback />}><ProductDetail /></Suspense>} loader={productDetailLoader} errorElement={<Suspense fallback={<LoadingFallback />}><ProductError /></Suspense>} />

      <Route path="support" element={<SupportLayout/>}>
        <Route index element={<Suspense fallback={<LoadingFallback />}><Faq/></Suspense>}></Route>
        <Route path="faq" element={<Suspense fallback={<LoadingFallback />}><Faq/></Suspense>}></Route>
        <Route path="contact" element={<Suspense fallback={<LoadingFallback />}><Contact/></Suspense>}></Route>
        <Route path="contactForm" element={<Suspense fallback={<LoadingFallback />} ><ContactForm/></Suspense>}></Route>
      </Route>

      <Route path="*" element={<NotFound/>}></Route>
    </Route>
  ),
  { basename: import.meta.env.VITE_URL_BASE }
);

const App = () => {
  return (
    <MenuProvider>
      <RouterProvider router={router} />
    </MenuProvider>
  )
};

export default App;
