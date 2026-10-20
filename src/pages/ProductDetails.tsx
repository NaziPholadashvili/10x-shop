
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getProductById } from "../api/products";
import type { Product } from "../types/product";

export default function ProductDetails() {
    const { id } = useParams<{ id: string }>();

    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

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

                <Link to="/products" className="mt-4 inline-block text-indigo-600">
                    Back to Products
                </Link>
            </main>
        );
    }

    return (
        <main className="mx-auto max-w-6xl p-8">
            <Link to="/products" className="text-indigo-600 hover:underline">
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
                </section>
            </div>
        </main>
    );
}
