import type { CartItem } from "../context/cart-context";

export interface ShippingInformation {
    fullName: string;
    email: string;
    address: string;
    city: string;
    postalCode: string;
}

export type OrderStatus =
    | "Processing"
    | "Shipped"
    | "Delivered";

export interface Order {
    id: string;
    number?: string;
    userId: string;
    items: CartItem[];
    totalItems: number;
    totalPrice: number;
    shippingInformation: ShippingInformation;
    createdAt: string;
    status?: "placed";
}