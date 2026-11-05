
import { Link } from "react-router-dom";
import { useCart } from "../context/useCart";
import type { Product } from "../types/product";
import { discountedPrice, formatPrice } from "../utils/price";

interface ProductCardProps {
    product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
    const { items, addToCart } = useCart();

    const cartItem = items.find(
        (item) => item.product.id === product.id
    );

    const cartQuantity = cartItem?.quantity ?? 0;

    const availableStock = Math.max(
        0,
        product.stock - cartQuantity
    );

    const isOutOfStock = availableStock === 0;

    const hasDiscount = product.discountPercentage >= 1;
    const finalPrice = hasDiscount
        ? discountedPrice(product.price, product.discountPercentage)
        : product.price;

    return (
        <article className="rounded-xl bg-white p-4 shadow-sm transition hover:shadow-md">
            <Link to={`/products/${product.id}`} className="block">
                <img
                    src={product.thumbnail}
                    alt={product.title}
                    loading="lazy"
                    width={320}
                    height={192}
                    className="h-48 w-full object-contain"
                />

                <h2 className="mt-4 font-semibold text-slate-900">
                    {product.title}
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                    {product.category}
                    {product.brand ? ` · ${product.brand}` : ""}
                </p>

                <div className="mt-2 flex flex-wrap items-center gap-2">
                    <span className="font-bold text-indigo-600">
                        {formatPrice(finalPrice)}
                    </span>

                    {hasDiscount && (
                        <>
                            <span className="text-sm text-slate-400 line-through">
                                {formatPrice(product.price)}
                            </span>

                            <span className="rounded bg-green-100 px-2 py-1 text-xs font-semibold text-green-700">
                                −{Math.round(product.discountPercentage)}%
                            </span>
                        </>
                    )}
                </div>

                <p className="mt-2 text-sm text-amber-600">
                    ★ {product.rating.toFixed(1)}
                </p>

                <p className="mt-2 text-sm font-medium">
                    {isOutOfStock ? (
                        <span className="text-red-600">Out of Stock</span>
                    ) : availableStock <= 5 ? (
                        <span className="text-orange-600">
                            Only {availableStock} left!
                        </span>
                    ) : (
                        <span className="text-green-700">In stock</span>
                    )}
                </p>
            </Link>

            <button
                type="button"
                onClick={() => addToCart(product)}
                disabled={isOutOfStock}
                className="mt-4 w-full rounded-lg bg-indigo-600 px-4 py-2 font-semibold text-white hover:bg-indigo-700 disabled:cursor-not-allowed disabled:bg-slate-400"
            >
                {isOutOfStock ? "Out of Stock" : "Add to Cart"}
            </button>
        </article>
    );
}
