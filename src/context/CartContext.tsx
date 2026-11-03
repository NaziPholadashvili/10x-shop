
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
const PROMO_STORAGE_KEY = "10x-shop-promo";

function loadCart(): CartState {
    const emptyCart: CartState = {
        items: [],
        promoCode: null,
    };

    let items: CartItem[] = [];

    try {
        const savedCart = localStorage.getItem(CART_STORAGE_KEY);

        if (savedCart) {
            const parsed: unknown = JSON.parse(savedCart);

            if (Array.isArray(parsed)) {
                items = parsed.filter(
                    (item): item is CartItem => {
                        if (
                            typeof item !== "object" ||
                            item === null
                        ) {
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
            }
        }
    } catch (error) {
        console.error("Failed to load cart:", error);
    }

    let promoCode: string | null = null;

    try {
        const savedPromo = localStorage.getItem(PROMO_STORAGE_KEY);

        if (
            items.length > 0 &&
            savedPromo?.trim().toUpperCase() === "10X10"
        ) {
            promoCode = "10X10";
        }
    } catch (error) {
        console.error("Failed to load promo code:", error);
    }

    return {
        ...emptyCart,
        items,
        promoCode,
    };
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

    useEffect(() => {
        try {
            if (promoCode && items.length > 0) {
                localStorage.setItem(
                    PROMO_STORAGE_KEY,
                    promoCode
                );
            } else {
                localStorage.removeItem(PROMO_STORAGE_KEY);
            }
        } catch (error) {
            console.error("Failed to save promo code:", error);
        }
    }, [promoCode, items.length]);

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

    function applyPromo(code: string): boolean {
        if (
            items.length === 0 ||
            code.trim().toUpperCase() !== "10X10"
        ) {
            return false;
        }

        dispatch({
            type: "APPLY_PROMO",
            code,
        });

        return true;
    }

    function removePromo() {
        dispatch({ type: "REMOVE_PROMO" });
    }

    const cart = new Cart(items, promoCode);

    const totalItems = cart.itemCount;
    const subtotal = cart.subtotal();
    const discount = cart.discount();
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
                promoCode,
                discount,
                applyPromo,
                removePromo,
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
