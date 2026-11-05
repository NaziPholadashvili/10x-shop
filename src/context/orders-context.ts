import { createContext } from "react";
import type { Order } from "../types/order";

export interface OrdersContextType {
    orders: Order[];
    addOrder: (order: Order) => Order | null;
}

export const OrdersContext = createContext<
    OrdersContextType | undefined
>(undefined);