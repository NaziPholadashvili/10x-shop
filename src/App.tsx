
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import { AuthProvider } from "./context/AuthContext";
import { useAuth } from "./context/useAuth";
import { CartProvider } from "./context/CartContext";
import { OrdersProvider } from "./context/OrdersContext";

import Layout from "./components/Layout";
import Home from "./pages/Home";
import Products from "./pages/Products";
import ProductDetails from "./pages/ProductDetails";
import Login from "./pages/Login";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Orders from "./pages/Orders";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";

function ProtectedCheckout() {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return (
      <Navigate
        to="/login"
        state={{ from: "/checkout" }}
        replace
      />
    );
  }

  return <Checkout />;
}

function ProtectedOrders() {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <Orders />;
}

function ProtectedProfile() {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <Profile />;
}

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <CartProvider>
          <OrdersProvider>
            <Routes>
              <Route element={<Layout />}>
                <Route path="/" element={<Home />} />
                <Route path="/products" element={<Products />} />
                <Route path="/products/:id" element={<ProductDetails />} />
                <Route path="/login" element={<Login />} />
                <Route path="/cart" element={<Cart />} />

                <Route
                  path="/checkout"
                  element={<ProtectedCheckout />}
                />

                <Route
                  path="/orders"
                  element={<ProtectedOrders />}
                />

                <Route
                  path="/profile"
                  element={<ProtectedProfile />}
                />

                <Route path="*" element={<NotFound />} />
              </Route>
            </Routes>
          </OrdersProvider>
        </CartProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
