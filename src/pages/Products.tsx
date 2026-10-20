
import { useEffect, useState } from "react";
import { getProducts } from "../api/products";
import type { Product } from "../types/product";

export default function Products() {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const controller = new AbortController();

        async function loadProducts() {
            try {
                setLoading(true);
                setError(null);

                const data = await getProducts();
                if (!controller.signal.aborted) {
                    setProducts(data.products);
                }
            } catch {
                if (!controller.signal.aborted) {
                    setError("Failed to load products.");
                }
            } finally {
                if (!controller.signal.aborted) {
                    setLoading(false);
                }
            }
        }

        loadProducts();

        return () => controller.abort();
    }, []);

    if (loading) {
        return <p className="p-8">Loading products...</p>;
    }

    if (error) {
        return <p role="alert" className="p-8 text-red-600">{error}</p>;
    }

    return (
        <main className="mx-auto max-w-7xl p-8">
            <h1 className="mb-8 text-3xl font-bold">
                Our Products
            </h1>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {products.map((product) => (
                    <article
                        key={product.id}
                        className="rounded-xl bg-white p-4 shadow-sm"
                    >
                        <img
                            src={product.thumbnail}
                            alt={product.title}
                            className="h-48 w-full object-contain"
                        />

                        <h2 className="mt-4 font-semibold">
                            {product.title}
                        </h2>

                        <p className="mt-2 font-bold text-indigo-600">
                            ${product.price}
                        </p>
                    </article>
                ))}
            </div>
        </main>
    );
}
