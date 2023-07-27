import React from "react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import HomePage from "./app/pages/HomePage";
import OverviewProducts from "./app/pages/OverviewProducts";
import NavBar from "./app/components/NavBar";

import "./styles/globalStyle.scss";

// const router = createBrowserRouter([
//       {
//         path: "/",
//         element: <HomePage/>,
//       },
//       {
//         path: "/OverviewProducts",
//         element: <OverviewProducts/>
//       }
//     ]);
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<NavBar />}>
      <Route index element={<HomePage />} />
      <Route path="overview" element={<OverviewProducts />} />
    </Route>
  )
);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
