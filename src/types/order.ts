
import type { CartItem } from "../context/CartContext";

export interface ShippingInformation {
    fullName: string;
    email: string;
    address: string;
    city: string;
    postalCode: string;
}

export interface Order {
    id: string;
    userId: string;
    items: CartItem[];
    totalItems: number;
    totalPrice: number;
    shippingInformation: ShippingInformation;
    createdAt: string;
    status: "placed";
}
