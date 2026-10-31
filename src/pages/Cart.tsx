
import { useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/useCart";
import type { CartItem } from "../context/cart-context";

function CartProduct({ item }: { item: CartItem }) {
    const { updateQuantity, removeFromCart } = useCart();
    const { product, quantity } = item;

    const [quantityInput, setQuantityInput] = useState(
        String(quantity)
    );

    const [isEditing, setIsEditing] = useState(false);

    const displayedQuantity = isEditing
        ? quantityInput
        : String(quantity);

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

    return (
        <article className="flex flex-wrap items-center gap-5 rounded-xl bg-white p-5 shadow-sm">
            <img
                src={product.thumbnail}
                alt={product.title}
                className="h-24 w-24 object-contain"
            />

            <div className="min-w-0 flex-1">
                <Link
                    to={`/products/${product.id}`}
                    className="font-semibold hover:text-indigo-600"
                >
                    {product.title}
                </Link>

                <p className="mt-2 text-indigo-600">
                    ${product.price.toFixed(2)}
                </p>
            </div>

            <div className="flex items-center gap-3">
                <button
                    type="button"
                    aria-label={`Decrease quantity of ${product.title}`}
                    onClick={() => handleStep(quantity - 1)}
                    disabled={quantity <= 1}
                    className="rounded border px-3 py-1 disabled:cursor-not-allowed disabled:opacity-40"
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
                    className="w-16 rounded border border-slate-300 px-2 py-1 text-center"
                />

                <button
                    type="button"
                    aria-label={`Increase quantity of ${product.title}`}
                    onClick={() => handleStep(quantity + 1)}
                    disabled={quantity >= product.stock}
                    className="rounded border px-3 py-1 disabled:cursor-not-allowed disabled:opacity-40"
                >
                    +
                </button>
            </div>

            <button
                type="button"
                onClick={() => removeFromCart(product.id)}
                className="font-medium text-red-600 hover:underline"
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
        totalPrice,
    } = useCart();

    return (
        <main className="mx-auto max-w-5xl px-6 py-10">
            <h1 className="mb-8 text-3xl font-bold">
                Shopping Cart
            </h1>

            {items.length === 0 ? (
                <div className="rounded-xl bg-white p-8 text-center shadow-sm">
                    <p className="mb-4 text-slate-600">
                        Your cart is empty.
                    </p>

                    <Link
                        to="/"
                        className="font-semibold text-indigo-600"
                    >
                        Browse Products
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

                    <section className="rounded-xl bg-white p-6 shadow-sm">
                        <p>Total items: {totalItems}</p>

                        <p className="mt-2 text-xl font-bold">
                            Total: ${totalPrice.toFixed(2)}
                        </p>

                        <div className="mt-5 flex flex-wrap items-center gap-4">
                            <button
                                type="button"
                                onClick={clearCart}
                                className="rounded-lg border border-red-500 px-4 py-2 text-red-600 hover:bg-red-50"
                            >
                                Clear Cart
                            </button>

                            <Link
                                to="/checkout"
                                className="inline-block rounded-lg bg-indigo-600 px-6 py-3 font-semibold text-white hover:bg-indigo-700"
                            >
                                Proceed to Checkout
                            </Link>
                        </div>
                    </section>
                </div>
            )}
        </main>
    );
}
