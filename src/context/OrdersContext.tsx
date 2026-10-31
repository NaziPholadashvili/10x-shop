
import { useState, type ReactNode } from "react";
import type { Order } from "../types/order";
import { OrdersContext } from "./orders-context";

const ORDERS_STORAGE_KEY = "10x-shop-orders";

function isOrder(order: unknown): order is Order {
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
        (item.number === undefined ||
            typeof item.number === "string") &&
        (item.status === undefined ||
            item.status === "placed")
    );
}

function getNextOrderNumber(orders: Order[]): string {
    const highestNumber = orders.reduce((highest, order) => {
        const match = /^10X-(\d+)$/.exec(order.number ?? "");

        if (!match) {
            return highest;
        }

        const number = Number(match[1]);

        return Number.isSafeInteger(number)
            ? Math.max(highest, number)
            : highest;
    }, 0);

    return `10X-${String(highestNumber + 1).padStart(5, "0")}`;
}

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

        const validOrders = parsed.filter(isOrder);
        const usedNumbers = new Set<string>();

        const ordersWithNumbers = validOrders.map((order) => {
            const number = order.number;

            if (
                number &&
                /^10X-\d+$/.test(number) &&
                !usedNumbers.has(number)
            ) {
                usedNumbers.add(number);
                return order;
            }

            return { ...order, number: undefined };
        });

        let nextNumber = 1;

        const normalizedOrders = ordersWithNumbers.map((order) => {
            if (order.number) {
                return order;
            }

            while (
                usedNumbers.has(
                    `10X-${String(nextNumber).padStart(5, "0")}`
                )
            ) {
                nextNumber += 1;
            }

            const number = `10X-${String(nextNumber).padStart(5, "0")}`;

            usedNumbers.add(number);
            nextNumber += 1;

            return { ...order, number };
        });

        if (
            normalizedOrders.some(
                (order, index) => order !== validOrders[index]
            )
        ) {
            localStorage.setItem(
                ORDERS_STORAGE_KEY,
                JSON.stringify(normalizedOrders)
            );
        }

        return normalizedOrders;
    } catch (error) {
        console.error("Failed to load orders:", error);
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
        const newOrder: Order = {
            ...order,
            number: getNextOrderNumber(orders),
        };

        const updatedOrders = [...orders, newOrder];

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
