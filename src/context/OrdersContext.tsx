
import {
    createContext,
    useContext,
    useState,
    type ReactNode,
} from "react";

import type { Order } from "../types/order";

interface OrdersContextType {
    orders: Order[];
    addOrder: (order: Order) => boolean;
}

const ORDERS_STORAGE_KEY = "10x-shop-orders";

const OrdersContext = createContext<OrdersContextType | undefined>(
    undefined
);

function loadOrders(): Order[] {
    try {
        const savedOrders = localStorage.getItem(ORDERS_STORAGE_KEY);

        if (!savedOrders) {
            return [];
        }

        const parsed: unknown = JSON.parse(savedOrders);

        if (!Array.isArray(parsed)) {
            return [];
        }

        return parsed.filter((order): order is Order => {
            if (typeof order !== "object" || order === null) {
                return false;
            }

            const item = order as Partial<Order>;

            return (
                typeof item.id === "string" &&
                typeof item.userId === "string" &&
                Array.isArray(item.items) &&
                typeof item.totalItems === "number" &&
                typeof item.totalPrice === "number" &&
                typeof item.createdAt === "string" &&
                item.status === "placed"
            );
        });
    } catch {
        return [];
    }
}

export function OrdersProvider({
    children,
}: {
    children: ReactNode;
}) {
    const [orders, setOrders] = useState<Order[]>(loadOrders);

    function addOrder(order: Order): boolean {
        const updatedOrders = [...orders, order];

        try {
            localStorage.setItem(
                ORDERS_STORAGE_KEY,
                JSON.stringify(updatedOrders)
            );

            setOrders(updatedOrders);
            return true;
        } catch (error) {
            console.error("Failed to save order:", error);
            return false;
        }
    }

    return (
        <OrdersContext.Provider value={{ orders, addOrder }}>
            {children}
        </OrdersContext.Provider>
    );
}

export function useOrders() {
    const context = useContext(OrdersContext);

    if (context === undefined) {
        throw new Error(
            "useOrders must be used within OrdersProvider"
        );
    }

    return context;
}
