
import { useRef, useState, type FormEvent } from "react";
import { Link, Navigate } from "react-router-dom";
import { useCart } from "../context/useCart";
import { useAuth } from "../context/useAuth";
import { useOrders } from "../context/useOrders";
import { useToast } from "../context/useToast";
import type { Order } from "../types/order";
import { discountedPrice, formatPrice } from "../utils/price";

type FieldName =
    | "fullName"
    | "email"
    | "address"
    | "city"
    | "postalCode";

type FieldErrors = Partial<Record<FieldName, string>>;

export default function Checkout() {
    const {
        items,
        totalItems,
        subtotal,
        promoCode,
        discount,
        shippingCost,
        totalPrice,
        clearCart,
    } = useCart();

    const { username } = useAuth();
    const { addOrder } = useOrders();
    const { showToast } = useToast();

    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [address, setAddress] = useState("");
    const [city, setCity] = useState("");
    const [postalCode, setPostalCode] = useState("");

    const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
    const [error, setError] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [placedOrder, setPlacedOrder] = useState<Order | null>(null);

    const submittingRef = useRef(false);

    function clearFieldError(field: FieldName) {
        setFieldErrors((previous) => {
            if (!previous[field]) {
                return previous;
            }

            const next = { ...previous };
            delete next[field];
            return next;
        });
    }

    function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        if (submittingRef.current) {
            return;
        }

        setError("");
        setFieldErrors({});

        if (items.length === 0) {
            setError("Your cart is empty.");
            return;
        }

        const errors: FieldErrors = {};

        if (fullName.trim().length < 3) {
            errors.fullName =
                "Full name must be at least 3 characters";
        }

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
            errors.email =
                "Please enter a valid email address";
        }

        if (address.trim().length < 5) {
            errors.address =
                "Address must be at least 5 characters";
        }

        if (!city.trim()) {
            errors.city = "City is required";
        }

        if (!/^\d{4,10}$/.test(postalCode.trim())) {
            errors.postalCode =
                "Postal code must be 4-10 digits";
        }

        if (Object.keys(errors).length > 0) {
            setFieldErrors(errors);
            return;
        }

        if (!username) {
            setError("Please log in to place an order.");
            return;
        }

        submittingRef.current = true;
        setIsSubmitting(true);

        try {
            const orderItems = items.map((item) => {
                const { price, discountPercentage } = item.product;

                const unitPrice =
                    discountPercentage >= 1
                        ? discountedPrice(price, discountPercentage)
                        : price;

                return {
                    product: { ...item.product },
                    quantity: item.quantity,
                    unitPrice,
                };
            });

            const newOrder: Order = {
                id: crypto.randomUUID(),
                userId: username,
                items: orderItems,
                totalItems,
                subtotal,
                discount,
                shippingCost,
                totalPrice,
                shippingInformation: {
                    fullName: fullName.trim(),
                    email: email.trim(),
                    address: address.trim(),
                    city: city.trim(),
                    postalCode: postalCode.trim(),
                },
                createdAt: new Date().toISOString(),
                status: "placed",
            };

            const savedOrder = addOrder(newOrder);

            if (!savedOrder) {
                setError(
                    "Failed to save your order. Please try again."
                );
                showToast(
                    "Failed to save your order.",
                    "error"
                );
                return;
            }

            clearCart();
            setPlacedOrder(savedOrder);

            showToast(
                "Order placed successfully!",
                "success"
            );
        } catch {
            setError(
                "Something went wrong. Please try again."
            );
            showToast(
                "Something went wrong. Please try again.",
                "error"
            );
        } finally {
            submittingRef.current = false;
            setIsSubmitting(false);
        }
    }

    if (placedOrder) {
        return (
            <main className="mx-auto max-w-2xl px-6 py-12 text-center">
                <h1 className="mb-4 text-3xl font-bold text-green-700">
                    Thank you! Your order has been placed.
                </h1>

                <p className="mb-4 text-slate-600">
                    Your order was placed successfully.
                </p>

                <p className="mb-4 text-lg font-semibold text-slate-900">
                    Order Number: #
                    {placedOrder.number ??
                        placedOrder.id.slice(0, 8)}
                </p>

                <p className="mb-6 text-2xl font-bold text-slate-900">
                    Order Total: {formatPrice(placedOrder.totalPrice)}
                </p>

                <div className="flex flex-wrap justify-center gap-4">
                    <Link
                        to="/"
                        className="inline-block rounded-lg bg-indigo-600 px-6 py-3 font-semibold text-white hover:bg-indigo-700"
                    >
                        Continue Shopping
                    </Link>

                    <Link
                        to="/orders"
                        className="inline-block rounded-lg border border-indigo-600 px-6 py-3 font-semibold text-indigo-600 hover:bg-indigo-50"
                    >
                        View My Orders
                    </Link>
                </div>
            </main>
        );
    }

    if (items.length === 0) {
        return <Navigate to="/cart" replace />;
    }

    return (
        <main className="mx-auto max-w-3xl px-6 py-12">
            <h1 className="mb-8 text-3xl font-bold text-slate-900">
                Checkout
            </h1>

            <section className="mb-8 rounded-xl bg-white p-6 shadow-sm">
                <h2 className="mb-4 text-xl font-semibold">
                    Order Summary
                </h2>

                <ul className="space-y-3">
                    {items.map((item) => {
                        const { product, quantity } = item;

                        const unitPrice =
                            product.discountPercentage >= 1
                                ? discountedPrice(
                                    product.price,
                                    product.discountPercentage
                                )
                                : product.price;

                        const lineTotal =
                            Math.round(
                                (unitPrice * quantity +
                                    Number.EPSILON) *
                                100
                            ) / 100;

                        return (
                            <li
                                key={product.id}
                                className="flex justify-between gap-4"
                            >
                                <span>
                                    {product.title} × {quantity}
                                </span>

                                <span className="font-medium">
                                    {formatPrice(lineTotal)}
                                </span>
                            </li>
                        );
                    })}
                </ul>

                <div className="mt-5 border-t border-slate-200 pt-4">
                    <p className="mb-4 text-slate-600">
                        Total items: {totalItems}
                    </p>

                    <div className="space-y-3">
                        <div className="flex justify-between">
                            <span className="text-slate-600">
                                Subtotal
                            </span>
                            <span>{formatPrice(subtotal)}</span>
                        </div>

                        {promoCode && (
                            <div className="flex justify-between gap-4 text-green-700">
                                <span>
                                    Discount (10% — {promoCode})
                                </span>
                                <span>
                                    -{formatPrice(discount)}
                                </span>
                            </div>
                        )}

                        <div className="flex justify-between">
                            <span className="text-slate-600">
                                Shipping
                            </span>
                            <span>
                                {shippingCost === 0
                                    ? "Free"
                                    : formatPrice(shippingCost)}
                            </span>
                        </div>

                        <div className="flex justify-between border-t border-slate-200 pt-4 text-xl font-bold">
                            <span>Total</span>
                            <span>{formatPrice(totalPrice)}</span>
                        </div>
                    </div>

                    <p className="mt-3 text-sm text-slate-500">
                        Free shipping on orders of $100 or more
                        after discounts.
                    </p>
                </div>
            </section>

            <form
                onSubmit={handleSubmit}
                noValidate
                className="space-y-5 rounded-xl bg-white p-6 shadow-sm"
            >
                <h2 className="text-xl font-semibold">
                    Shipping Information
                </h2>

                <div>
                    <label
                        htmlFor="fullName"
                        className="mb-2 block font-medium"
                    >
                        Full Name
                    </label>
                    <input
                        id="fullName"
                        type="text"
                        value={fullName}
                        onChange={(event) => {
                            setFullName(event.target.value);
                            clearFieldError("fullName");
                        }}
                        required
                        minLength={3}
                        aria-invalid={Boolean(fieldErrors.fullName)}
                        aria-describedby={
                            fieldErrors.fullName
                                ? "fullName-error"
                                : undefined
                        }
                        className="w-full rounded-lg border border-slate-300 p-3"
                    />
                    {fieldErrors.fullName && (
                        <p
                            id="fullName-error"
                            role="alert"
                            className="mt-1 text-sm text-red-600"
                        >
                            {fieldErrors.fullName}
                        </p>
                    )}
                </div>

                <div>
                    <label
                        htmlFor="email"
                        className="mb-2 block font-medium"
                    >
                        Email
                    </label>
                    <input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(event) => {
                            setEmail(event.target.value);
                            clearFieldError("email");
                        }}
                        required
                        aria-invalid={Boolean(fieldErrors.email)}
                        aria-describedby={
                            fieldErrors.email
                                ? "email-error"
                                : undefined
                        }
                        className="w-full rounded-lg border border-slate-300 p-3"
                    />
                    {fieldErrors.email && (
                        <p
                            id="email-error"
                            role="alert"
                            className="mt-1 text-sm text-red-600"
                        >
                            {fieldErrors.email}
                        </p>
                    )}
                </div>

                <div>
                    <label
                        htmlFor="address"
                        className="mb-2 block font-medium"
                    >
                        Address
                    </label>
                    <input
                        id="address"
                        type="text"
                        value={address}
                        onChange={(event) => {
                            setAddress(event.target.value);
                            clearFieldError("address");
                        }}
                        required
                        minLength={5}
                        aria-invalid={Boolean(fieldErrors.address)}
                        aria-describedby={
                            fieldErrors.address
                                ? "address-error"
                                : undefined
                        }
                        className="w-full rounded-lg border border-slate-300 p-3"
                    />
                    {fieldErrors.address && (
                        <p
                            id="address-error"
                            role="alert"
                            className="mt-1 text-sm text-red-600"
                        >
                            {fieldErrors.address}
                        </p>
                    )}
                </div>

                <div>
                    <label
                        htmlFor="city"
                        className="mb-2 block font-medium"
                    >
                        City
                    </label>
                    <input
                        id="city"
                        type="text"
                        value={city}
                        onChange={(event) => {
                            setCity(event.target.value);
                            clearFieldError("city");
                        }}
                        required
                        aria-invalid={Boolean(fieldErrors.city)}
                        aria-describedby={
                            fieldErrors.city
                                ? "city-error"
                                : undefined
                        }
                        className="w-full rounded-lg border border-slate-300 p-3"
                    />
                    {fieldErrors.city && (
                        <p
                            id="city-error"
                            role="alert"
                            className="mt-1 text-sm text-red-600"
                        >
                            {fieldErrors.city}
                        </p>
                    )}
                </div>

                <div>
                    <label
                        htmlFor="postalCode"
                        className="mb-2 block font-medium"
                    >
                        Postal Code
                    </label>
                    <input
                        id="postalCode"
                        type="text"
                        inputMode="numeric"
                        value={postalCode}
                        onChange={(event) => {
                            setPostalCode(event.target.value);
                            clearFieldError("postalCode");
                        }}
                        required
                        aria-invalid={Boolean(fieldErrors.postalCode)}
                        aria-describedby={
                            fieldErrors.postalCode
                                ? "postalCode-error"
                                : undefined
                        }
                        className="w-full rounded-lg border border-slate-300 p-3"
                    />
                    {fieldErrors.postalCode && (
                        <p
                            id="postalCode-error"
                            role="alert"
                            className="mt-1 text-sm text-red-600"
                        >
                            {fieldErrors.postalCode}
                        </p>
                    )}
                </div>

                {error && (
                    <p
                        role="alert"
                        className="text-sm text-red-600"
                    >
                        {error}
                    </p>
                )}

                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full rounded-lg bg-indigo-600 px-4 py-3 font-semibold text-white hover:bg-indigo-700 disabled:cursor-not-allowed disabled:bg-slate-400"
                >
                    {isSubmitting
                        ? "Placing Order..."
                        : "Place Order"}
                </button>
            </form>
        </main>
    );
}
