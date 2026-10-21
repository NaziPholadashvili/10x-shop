import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import type { Product } from "../types/product";

interface ProductCardProps {
    product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
    const { addToCart } = useCart();

    return (
        <article className="rounded-xl bg-white p-4 shadow-sm transition hover:shadow-md">
            <Link to={`/products/${product.id}`} className="block">
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
            </Link>

            <button
                type="button"
                onClick={() => addToCart(product)}
                disabled={product.stock < 1}
                className="mt-4 w-full rounded-lg bg-indigo-600 px-4 py-2 font-semibold text-white hover:bg-indigo-700 disabled:cursor-not-allowed disabled:bg-slate-400"
            >
                {product.stock < 1 ? "Out of Stock" : "Add to Cart"}
            </button>
        </article>
    );
}