
import {
    createContext,
    useContext,
    useEffect,
    useState,
    type ReactNode,
} from "react";
import type { Product } from "../types/product";

export interface CartItem {
    product: Product;
    quantity: number;
}

interface CartContextType {
    items: CartItem[];
    addToCart: (product: Product) => void;
    removeFromCart: (productId: number) => void;
    updateQuantity: (productId: number, quantity: number) => void;
    clearCart: () => void;
    totalItems: number;
    totalPrice: number;
}

const CART_STORAGE_KEY = "10x-shop-cart";

const CartContext = createContext<CartContextType | undefined>(
    undefined
);

function loadCart(): CartItem[] {
    try {
        const savedCart = localStorage.getItem(CART_STORAGE_KEY);

        if (!savedCart) {
            return [];
        }

        const parsed: unknown = JSON.parse(savedCart);

        if (!Array.isArray(parsed)) {
            return [];
        }

        return parsed.filter((item): item is CartItem => {
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
        });
    } catch {
        return [];
    }
}

export function CartProvider({
    children,
}: {
    children: ReactNode;
}) {
    const [items, setItems] = useState<CartItem[]>(loadCart);

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

    function addToCart(product: Product) {
        setItems((currentItems) => {
            const existingItem = currentItems.find(
                (item) => item.product.id === product.id
            );

            if (existingItem) {
                return currentItems.map((item) =>
                    item.product.id === product.id
                        ? {
                            ...item,
                            quantity: Math.min(
                                item.quantity + 1,
                                product.stock
                            ),
                        }
                        : item
                );
            }

            if (product.stock < 1) {
                return currentItems;
            }

            return [...currentItems, { product, quantity: 1 }];
        });
    }

    function removeFromCart(productId: number) {
        setItems((currentItems) =>
            currentItems.filter(
                (item) => item.product.id !== productId
            )
        );
    }

    function updateQuantity(productId: number, quantity: number) {
        setItems((currentItems) =>
            currentItems.map((item) =>
                item.product.id === productId
                    ? {
                        ...item,
                        quantity: Math.max(
                            1,
                            Math.min(
                                Math.trunc(quantity) || 1,
                                item.product.stock
                            )
                        ),
                    }
                    : item
            )
        );
    }

    function clearCart() {
        setItems([]);
    }

    const totalItems = items.reduce(
        (total, item) => total + item.quantity,
        0
    );

    const totalPrice = items.reduce(
        (total, item) =>
            total + item.product.price * item.quantity,
        0
    );

    return (
        <CartContext.Provider
            value={{
                items,
                addToCart,
                removeFromCart,
                updateQuantity,
                clearCart,
                totalItems,
                totalPrice,
            }}
        >
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    const context = useContext(CartContext);

    if (context === undefined) {
        throw new Error(
            "useCart must be used within CartProvider"
        );
    }

    return context;
}
