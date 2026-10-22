
import { useState, type FormEvent } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

export default function Checkout() {
    const { items, totalItems, totalPrice, clearCart } = useCart();

    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [address, setAddress] = useState("");
    const [city, setCity] = useState("");
    const [postalCode, setPostalCode] = useState("");
    const [error, setError] = useState("");
    const [orderPlaced, setOrderPlaced] = useState(false);

    function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        if (items.length === 0) {
            setError("Your cart is empty.");
            return;
        }

        if (
            !fullName.trim() ||
            !email.trim() ||
            !address.trim() ||
            !city.trim() ||
            !postalCode.trim()
        ) {
            setError("Please fill in all fields.");
            return;
        }

        setError("");
        clearCart();
        setOrderPlaced(true);
    }

    if (orderPlaced) {
        return (
            <main className="mx-auto max-w-2xl px-6 py-12 text-center">
                <h1 className="mb-4 text-3xl font-bold text-green-700">
                    Order placed successfully!
                </h1>

                <p className="mb-6 text-slate-600">
                    Thank you for shopping with 10X Shop.
                </p>

                <Link
                    to="/products"
                    className="inline-block rounded-lg bg-indigo-600 px-6 py-3 font-semibold text-white hover:bg-indigo-700"
                >
                    Continue Shopping
                </Link>
            </main>
        );
    }

    if (items.length === 0) {
        return (
            <main className="mx-auto max-w-2xl px-6 py-12 text-center">
                <h1 className="mb-4 text-3xl font-bold">
                    Your cart is empty
                </h1>

                <Link
                    to="/products"
                    className="text-indigo-600 hover:underline"
                >
                    Browse Products
                </Link>
            </main>
        );
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
                    {items.map((item) => (
                        <li
                            key={item.product.id}
                            className="flex justify-between gap-4"
                        >
                            <span>
                                {item.product.title} × {item.quantity}
                            </span>

                            <span className="font-medium">
                                ${(item.product.price * item.quantity).toFixed(2)}
                            </span>
                        </li>
                    ))}
                </ul>

                <div className="mt-5 border-t pt-4">
                    <p>Total items: {totalItems}</p>

                    <p className="mt-2 text-xl font-bold">
                        Total: ${totalPrice.toFixed(2)}
                    </p>
                </div>
            </section>

            <form
                onSubmit={handleSubmit}
                className="space-y-5 rounded-xl bg-white p-6 shadow-sm"
            >
                <h2 className="text-xl font-semibold">
                    Shipping Information
                </h2>

                <div>
                    <label htmlFor="fullName" className="mb-2 block font-medium">
                        Full Name
                    </label>
                    <input
                        id="fullName"
                        type="text"
                        value={fullName}
                        onChange={(event) => setFullName(event.target.value)}
                        required
                        className="w-full rounded-lg border border-slate-300 p-3"
                    />
                </div>

                <div>
                    <label htmlFor="email" className="mb-2 block font-medium">
                        Email
                    </label>
                    <input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                        required
                        className="w-full rounded-lg border border-slate-300 p-3"
                    />
                </div>

                <div>
                    <label htmlFor="address" className="mb-2 block font-medium">
                        Address
                    </label>
                    <input
                        id="address"
                        type="text"
                        value={address}
                        onChange={(event) => setAddress(event.target.value)}
                        required
                        className="w-full rounded-lg border border-slate-300 p-3"
                    />
                </div>

                <div>
                    <label htmlFor="city" className="mb-2 block font-medium">
                        City
                    </label>
                    <input
                        id="city"
                        type="text"
                        value={city}
                        onChange={(event) => setCity(event.target.value)}
                        required
                        className="w-full rounded-lg border border-slate-300 p-3"
                    />
                </div>

                <div>
                    <label htmlFor="postalCode" className="mb-2 block font-medium">
                        Postal Code
                    </label>
                    <input
                        id="postalCode"
                        type="text"
                        value={postalCode}
                        onChange={(event) => setPostalCode(event.target.value)}
                        required
                        className="w-full rounded-lg border border-slate-300 p-3"
                    />
                </div>

                {error && (
                    <p role="alert" className="text-sm text-red-600">
                        {error}
                    </p>
                )}

                <button
                    type="submit"
                    className="w-full rounded-lg bg-indigo-600 px-4 py-3 font-semibold text-white hover:bg-indigo-700"
                >
                    Place Order
                </button>
            </form>
        </main>
    );
}
