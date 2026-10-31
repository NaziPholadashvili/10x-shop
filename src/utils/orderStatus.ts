
import type { OrderStatus } from "../types/order";

export function getOrderStatus(
    createdAt: string,
    currentTime: number
): OrderStatus {
    const elapsedTime = currentTime - new Date(createdAt).getTime();

    if (elapsedTime < 60_000) {
        return "Processing";
    }

    if (elapsedTime < 180_000) {
        return "Shipped";
    }

    return "Delivered";
}
