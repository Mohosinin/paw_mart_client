import { createBrowserRouter } from "react-router";
import MainLayout from "../layouts/MainLayout";
import DashboardLayout from "../layouts/DashboardLayout";
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
import AdminRoute from "./AdminRoute";
import ErrorPage from "../pages/ErrorPage/ErrorPage";
import UpdateListing from "../pages/UpdateListing/UpdateListing";
import About from "../pages/About/About";
import Contact from "../pages/Contact/Contact";
import FAQ from "../pages/FAQ/FAQ";
import DashboardOverview from "../pages/Dashboard/DashboardOverview";
import Profile from "../pages/Dashboard/Profile";
import AdminOverview from "../pages/Dashboard/AdminOverview";
import ManageUsers from "../pages/Dashboard/ManageUsers";
import AllOrders from "../pages/Dashboard/AllOrders";

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
        element: <ListingDetails />,
        loader: ({params}) => fetch(`${import.meta.env.VITE_API_URL}/listings/${params.id}`)
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/contact",
        element: <Contact />,
      },
      {
        path: "/faq",
        element: <FAQ />,
      },
      // Legacy routes (for backward compatibility)
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
  // Dashboard Routes
  {
    path: "/dashboard",
    element: <PrivateRoute><DashboardLayout /></PrivateRoute>,
    errorElement: <ErrorPage />,
    children: [
      // User Routes (accessible by all logged-in users)
      {
        index: true,
        element: <DashboardOverview />,
      },
      {
        path: "profile",
        element: <Profile />,
      },
      {
        path: "my-orders",
        element: <MyOrders />,
      },
      // Seller Routes (accessible by sellers and admins)
      {
        path: "my-listings",
        element: <MyListings />,
      },
      {
        path: "add-listing",
        element: <AddListing />,
      },
      {
        path: "update-listing/:id",
        element: <UpdateListing />,
        loader: ({params}) => fetch(`${import.meta.env.VITE_API_URL}/listings/${params.id}`)
      },
      // Admin Routes (accessible by admins only)
      {
        path: "admin",
        element: <AdminRoute><AdminOverview /></AdminRoute>,
      },
      {
        path: "manage-users",
        element: <AdminRoute><ManageUsers /></AdminRoute>,
      },
      {
        path: "all-orders",
        element: <AdminRoute><AllOrders /></AdminRoute>,
      },
    ],
  },
]);

export default router;
