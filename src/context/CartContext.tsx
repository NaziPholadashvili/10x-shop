
import {
    useEffect,
    useReducer,
    type ReactNode,
} from "react";
import type { Product } from "../types/product";
import { CartContext, type CartItem } from "./cart-context";
import {
    cartReducer,
    type CartState,
} from "./cart.reducer";
import { Cart } from "../models/Cart";

const CART_STORAGE_KEY = "10x-shop-cart";

function loadCart(): CartState {
    const emptyCart: CartState = {
        items: [],
        promoCode: null,
    };

    try {
        const savedCart = localStorage.getItem(CART_STORAGE_KEY);

        if (!savedCart) {
            return emptyCart;
        }

        const parsed: unknown = JSON.parse(savedCart);

        if (!Array.isArray(parsed)) {
            return emptyCart;
        }

        const validItems = parsed.filter(
            (item): item is CartItem => {
                if (typeof item !== "object" || item === null) {
                    return false;
                }

                const cartItem = item as Partial<CartItem>;
                const product = cartItem.product;

                return (
                    typeof product === "object" &&
                    product !== null &&
                    typeof product.id === "number" &&
                    typeof product.title === "string" &&
                    typeof product.price === "number" &&
                    Number.isFinite(product.price) &&
                    typeof product.stock === "number" &&
                    Number.isInteger(product.stock) &&
                    product.stock > 0 &&
                    typeof cartItem.quantity === "number" &&
                    Number.isInteger(cartItem.quantity) &&
                    cartItem.quantity >= 1 &&
                    cartItem.quantity <= product.stock
                );
            }
        );

        return {
            items: validItems,
            promoCode: null,
        };
    } catch {
        return emptyCart;
    }
}

export function CartProvider({
    children,
}: {
    children: ReactNode;
}) {
    const [state, dispatch] = useReducer(
        cartReducer,
        undefined,
        loadCart
    );

    const { items, promoCode } = state;

    useEffect(() => {
        try {
            localStorage.setItem(
                CART_STORAGE_KEY,
                JSON.stringify(items)
            );
        } catch (error) {
            console.error("Failed to save cart:", error);
        }
    }, [items]);

    function addToCart(product: Product, quantity = 1) {
        dispatch({
            type: "ADD_ITEM",
            product,
            qty: quantity,
        });
    }

    function removeFromCart(productId: number) {
        dispatch({
            type: "REMOVE_ITEM",
            productId,
        });
    }

    function updateQuantity(productId: number, quantity: number) {
        dispatch({
            type: "SET_QTY",
            productId,
            qty: quantity,
        });
    }

    function clearCart() {
        dispatch({ type: "CLEAR" });
    }

    const cart = new Cart(items, promoCode);

    const totalItems = cart.itemCount;
    const subtotal = cart.subtotal();
    const shippingCost = cart.shipping();
    const totalPrice = cart.total();

    return (
        <CartContext.Provider
            value={{
                items,
                addToCart,
                removeFromCart,
                updateQuantity,
                clearCart,
                totalItems,
                subtotal,
                shippingCost,
                totalPrice,
            }}
        >
            {children}
        </CartContext.Provider>
    );
}
