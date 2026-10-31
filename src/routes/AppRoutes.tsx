
import { Routes, Route } from "react-router-dom";

import Layout from "../components/Layout";
import Products from "../pages/Products";
import ProductDetails from "../pages/ProductDetails";
import Login from "../pages/Login";
import Cart from "../pages/Cart";
import Checkout from "../pages/Checkout";
import Orders from "../pages/Orders";
import Profile from "../pages/Profile";
import NotFound from "../pages/NotFound";

import ProtectedRoute from "./ProtectedRoute";

export default function AppRoutes() {
    return (
        <Routes>
            <Route element={<Layout />}>
                <Route path="/" element={<Products />} />
                <Route path="/products" element={<Products />} />
                <Route
                    path="/products/:id"
                    element={<ProductDetails />}
                />
                <Route path="/login" element={<Login />} />
                <Route path="/cart" element={<Cart />} />

                <Route element={<ProtectedRoute />}>
                    <Route
                        path="/checkout"
                        element={<Checkout />}
                    />
                    <Route
                        path="/orders"
                        element={<Orders />}
                    />
                    <Route
                        path="/profile"
                        element={<Profile />}
                    />
                </Route>

                <Route path="*" element={<NotFound />} />
            </Route>
        </Routes>
    );
}
