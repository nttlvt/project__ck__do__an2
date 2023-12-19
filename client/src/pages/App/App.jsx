import { useRoutes, BrowserRouter, Outlet, Navigate } from "react-router-dom";
import { Context, ShoppingCartProvider } from "../../context";
import { Toaster } from "react-hot-toast";
import {
  HomePage,
  NotFound,
  MyOrders,
  DetailProduct,
  CartShoppingPage,
  OrderPage,
  Signin as SigninClient,
  Account,
} from "../";
import "./App.css";
import ClientLayout from "../../layout/ClientLayout";
import Home from "../Admin/Home";
import Products from "../Admin/Product";
import EditProductPage from "../Admin/products/Edit";
import NewProduct from "../Admin/products/New";
import Category from "../Admin/Category";
import Signin from "../Admin/Signin";
import LoadingScreen from "../../components/LoadingScreen";
import Order from "../Admin/Order";
import { useContext } from "react";

function AllAccess() {
  return <Outlet />;
}
function RejectRoute() {
  const context = useContext(Context);
  return !context.profile ? <Outlet /> : <Navigate to="/" />;
}
function ProtectRoute() {
  const context = useContext(Context);
  return context.profile ? <Outlet /> : <Navigate to="/sign-in" />;
}

function AdminRoute() {
  const context = useContext(Context);
  return context.profile.role === "admin" ? <Outlet /> : <Navigate to="/" />;
}

const AppRoutes = () => {
  let routes = useRoutes([
    {
      path: "",
      element: <AllAccess />,
      children: [
        {
          path: "",
          element: <ClientLayout />,
          children: [
            { path: "/", element: <HomePage /> },
            { path: "/laptops", element: <HomePage /> },
            { path: "/tablets", element: <HomePage /> },
            { path: "/cameras", element: <HomePage /> },
            { path: "/headphones", element: <HomePage /> },
            { path: "/cellphones", element: <HomePage /> },
            { path: "/accessories", element: <HomePage /> },
            { path: "/cart-shopping", element: <CartShoppingPage /> },
            { path: "/*", element: <NotFound /> },
            { path: "/product/:id", element: <DetailProduct /> },
          ],
        },
      ],
    },
    {
      path: "",
      element: <ProtectRoute />,
      children: [
        {
          path: "",
          element: <ClientLayout />,
          children: [
            { path: "/account", element: <Account /> },
            { path: "/my-orders/:id", element: <OrderPage /> },
            { path: "/my-orders", element: <MyOrders /> },
          ],
        },
      ],
    },
    {
      path: "",
      element: <RejectRoute />,
      children: [
        {
          path: "",
          element: <ClientLayout />,
          children: [
            { path: "/sign-in", element: <SigninClient /> },
            { path: "/admin", element: <Signin /> },
          ],
        },
      ],
    },
    {
      path: "/admin",
      element: <AdminRoute />,
      children: [
        { path: "home", element: <Home /> },
        { path: "products", element: <Products /> },
        { path: "products/new", element: <NewProduct /> },
        { path: "products/edit/:id", element: <EditProductPage /> },
        { path: "categories", element: <Category /> },
        { path: "orders", element: <Order /> },
      ],
    },
  ]);

  return routes;
};

export const App = () => {
  return (
    <ShoppingCartProvider>
      <BrowserRouter>
        <Toaster />
        <AppRoutes />
        <LoadingScreen />
      </BrowserRouter>
    </ShoppingCartProvider>
  );
};
