import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/home/Home";
import Category from "../pages/category/Category";
import Search from "../pages/search/Search";
import Shop from "../pages/shop/Shop";
import Product from "../pages/shop/productDetails/Product";
import Login from "@/components/Login";
import Register from "@/components/Register";
import ResetPassword from "@/components/ResetPassword";
import ForgotPassword from "@/components/ForgotPassword";
import AdminLayout from "@/admin/AdminLayout";
import Products from "@/admin/pages/Products";
import Dashboard from "@/admin/pages/Dashboard";
import UsersPage from "@/admin/pages/Users";
import SalesPage from "@/admin/pages/Sales";
import OrdersPage from "@/admin/pages/Orders";
import AnalyticsPage from "@/admin/pages/Analytics";
import ProfilePage from "@/admin/pages/Profile";
import PlaceOrder from "@/pages/checkout/PlaceOrder";
import Orders from "@/pages/orders/Orders";
import OrderDetails from "@/pages/orders/OrderDetails";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/categories/:categoryName",
        element: <Category />,
      },
      {
        path: "/search",
        element: <Search />,
      },
      {
        path: "/shop",
        element: <Shop />,
      },
      {
        path: "/shop/:productId",
        element: <Product />,
      },
      {
        path: "/place-order",
        element: <PlaceOrder />,
      },
      {
        path: "/orders",
        element: <Orders />,
      },
      {
        path: "/orders/:orderId",
        element: <OrderDetails />,
      },
    ],
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
    path: "/forgot-password",
    element: <ForgotPassword />,
  },
  {
    path: "/reset-password",
    element: <ResetPassword />,
  },
  {
    path: "/profile",
    element: <ProfilePage />,
  },
  {
    path: "/admin",
    element: <AdminLayout />,
    children: [
      {
        path: "dashboard",
        element: <Dashboard />
      },
      {
        path: "products",
        element: <Products />,
      },
      {
        path: "users",
        element: <UsersPage />,
      },
      {
        path: "sales",
        element: <SalesPage />,
      },
      {
        path: "orders",
        element: <OrdersPage />,
      },
      {
        path: "analytics",
        element: <AnalyticsPage />,
      },
      {
        path: "profile",
        element: <ProfilePage />,
      },
    ]
    }
]);

export default router;
