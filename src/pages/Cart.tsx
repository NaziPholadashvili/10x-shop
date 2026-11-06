
import { useState, type FormEvent } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/useCart";
import { useToast } from "../context/useToast";
import type { CartItem } from "../context/cart-context";
import { discountedPrice, formatPrice } from "../utils/price";

function CartProduct({ item }: { item: CartItem }) {
    const { updateQuantity, removeFromCart } = useCart();
    const { showToast } = useToast();
    const { product, quantity } = item;

    const [quantityInput, setQuantityInput] = useState(
        String(quantity)
    );
    const [isEditing, setIsEditing] = useState(false);

    const displayedQuantity = isEditing
        ? quantityInput
        : String(quantity);

    const hasDiscount = product.discountPercentage >= 1;

    const unitPrice = hasDiscount
        ? discountedPrice(
            product.price,
            product.discountPercentage
        )
        : product.price;

    function handleQuantityChange(value: string) {
        if (value !== "" && !/^\d+$/.test(value)) {
            return;
        }

        setIsEditing(true);
        setQuantityInput(value);
    }

    function handleQuantityBlur() {
        const parsedQuantity = Number(quantityInput);

        if (
            !Number.isSafeInteger(parsedQuantity) ||
            parsedQuantity < 1
        ) {
            setIsEditing(false);
            setQuantityInput(String(quantity));
            return;
        }

        const safeQuantity = Math.min(
            parsedQuantity,
            product.stock
        );

        updateQuantity(product.id, safeQuantity);
        setQuantityInput(String(safeQuantity));
        setIsEditing(false);
    }

    function handleStep(nextQuantity: number) {
        const safeQuantity = Math.max(
            1,
            Math.min(nextQuantity, product.stock)
        );

        updateQuantity(product.id, safeQuantity);
        setQuantityInput(String(safeQuantity));
        setIsEditing(false);
    }

    function handleRemove() {
        removeFromCart(product.id);
        showToast("Product removed from cart.", "success");
    }

    return (
        <article className="flex flex-wrap items-center gap-5 rounded-xl border border-slate-200 bg-white p-5 text-slate-900 shadow-sm dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100">
            <img
                src={product.thumbnail}
                alt={product.title}
                className="h-24 w-24 rounded-lg bg-white object-contain"
            />

            <div className="min-w-0 flex-1">
                <Link
                    to={`/products/${product.id}`}
                    className="font-semibold text-slate-900 hover:text-indigo-600 dark:text-slate-100 dark:hover:text-indigo-400"
                >
                    {product.title}
                </Link>

                <div className="mt-2 flex flex-wrap items-center gap-2">
                    <span className="font-semibold text-indigo-600 dark:text-indigo-400">
                        {formatPrice(unitPrice)}
                    </span>

                    {hasDiscount && (
                        <>
                            <span className="text-sm text-slate-400 line-through">
                                {formatPrice(product.price)}
                            </span>

                            <span className="rounded bg-green-100 px-2 py-1 text-xs font-semibold text-green-700">
                                -{Math.round(product.discountPercentage)}%
                            </span>
                        </>
                    )}
                </div>

                <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                    Item subtotal:{" "}
                    {formatPrice(
                        Math.round(
                            (unitPrice * quantity + Number.EPSILON) * 100
                        ) / 100
                    )}
                </p>
            </div>

            <div className="flex items-center gap-3">
                <button
                    type="button"
                    aria-label={`Decrease quantity of ${product.title}`}
                    onClick={() => handleStep(quantity - 1)}
                    disabled={quantity <= 1}
                    className="rounded border border-slate-300 bg-white px-3 py-1 text-slate-900 hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-40 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-100 dark:hover:bg-slate-700"
                >
                    −
                </button>

                <input
                    type="text"
                    inputMode="numeric"
                    aria-label={`Quantity of ${product.title}`}
                    value={displayedQuantity}
                    onFocus={() => {
                        setQuantityInput(String(quantity));
                        setIsEditing(true);
                    }}
                    onChange={(event) =>
                        handleQuantityChange(event.target.value)
                    }
                    onBlur={handleQuantityBlur}
                    onKeyDown={(event) => {
                        if (event.key === "Enter") {
                            event.currentTarget.blur();
                        }
                    }}
                    className="w-16 rounded border border-slate-300 bg-white px-2 py-1 text-center text-slate-900 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-100"
                />

                <button
                    type="button"
                    aria-label={`Increase quantity of ${product.title}`}
                    onClick={() => handleStep(quantity + 1)}
                    disabled={quantity >= product.stock}
                    className="rounded border border-slate-300 bg-white px-3 py-1 text-slate-900 hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-40 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-100 dark:hover:bg-slate-700"
                >
                    +
                </button>
            </div>

            <button
                type="button"
                onClick={handleRemove}
                className="font-medium text-red-600 hover:underline dark:text-red-400"
            >
                Remove
            </button>
        </article>
    );
}

