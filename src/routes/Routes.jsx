import { createBrowserRouter } from "react-router";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import PetsSupplies from "../pages/PetsSupplies/PetsSupplies";
import CategoryFilteredProduct from "../pages/CategoryFilteredProduct/CategoryFilteredProduct";
import ListingDetails from "../pages/ListingDetails/ListingDetails";
import AddListing from "../pages/AddListing/AddListing";
import MyListings from "../pages/MyListings/MyListings";
import MyOrders from "../pages/MyOrders/MyOrders";
import PrivateRoute from "./PrivateRoute";
import ErrorPage from "../pages/ErrorPage/ErrorPage";
import UpdateListing from "../pages/UpdateListing/UpdateListing";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [

      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/pets-supplies",
        element: <PetsSupplies />,
      },
      {
        path: "/category-filtered-product/:categoryName",
        element: <CategoryFilteredProduct />,
      },
      {
        path: "/listings/:id",
        element: <PrivateRoute><ListingDetails /></PrivateRoute>,
        loader: ({params}) => fetch(`${import.meta.env.VITE_API_URL}/listings/${params.id}`)
      },
      {
        path: "/add-listing",
        element: <PrivateRoute><AddListing /></PrivateRoute>,
      },
      {
        path: "/my-listings",
        element: <PrivateRoute><MyListings /></PrivateRoute>,
      },
      {
        path: "/my-orders",
        element: <PrivateRoute><MyOrders /></PrivateRoute>,
      },
      {
        path: "/update-listing/:id",
        element: <PrivateRoute><UpdateListing /></PrivateRoute>,
        loader: ({params}) => fetch(`${import.meta.env.VITE_API_URL}/listings/${params.id}`)
      }
    ],

  },
]);

export default router;
