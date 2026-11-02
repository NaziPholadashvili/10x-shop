
import { useEffect, useState } from "react";
import { getRelatedProducts } from "../api/products";
import type { Product } from "../types/product";
import ProductCard from "./ProductCard";

type RelatedProductsProps = {
    category: string;
    currentProductId: number;
};

export default function RelatedProducts({
    category,
    currentProductId,
}: RelatedProductsProps) {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const controller = new AbortController();

        async function loadRelatedProducts() {
            setLoading(true);
            setError(null);
            setProducts([]);

            try {
                const data = await getRelatedProducts(
                    category,
                    currentProductId,
                    controller.signal
                );

                if (!controller.signal.aborted) {
                    setProducts(data);
                }
            } catch {
                if (!controller.signal.aborted) {
                    setError("Failed to load related products.");
                }
            } finally {
                if (!controller.signal.aborted) {
                    setLoading(false);
                }
            }
        }

        void loadRelatedProducts();

        return () => {
            controller.abort();
        };
    }, [category, currentProductId]);

    return (
        <section
            aria-labelledby="related-products-heading"
            className="mt-12"
        >
            <h2
                id="related-products-heading"
                className="mb-6 text-2xl font-bold text-slate-900"
            >
                Related Products
            </h2>

            {loading ? (
                <p role="status" className="text-slate-600">
                    Loading related products...
                </p>
            ) : error ? (
                <p role="alert" className="text-red-600">
                    {error}
                </p>
            ) : products.length === 0 ? (
                <p className="text-slate-600">
                    No related products available.
                </p>
            ) : (
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                    {products.map((relatedProduct) => (
                        <ProductCard
                            key={relatedProduct.id}
                            product={relatedProduct}
                        />
                    ))}
                </div>
            )}
        </section>
    );
}