export default function Cart() {
    const {
        items,
        clearCart,
        totalItems,
        subtotal,
        promoCode,
        discount,
        applyPromo,
        removePromo,
        shippingCost,
        totalPrice,
    } = useCart();

    const { showToast } = useToast();

    const [promoInput, setPromoInput] = useState("");
    const [promoError, setPromoError] = useState("");

    function handleApplyPromo(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        const success = applyPromo(promoInput);

        if (success) {
            setPromoError("");
            setPromoInput("");
            showToast(
                "Promo code applied successfully!",
                "success"
            );
        } else {
            setPromoError(
                "Invalid promo code. Please try again."
            );
            showToast("Invalid promo code.", "error");
        }
    }

    function handleRemovePromo() {
        removePromo();
        setPromoInput("");
        setPromoError("");
        showToast("Promo code removed.", "success");
    }

    function handleClearCart() {
        clearCart();
        showToast("Cart cleared.", "success");
    }

    return (
        <main className="mx-auto max-w-5xl px-6 py-10 text-slate-900 dark:text-slate-100">
            <h1 className="mb-8 text-3xl font-bold text-slate-900 dark:text-white">
                Shopping Cart
            </h1>

            {items.length === 0 ? (
                <div className="rounded-xl border border-slate-200 bg-white p-8 text-center shadow-sm dark:border-slate-700 dark:bg-slate-900">
                    <p className="mb-4 text-slate-600 dark:text-slate-300">
                        Your cart is empty.
                    </p>

                    <Link
                        to="/products"
                        className="font-semibold text-indigo-600 dark:text-indigo-400"
                    >
                        Browse products
                    </Link>
                </div>
            ) : (
                <div className="space-y-6">
                    {items.map((item) => (
                        <CartProduct
                            key={item.product.id}
                            item={item}
                        />
                    ))}

                    <section className="rounded-xl border border-slate-200 bg-white p-6 text-slate-900 shadow-sm dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100">
                        <h2 className="mb-4 text-xl font-semibold text-slate-900 dark:text-white">
                            Order Summary
                        </h2>

                        <p className="mb-4 text-slate-600 dark:text-slate-300">
                            Total items: {totalItems}
                        </p>

                        <div className="mb-6">
                            <h3 className="mb-3 font-semibold text-slate-900 dark:text-slate-100">
                                Promo Code
                            </h3>

                            {promoCode ? (
                                <div className="flex flex-wrap items-center gap-3">
                                    <p
                                        role="status"
                                        className="text-sm font-medium text-green-700 dark:text-green-400"
                                    >
                                        Promo code {promoCode} applied
                                        (10% off).
                                    </p>

                                    <button
                                        type="button"
                                        onClick={handleRemovePromo}
                                        className="rounded-lg border border-red-500 px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-slate-800"
                                    >
                                        Remove Promo
                                    </button>
                                </div>
                            ) : (
                                <form
                                    onSubmit={handleApplyPromo}
                                    className="space-y-3"
                                >
                                    <div className="flex flex-wrap gap-3">
                                        <input
                                            type="text"
                                            aria-label="Promo code"
                                            placeholder="Enter promo code"
                                            value={promoInput}
                                            onChange={(event) => {
                                                setPromoInput(
                                                    event.target.value
                                                );
                                                setPromoError("");
                                            }}
                                            aria-invalid={
                                                promoError
                                                    ? true
                                                    : undefined
                                            }
                                            aria-describedby={
                                                promoError
                                                    ? "promo-error"
                                                    : undefined
                                            }
                                            className="min-w-0 flex-1 rounded-lg border border-slate-300 bg-white px-4 py-2 text-slate-900 placeholder:text-slate-400 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-100 dark:placeholder:text-slate-400"
                                        />

                                        <button
                                            type="submit"
                                            className="rounded-lg bg-indigo-600 px-5 py-2 font-semibold text-white hover:bg-indigo-700"
                                        >
                                            Apply
                                        </button>
                                    </div>

                                    {promoError && (
                                        <p
                                            id="promo-error"
                                            role="alert"
                                            className="text-sm text-red-600 dark:text-red-400"
                                        >
                                            {promoError}
                                        </p>
                                    )}
                                </form>
                            )}
                        </div>

                        <div className="space-y-3">
                            <div className="flex justify-between">
                                <span className="text-slate-600 dark:text-slate-300">
                                    Subtotal
                                </span>
                                <span>
                                    {formatPrice(subtotal)}
                                </span>
                            </div>

                            {promoCode && (
                                <div className="flex justify-between text-green-700 dark:text-green-400">
                                    <span>
                                        Discount (10%)
                                    </span>
                                    <span>
                                        -{formatPrice(discount)}
                                    </span>
                                </div>
                            )}

                            <div className="flex justify-between">
                                <span className="text-slate-600 dark:text-slate-300">
                                    Shipping
                                </span>
                                <span>
                                    {shippingCost === 0
                                        ? "Free"
                                        : formatPrice(shippingCost)}
                                </span>
                            </div>

                            <div className="flex justify-between border-t border-slate-200 pt-4 text-xl font-bold dark:border-slate-700">
                                <span>Total</span>
                                <span>
                                    {formatPrice(totalPrice)}
                                </span>
                            </div>
                        </div>

                        <p className="mt-3 text-sm text-slate-500 dark:text-slate-400">
                            Free shipping on orders of $100 or more
                            after discounts.
                        </p>

                        <div className="mt-5 flex flex-wrap items-center gap-4">
                            <button
                                type="button"
                                onClick={handleClearCart}
                                className="rounded-lg border border-red-500 px-4 py-2 text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-slate-800"
                            >
                                Clear Cart
                            </button>

                            <Link
                                to="/checkout"
                                className="inline-block rounded-lg bg-indigo-600 px-6 py-3 font-semibold text-white hover:bg-indigo-700"
                            >
                                Proceed to checkout
                            </Link>
                        </div>
                    </section>
                </div>
            )}
        </main>
    );
}
