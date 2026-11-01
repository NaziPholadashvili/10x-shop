
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getRelatedProducts } from "../api/products";
import type { Product } from "../types/product";

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
                        <Link
                            key={relatedProduct.id}
                            to={`/products/${relatedProduct.id}`}
                            className="overflow-hidden rounded-xl border border-slate-200 bg-white transition hover:border-indigo-400 hover:shadow-md"
                        >
                            <div className="flex aspect-square items-center justify-center bg-slate-50 p-4">
                                <img
                                    src={relatedProduct.thumbnail}
                                    alt={relatedProduct.title}
                                    loading="lazy"
                                    className="h-full w-full object-contain"
                                />
                            </div>

                            <div className="p-4">
                                <h3 className="font-semibold text-slate-900">
                                    {relatedProduct.title}
                                </h3>

                                <p className="mt-2 font-bold text-indigo-600">
                                    ${relatedProduct.price.toFixed(2)}
                                </p>
                            </div>
                        </Link>
                    ))}
                </div>
            )}
        </section>
    );
}
