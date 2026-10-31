
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getProductById } from "../api/products";
import { useCart } from "../context/useCart";
import type { Product } from "../types/product";

export default function ProductDetails() {
    const { id } = useParams<{ id: string }>();
    const { addToCart, items } = useCart();

    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [quantity, setQuantity] = useState(1);
    const [quantityInput, setQuantityInput] = useState("1");

    useEffect(() => {
        let active = true;

        async function loadProduct() {
            if (!id) {
                setError("Product ID is missing.");
                setLoading(false);
                return;
            }

            setLoading(true);
            setError(null);
            setProduct(null);

            try {
                const data = await getProductById(id);

                if (active) {
                    setProduct(data);
                    setQuantity(1);
                    setQuantityInput("1");
                }
            } catch {
                if (active) {
                    setError("Product not found or failed to load.");
                }
            } finally {
                if (active) {
                    setLoading(false);
                }
            }
        }

        void loadProduct();

        return () => {
            active = false;
        };
    }, [id]);

    if (loading) {
        return <p className="p-8">Loading product...</p>;
    }

    if (error || !product) {
        return (
            <main className="p-8">
                <p role="alert" className="text-red-600">
                    {error || "Product not found."}
                </p>

                <Link
                    to="/"
                    className="mt-4 inline-block text-indigo-600"
                >
                    Back to Products
                </Link>
            </main>
        );
    }

    const cartItem = items.find(
        (item) => item.product.id === product.id
    );

    const quantityInCart = cartItem?.quantity ?? 0;

    const remainingStock = Math.max(
        0,
        product.stock - quantityInCart
    );

    const selectedQuantity = Math.min(
        quantity,
        Math.max(1, remainingStock)
    );

    function changeQuantity(nextQuantity: number) {
        const safeQuantity = Math.max(
            1,
            Math.min(nextQuantity, remainingStock)
        );

        setQuantity(safeQuantity);
        setQuantityInput(String(safeQuantity));
    }

    function handleQuantityInput(value: string) {
        if (value === "") {
            setQuantityInput("");
            return;
        }

        if (!/^\d+$/.test(value)) {
            return;
        }

        setQuantityInput(value);

        const parsedQuantity = Number(value);

        if (
            Number.isSafeInteger(parsedQuantity) &&
            parsedQuantity >= 1 &&
            parsedQuantity <= remainingStock
        ) {
            setQuantity(parsedQuantity);
        }
    }

    function handleQuantityBlur() {
        const parsedQuantity = Number(quantityInput);

        if (
            !Number.isSafeInteger(parsedQuantity) ||
            parsedQuantity < 1
        ) {
            changeQuantity(1);
            return;
        }

        changeQuantity(parsedQuantity);
    }

    function handleAddToCart() {
        if (!product || remainingStock === 0) {
            return;
        }

        const parsedQuantity = Number(quantityInput);

        if (
            !Number.isSafeInteger(parsedQuantity) ||
            parsedQuantity < 1
        ) {
            return;
        }

        const safeQuantity = Math.min(
            parsedQuantity,
            remainingStock
        );

        addToCart(product, safeQuantity);

        setQuantity(1);
        setQuantityInput("1");
    }

    const parsedInput = Number(quantityInput);

    const isQuantityValid =
        quantityInput !== "" &&
        /^\d+$/.test(quantityInput) &&
        Number.isSafeInteger(parsedInput) &&
        parsedInput >= 1 &&
        parsedInput <= remainingStock;

    return (
        <main className="mx-auto max-w-6xl p-8">
            <Link
                to="/"
                className="text-indigo-600 hover:underline"
            >
                ← Back to Products
            </Link>

            <div className="mt-8 grid gap-10 md:grid-cols-2">
                <img
                    src={product.thumbnail}
                    alt={product.title}
                    className="w-full rounded-xl bg-white object-contain"
                />

                <section>
                    <h1 className="text-3xl font-bold text-slate-900">
                        {product.title}
                    </h1>

                    <p className="mt-4 text-2xl font-bold text-indigo-600">
                        ${product.price.toFixed(2)}
                    </p>

                    <p className="mt-6 text-slate-600">
                        {product.description}
                    </p>

                    <p className="mt-4 text-slate-700">
                        <strong>Category:</strong> {product.category}
                    </p>

                    <p className="mt-2 text-slate-700">
                        <strong>Stock:</strong> {product.stock}
                    </p>

                    <p className="mt-2 text-slate-700">
                        <strong>Rating:</strong> {product.rating}
                    </p>

                    <div className="mt-6">
                        <label
                            htmlFor="product-quantity"
                            className="mb-2 block font-medium text-slate-700"
                        >
                            Quantity
                        </label>

                        <div className="inline-flex items-center gap-3 rounded-lg border border-slate-300 bg-white px-3 py-2">
                            <button
                                type="button"
                                aria-label="Decrease quantity"
                                onClick={() =>
                                    changeQuantity(
                                        selectedQuantity - 1
                                    )
                                }
                                disabled={
                                    remainingStock === 0 ||
                                    selectedQuantity <= 1
                                }
                                className="px-2 text-xl disabled:cursor-not-allowed disabled:opacity-40"
                            >
                                −
                            </button>

                            <input
                                id="product-quantity"
                                type="text"
                                inputMode="numeric"
                                value={quantityInput}
                                onChange={(event) =>
                                    handleQuantityInput(
                                        event.target.value
                                    )
                                }
                                onBlur={handleQuantityBlur}
                                disabled={remainingStock === 0}
                                aria-invalid={
                                    !isQuantityValid &&
                                    remainingStock > 0
                                }
                                className="w-16 rounded border border-slate-300 bg-white px-2 py-1 text-center font-semibold"
                            />

                            <button
                                type="button"
                                aria-label="Increase quantity"
                                onClick={() =>
                                    changeQuantity(
                                        selectedQuantity + 1
                                    )
                                }
                                disabled={
                                    remainingStock === 0 ||
                                    selectedQuantity >= remainingStock
                                }
                                className="px-2 text-xl disabled:cursor-not-allowed disabled:opacity-40"
                            >
                                +
                            </button>
                        </div>

                        <p className="mt-2 text-sm text-slate-500">
                            Available to add: {remainingStock}
                        </p>
                    </div>

                    <button
                        type="button"
                        onClick={handleAddToCart}
                        disabled={
                            remainingStock === 0 ||
                            !isQuantityValid
                        }
                        className="mt-6 rounded-lg bg-indigo-600 px-6 py-3 font-semibold text-white hover:bg-indigo-700 disabled:cursor-not-allowed disabled:bg-slate-400"
                    >
                        {remainingStock > 0
                            ? "Add to Cart"
                            : "Out of Stock"}
                    </button>
                </section>
            </div>
        </main>
    );
}
