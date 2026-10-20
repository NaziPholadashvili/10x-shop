
import { useEffect, useState } from "react";
import { getProducts } from "../api/products";
import type { Product } from "../types/product";
import ProductCard from "../components/ProductCard";

export default function Products() {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        let active = true;

        async function loadProducts() {
            try {
                const data = await getProducts();

                if (active) {
                    setProducts(data.products);
                }
            } catch {
                if (active) {
                    setError("Failed to load products.");
                }
            } finally {
                if (active) {
                    setLoading(false);
                }
            }
        }

        void loadProducts();

        return () => {
            active = false;
        };
    }, []);

    if (loading) {
        return (
            <p className="p-8 text-slate-600">
                Loading products...
            </p>
        );
    }

    if (error) {
        return (
            <p role="alert" className="p-8 text-red-600">
                {error}
            </p>
        );
    }

    return (
        <main className="mx-auto max-w-7xl p-8">
            <h1 className="mb-8 text-3xl font-bold text-slate-900">
                Our Products
            </h1>

            {products.length === 0 ? (
                <p className="text-slate-600">
                    No products available.
                </p>
            ) : (
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                    {products.map((product) => (
                        <ProductCard
                            key={product.id}
                            product={product}
                        />
                    ))}
                </div>
            )}
        </main>
    );
}
