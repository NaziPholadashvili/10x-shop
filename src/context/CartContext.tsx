import {
    createContext,
    useContext,
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

const CartContext = createContext<CartContextType | undefined>(
    undefined
);

export function CartProvider({
    children,
}: {
    children: ReactNode;
}) {
    const [items, setItems] = useState<CartItem[]>([]);

    function addToCart(product: Product) {
        setItems((currentItems) => {
            const existingItem = currentItems.find(
                (item) => item.product.id === product.id
            );

            if (existingItem) {
                return currentItems.map((item) =>
                    item.product.id === product.id
                        ? { ...item, quantity: Math.min(item.quantity + 1, product.stock) }
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
            currentItems.filter((item) => item.product.id !== productId)
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
                            Math.min(Math.trunc(quantity) || 1, item.product.stock)
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
        (total, item) => total + item.product.price * item.quantity,
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
        throw new Error("useCart must be used within CartProvider");
    }

    return context;
}