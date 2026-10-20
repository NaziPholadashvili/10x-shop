
import { Link } from "react-router-dom";
import type { Product } from "../types/product";

interface ProductCardProps {
    product: Product;
}

export default function ProductCard({
    product,
}: ProductCardProps) {
    return (
        <Link
            to={`/products/${product.id}`}
            className="block rounded-xl bg-white p-4 shadow-sm transition hover:shadow-md"
        >
            <article>
                <img
                    src={product.thumbnail}
                    alt={product.title}
                    loading="lazy"
                    className="h-48 w-full object-contain"
                />

                <h2 className="mt-4 font-semibold text-slate-900">
                    {product.title}
                </h2>

                <p className="mt-2 font-bold text-indigo-600">
                    ${product.price.toFixed(2)}
                </p>
            </article>
        </Link>
    );
}
