import {
  createBrowserRouter,
  RouterProvider,
} from "react-router";
import { MenuProvider } from "@/context/MenuContext";
import RootLayout from "@/layouts/RootLayout";
import SupportLayout from "@/layouts/SupportLayout";
import NotFound from "@/app/NotFound";
import "./App.scss";

const router = createBrowserRouter(
  [
    {
      path: "/",
      Component: RootLayout,
      children: [
        {
          index: true,
          lazy: async () => {
            const module = await import("@/app/pages/HomePage");
            return { Component: module.default };
          },
        },
        {
          path: "products",
          children: [
            {
              index: true,
              lazy: async () => {
                const module = await import("@/app/pages/products/Products");
                return { Component: module.default };
              },
            },
            {
              path: ":id",
              lazy: async () => {
                const module = await import("@/app/pages/products/ProductDetail");
                return {
                  Component: module.ProductDetail,
                  loader: module.productDetailLoader,
                };
              },
              errorElement: <div>Product detail error</div>,
            },
            {
              path: ":id/edit",
              lazy: async () => {
                const module = await import("@/app/pages/products/ProductEdit");
                return { 
                  Component: module.ProductEdit,
                  loader: module.productEditLoader 
                };
              },
            },
          ],
        },
        {
          path: "support",
          Component: SupportLayout,
          children: [
            {
              index: true,
              lazy: async () => {
                const module = await import("@/app/pages/support/Faq");
                return { Component: module.default };
              },
            },
            {
              path: "faq",
              lazy: async () => {
                const module = await import("@/app/pages/support/Faq");
                return { Component: module.default };
              },
            },
            {
              path: "contact",
              lazy: async () => {
                const module = await import("@/app/pages/support/Contact");
                return { Component: module.default };
              },
            },
            {
              path: "contactForm",
              lazy: async () => {
                const module = await import("@/app/pages/support/ContactForm");
                return { Component: module.default };
              },
            },
          ],
        },
        {
          path: "*",
          Component: NotFound,
        },
      ],
    },
  ],
  { basename: import.meta.env.VITE_URL_BASE }
);

const App = () => {
  return (
    <MenuProvider>
      <RouterProvider router={router} />
    </MenuProvider>
  );
};

export default App;
