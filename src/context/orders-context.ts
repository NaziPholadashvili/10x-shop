
import { createContext } from "react";
import type { Order } from "../types/order";

export interface OrdersContextType {
    orders: Order[];
    addOrder: (order: Order) => boolean;
}

export const OrdersContext = createContext<
    OrdersContextType | undefined
>(undefined);
