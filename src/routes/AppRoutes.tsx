
import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";

import Layout from "../components/Layout";
import ProtectedRoute from "./ProtectedRoute";

const Products = lazy(() => import("../pages/Products"));
const ProductDetails = lazy(
    () => import("../pages/ProductDetails")
);
const Login = lazy(() => import("../pages/Login"));
const Cart = lazy(() => import("../pages/Cart"));
const Checkout = lazy(() => import("../pages/Checkout"));
const Orders = lazy(() => import("../pages/Orders"));
const OrderDetails = lazy(
    () => import("../pages/OrderDetails")
);
const Profile = lazy(() => import("../pages/Profile"));
const NotFound = lazy(() => import("../pages/NotFound"));

export default function AppRoutes() {
    return (
        <Suspense
            fallback={
                <div
                    role="status"
                    aria-live="polite"
                    className="mx-auto max-w-7xl px-6 py-12 text-center text-slate-600"
                >
                    Loading page...
                </div>
            }
        >
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
                            path="/orders/:id"
                            element={<OrderDetails />}
                        />

                        <Route
                            path="/profile"
                            element={<Profile />}
                        />
                    </Route>

                    <Route path="*" element={<NotFound />} />
                </Route>
            </Routes>
        </Suspense>
    );
}
