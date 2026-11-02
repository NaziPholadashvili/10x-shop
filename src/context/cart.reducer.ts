
import type { Product } from "../types/product";
import type { CartItem } from "./cart-context";

export interface CartState {
    items: CartItem[];
    promoCode: string | null;
}

export type CartAction =
    | { type: "ADD_ITEM"; product: Product; qty: number }
    | { type: "SET_QTY"; productId: number; qty: number }
    | { type: "REMOVE_ITEM"; productId: number }
    | { type: "CLEAR" }
    | { type: "APPLY_PROMO"; code: string }
    | { type: "REMOVE_PROMO" };

export function cartReducer(
    state: CartState,
    action: CartAction
): CartState {
    switch (action.type) {
        case "ADD_ITEM": {
            const { product, qty } = action;

            if (
                !Number.isInteger(qty) ||
                qty < 1 ||
                !Number.isInteger(product.stock) ||
                product.stock < 1
            ) {
                return state;
            }

            const existingItem = state.items.find(
                (item) => item.product.id === product.id
            );

            if (existingItem) {
                const newQuantity = existingItem.quantity + qty;

                if (newQuantity > product.stock) {
                    return state;
                }

                return {
                    ...state,
                    items: state.items.map((item) =>
                        item.product.id === product.id
                            ? { ...item, quantity: newQuantity }
                            : item
                    ),
                };
            }

            if (qty > product.stock) {
                return state;
            }

            return {
                ...state,
                items: [
                    ...state.items,
                    { product, quantity: qty },
                ],
            };
        }

        case "SET_QTY": {
            const { productId, qty } = action;

            const existingItem = state.items.find(
                (item) => item.product.id === productId
            );

            if (
                !existingItem ||
                !Number.isInteger(qty) ||
                qty < 1 ||
                qty > existingItem.product.stock
            ) {
                return state;
            }

            return {
                ...state,
                items: state.items.map((item) =>
                    item.product.id === productId
                        ? { ...item, quantity: qty }
                        : item
                ),
            };
        }

        case "REMOVE_ITEM":
            return {
                ...state,
                items: state.items.filter(
                    (item) => item.product.id !== action.productId
                ),
            };

        case "CLEAR":
            return {
                items: [],
                promoCode: null,
            };

        case "APPLY_PROMO":
            if (
                action.code.trim().toUpperCase() !== "10X10"
            ) {
                return state;
            }

            return {
                ...state,
                promoCode: "10X10",
            };

        case "REMOVE_PROMO":
            return {
                ...state,
                promoCode: null,
            };

        default: {
            const _exhaustive: never = action;
            return _exhaustive;
        }
    }
}
