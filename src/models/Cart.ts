
import type { CartItem } from "../context/cart-context";
import { discountedPrice } from "../utils/price";

export interface ICart {
    subtotal(): number;
    discount(): number;
    shipping(): number;
    total(): number;
}

function roundMoney(value: number): number {
    return Math.round((value + Number.EPSILON) * 100) / 100;
}

export class Cart implements ICart {
    static readonly FREE_SHIPPING_FROM = 100;
    static readonly SHIPPING_COST = 10;

    private readonly items: CartItem[];
    private readonly promoCode: string | null;

    constructor(
        items: CartItem[],
        promoCode: string | null
    ) {
        this.items = items;
        this.promoCode = promoCode;
    }

    get itemCount(): number {
        return this.items.reduce(
            (total, item) => total + item.quantity,
            0
        );
    }

    subtotal(): number {
        const amount = this.items.reduce((total, item) => {
            const { price, discountPercentage } = item.product;

            const unitPrice =
                discountPercentage >= 1
                    ? discountedPrice(price, discountPercentage)
                    : price;

            return total + roundMoney(unitPrice * item.quantity);
        }, 0);

        return roundMoney(amount);
    }

    discount(): number {
        if (this.promoCode?.toUpperCase() !== "10X10") {
            return 0;
        }

        return roundMoney(this.subtotal() * 0.1);
    }

    shipping(): number {
        if (this.items.length === 0) {
            return 0;
        }

        const amountAfterDiscount = roundMoney(
            this.subtotal() - this.discount()
        );

        return amountAfterDiscount >= Cart.FREE_SHIPPING_FROM
            ? 0
            : Cart.SHIPPING_COST;
    }

    total(): number {
        return roundMoney(
            this.subtotal() - this.discount() + this.shipping()
        );
    }
}
