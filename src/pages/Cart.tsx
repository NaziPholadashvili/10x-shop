import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

export default function Cart() {
    const {
        items,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalItems,
        totalPrice,
    } = useCart();

    return (
        <main className="mx-auto max-w-5xl px-6 py-10">
            <h1 className="mb-8 text-3xl font-bold">Shopping Cart</h1>

            {items.length === 0 ? (
                <div className="rounded-xl bg-white p-8 text-center shadow-sm">
                    <p className="mb-4 text-slate-600">Your cart is empty.</p>
                    <Link to="/products" className="font-semibold text-indigo-600">
                        Browse Products
                    </Link>
                </div>
            ) : (
                <div className="space-y-6">
                    {items.map(({ product, quantity }) => (
                        <article
                            key={product.id}
                            className="flex flex-wrap items-center gap-5 rounded-xl bg-white p-5 shadow-sm"
                        >
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
                                    onClick={() => updateQuantity(product.id, quantity - 1)}
                                    disabled={quantity <= 1}
                                    className="rounded border px-3 py-1 disabled:opacity-40"
                                >
                                    −
                                </button>

                                <span>{quantity}</span>

                                <button
                                    type="button"
                                    onClick={() => updateQuantity(product.id, quantity + 1)}
                                    disabled={quantity >= product.stock}
                                    className="rounded border px-3 py-1 disabled:opacity-40"
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
                    ))}

                    <section className="rounded-xl bg-white p-6 shadow-sm">
                        <p>Total items: {totalItems}</p>
                        <p className="mt-2 text-xl font-bold">
                            Total: ${totalPrice.toFixed(2)}
                        </p>

                        <button
                            type="button"
                            onClick={clearCart}
                            className="mt-5 rounded-lg border border-red-500 px-4 py-2 text-red-600"
                        >
                            Clear Cart
                        </button>
                    </section>
                </div>
            )}
        </main>
    );
}