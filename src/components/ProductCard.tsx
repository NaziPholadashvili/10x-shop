
import { Link } from "react-router-dom";
import { useCart } from "../context/useCart";
import { useToast } from "../context/useToast";
import type { Product } from "../types/product";
import { discountedPrice, formatPrice } from "../utils/price";

interface ProductCardProps {
    product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
    const { items, addToCart } = useCart();
    const { showToast } = useToast();

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

    function handleAddToCart() {
        if (isOutOfStock) {
            return;
        }

        addToCart(product);

        showToast("Product added to cart!", "success");
    }

    return (
        <article className="rounded-xl border border-slate-200 bg-white p-4 text-slate-900 shadow-sm transition-colors duration-200 hover:shadow-md dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100">
            <Link to={`/products/${product.id}`} className="block">
                <div className="flex h-48 items-center justify-center overflow-hidden rounded-lg bg-white p-2">
                    <img
                        src={product.thumbnail}
                        alt={product.title}
                        loading="lazy"
                        width={320}
                        height={192}
                        className="h-full w-full object-contain"
                    />
                </div>

                <h2 className="mt-4 font-semibold text-slate-900 dark:text-white">
                    {product.title}
                </h2>

                <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                    {product.category}
                    {product.brand ? ` · ${product.brand}` : ""}
                </p>

                <div className="mt-2 flex flex-wrap items-center gap-2">
                    <span className="font-bold text-indigo-600 dark:text-indigo-400">
                        {formatPrice(finalPrice)}
                    </span>

                    {hasDiscount && (
                        <>
                            <span className="text-sm text-slate-400 line-through">
                                {formatPrice(product.price)}
                            </span>

                            <span className="rounded bg-green-100 px-2 py-1 text-xs font-semibold text-green-700 dark:bg-green-900 dark:text-green-200">
                                −{Math.round(product.discountPercentage)}%
                            </span>
                        </>
                    )}
                </div>

                <p className="mt-2 text-sm text-amber-600 dark:text-amber-400">
                    ★ {product.rating.toFixed(1)}
                </p>

                <p className="mt-2 text-sm font-medium">
                    {isOutOfStock ? (
                        <span className="text-red-600 dark:text-red-400">
                            Out of Stock
                        </span>
                    ) : availableStock <= 5 ? (
                        <span className="text-orange-600 dark:text-orange-400">
                            Only {availableStock} left!
                        </span>
                    ) : (
                        <span className="text-green-700 dark:text-green-400">
                            In stock
                        </span>
                    )}
                </p>
            </Link>

            <button
                type="button"
                onClick={handleAddToCart}
                disabled={isOutOfStock}
                className="mt-4 w-full rounded-lg bg-indigo-600 px-4 py-2 font-semibold text-white hover:bg-indigo-700 disabled:cursor-not-allowed disabled:bg-slate-400"
            >
                {isOutOfStock ? "Out of Stock" : "Add to Cart"}
            </button>
        </article>
    );
}
