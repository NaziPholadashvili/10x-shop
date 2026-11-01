
import {
    useEffect,
    useMemo,
    useState,
} from "react";
import { Link, useParams } from "react-router-dom";
import { getProductById } from "../api/products";
import { useCart } from "../context/useCart";
import { useAuth } from "../context/useAuth";
import type {
    Product,
    ProductReview,
} from "../types/product";

const REVIEWS_STORAGE_KEY = "shop_reviews";

type StoredReviews = Record<string, ProductReview[]>;

function isProductReview(value: unknown): value is ProductReview {
    if (typeof value !== "object" || value === null) {
        return false;
    }

    const review = value as Record<string, unknown>;

    return (
        typeof review.rating === "number" &&
        Number.isInteger(review.rating) &&
        review.rating >= 1 &&
        review.rating <= 5 &&
        typeof review.comment === "string" &&
        typeof review.date === "string" &&
        typeof review.reviewerName === "string"
    );
}

function readStoredReviews(): StoredReviews {
    try {
        const saved = localStorage.getItem(REVIEWS_STORAGE_KEY);

        if (!saved) {
            return {};
        }

        const parsed: unknown = JSON.parse(saved);

        if (
            typeof parsed !== "object" ||
            parsed === null ||
            Array.isArray(parsed)
        ) {
            return {};
        }

        const result: StoredReviews = {};

        for (const [productId, value] of Object.entries(parsed)) {
            if (Array.isArray(value)) {
                result[productId] = value.filter(isProductReview);
            }
        }

        return result;
    } catch {
        return {};
    }
}

export default function ProductDetails() {
    const { id } = useParams<{ id: string }>();
    const { addToCart, items } = useCart();
    const { username } = useAuth();

    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const [quantity, setQuantity] = useState(1);
    const [quantityInput, setQuantityInput] = useState("1");

    const [activeTab, setActiveTab] = useState<
        "description" | "reviews"
    >("description");

    const [storedReviews, setStoredReviews] =
        useState<StoredReviews>(readStoredReviews);

    const [reviewRating, setReviewRating] = useState(0);
    const [reviewComment, setReviewComment] = useState("");
    const [reviewErrors, setReviewErrors] = useState<{
        rating?: string;
        comment?: string;
    }>({});

    const [reviewSuccess, setReviewSuccess] = useState(false);

    useEffect(() => {
        let active = true;

        async function loadProduct() {
            setLoading(true);
            setError(null);
            setProduct(null);

            if (!id) {
                setError("Product ID is missing.");
                setLoading(false);
                return;
            }

            try {
                const data = await getProductById(id);

                if (active) {
                    setProduct(data);
                    setQuantity(1);
                    setQuantityInput("1");
                    setActiveTab("description");
                    setReviewRating(0);
                    setReviewComment("");
                    setReviewErrors({});
                    setReviewSuccess(false);
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

    const localReviews = product
        ? storedReviews[String(product.id)] ?? []
        : [];

    const apiReviews = product?.reviews ?? [];

    const allReviews = useMemo(
        () => [...localReviews, ...apiReviews],
        // The review arrays come from product and storedReviews state.
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [product, storedReviews]
    );

    const averageRating = useMemo(() => {
        if (allReviews.length === 0) {
            return product?.rating ?? 0;
        }

        const total = allReviews.reduce(
            (sum, review) => sum + review.rating,
            0
        );

        return total / allReviews.length;
    }, [allReviews, product?.rating]);

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

    function handleReviewSubmit(
        event: React.FormEvent<HTMLFormElement>
    ) {
        event.preventDefault();

        if (!product) {
            return;
        }

        const errors: {
            rating?: string;
            comment?: string;
        } = {};

        if (reviewRating < 1 || reviewRating > 5) {
            errors.rating = "Please select a rating";
        }

        const trimmedComment = reviewComment.trim();

        if (trimmedComment.length < 10) {
            errors.comment =
                "Comment must be at least 10 characters";
        }

        setReviewErrors(errors);
        setReviewSuccess(false);

        if (Object.keys(errors).length > 0) {
            return;
        }

        const newReview: ProductReview = {
            rating: reviewRating,
            comment: trimmedComment,
            date: new Date().toISOString(),
            reviewerName: username?.trim() || "Guest",
        };

        const productId = String(product.id);

        const updatedReviews: StoredReviews = {
            ...storedReviews,
            [productId]: [
                newReview,
                ...(storedReviews[productId] ?? []),
            ],
        };

        try {
            localStorage.setItem(
                REVIEWS_STORAGE_KEY,
                JSON.stringify(updatedReviews)
            );
        } catch {
            setReviewErrors({
                comment: "Failed to save review. Please try again.",
            });
            return;
        }

        setStoredReviews(updatedReviews);
        setReviewRating(0);
        setReviewComment("");
        setReviewErrors({});
        setReviewSuccess(true);
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

                    <p className="mt-4 text-slate-700">
                        <strong>Category:</strong> {product.category}
                    </p>

                    <p className="mt-2 text-slate-700">
                        <strong>Stock:</strong> {product.stock}
                    </p>

                    <p className="mt-2 text-slate-700">
                        <strong>Rating:</strong>{" "}
                        {averageRating.toFixed(1)} / 5
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

            <section className="mt-12">
                <div
                    role="tablist"
                    aria-label="Product information"
                    className="flex gap-6 border-b border-slate-200"
                >
                    <button
                        type="button"
                        role="tab"
                        id="description-tab"
                        aria-selected={activeTab === "description"}
                        aria-controls="product-information-panel"
                        onClick={() => setActiveTab("description")}
                        className={`border-b-2 px-2 py-3 font-semibold ${activeTab === "description"
                                ? "border-indigo-600 text-indigo-600"
                                : "border-transparent text-slate-600"
                            }`}
                    >
                        Description
                    </button>

                    <button
                        type="button"
                        role="tab"
                        id="reviews-tab"
                        aria-selected={activeTab === "reviews"}
                        aria-controls="product-information-panel"
                        onClick={() => setActiveTab("reviews")}
                        className={`border-b-2 px-2 py-3 font-semibold ${activeTab === "reviews"
                                ? "border-indigo-600 text-indigo-600"
                                : "border-transparent text-slate-600"
                            }`}
                    >
                        Reviews ({allReviews.length})
                    </button>
                </div>

                <div
                    id="product-information-panel"
                    role="tabpanel"
                    aria-labelledby={
                        activeTab === "description"
                            ? "description-tab"
                            : "reviews-tab"
                    }
                    className="py-6"
                >
                    {activeTab === "description" ? (
                        <p className="leading-7 text-slate-700">
                            {product.description}
                        </p>
                    ) : (
                        <div className="space-y-8">
                            {reviewSuccess && (
                                <p
                                    role="status"
                                    className="rounded-lg bg-green-50 p-3 font-semibold text-green-700"
                                >
                                    Review added ✓
                                </p>
                            )}

                            <section>
                                <h2 className="text-xl font-bold text-slate-900">
                                    Customer Reviews
                                </h2>

                                <p className="mt-2 text-slate-600">
                                    Average rating:{" "}
                                    {averageRating.toFixed(1)} / 5
                                </p>

                                {allReviews.length === 0 ? (
                                    <p className="mt-4 text-slate-600">
                                        No reviews yet.
                                    </p>
                                ) : (
                                    <div className="mt-5 space-y-4">
                                        {allReviews.map(
                                            (review, index) => {
                                                const stars = Math.max(
                                                    0,
                                                    Math.min(
                                                        5,
                                                        Math.floor(
                                                            review.rating
                                                        )
                                                    )
                                                );

                                                return (
                                                    <article
                                                        key={`${review.reviewerName}-${review.date}-${index}`}
                                                        className="rounded-xl border border-slate-200 bg-white p-5"
                                                    >
                                                        <div className="flex flex-wrap items-center justify-between gap-2">
                                                            <h3 className="font-semibold text-slate-900">
                                                                {
                                                                    review.reviewerName
                                                                }
                                                            </h3>

                                                            <time
                                                                dateTime={
                                                                    review.date
                                                                }
                                                                className="text-sm text-slate-500"
                                                            >
                                                                {new Date(
                                                                    review.date
                                                                ).toLocaleDateString()}
                                                            </time>
                                                        </div>

                                                        <p
                                                            aria-label={`${review.rating} out of 5 stars`}
                                                            className="mt-2 text-amber-500"
                                                        >
                                                            {"★".repeat(
                                                                stars
                                                            )}
                                                            {"☆".repeat(
                                                                5 - stars
                                                            )}
                                                        </p>

                                                        <p className="mt-3 text-slate-700">
                                                            {review.comment}
                                                        </p>
                                                    </article>
                                                );
                                            }
                                        )}
                                    </div>
                                )}
                            </section>

                            <section className="rounded-xl border border-slate-200 bg-slate-50 p-6">
                                <h2 className="text-xl font-bold text-slate-900">
                                    Write a Review
                                </h2>

                                <form
                                    onSubmit={handleReviewSubmit}
                                    noValidate
                                    className="mt-5 space-y-5"
                                >
                                    <div>
                                        <label
                                            htmlFor="review-rating"
                                            className="mb-2 block font-medium text-slate-700"
                                        >
                                            Rating
                                        </label>

                                        <select
                                            id="review-rating"
                                            value={reviewRating}
                                            onChange={(event) => {
                                                setReviewRating(
                                                    Number(
                                                        event.target.value
                                                    )
                                                );
                                                setReviewSuccess(false);
                                                setReviewErrors(
                                                    (previous) => ({
                                                        ...previous,
                                                        rating: undefined,
                                                    })
                                                );
                                            }}
                                            aria-invalid={
                                                Boolean(
                                                    reviewErrors.rating
                                                )
                                            }
                                            aria-describedby={
                                                reviewErrors.rating
                                                    ? "review-rating-error"
                                                    : undefined
                                            }
                                            className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 sm:max-w-xs"
                                        >
                                            <option value={0}>
                                                Select a rating
                                            </option>
                                            <option value={1}>
                                                ★☆☆☆☆ — 1 star
                                            </option>
                                            <option value={2}>
                                                ★★☆☆☆ — 2 stars
                                            </option>
                                            <option value={3}>
                                                ★★★☆☆ — 3 stars
                                            </option>
                                            <option value={4}>
                                                ★★★★☆ — 4 stars
                                            </option>
                                            <option value={5}>
                                                ★★★★★ — 5 stars
                                            </option>
                                        </select>

                                        {reviewErrors.rating && (
                                            <p
                                                id="review-rating-error"
                                                role="alert"
                                                className="mt-2 text-sm text-red-600"
                                            >
                                                {reviewErrors.rating}
                                            </p>
                                        )}
                                    </div>

                                    <div>
                                        <label
                                            htmlFor="review-comment"
                                            className="mb-2 block font-medium text-slate-700"
                                        >
                                            Comment
                                        </label>

                                        <textarea
                                            id="review-comment"
                                            value={reviewComment}
                                            onChange={(event) => {
                                                setReviewComment(
                                                    event.target.value
                                                );
                                                setReviewSuccess(false);
                                                setReviewErrors(
                                                    (previous) => ({
                                                        ...previous,
                                                        comment: undefined,
                                                    })
                                                );
                                            }}
                                            rows={4}
                                            placeholder="Share your experience with this product..."
                                            aria-invalid={
                                                Boolean(
                                                    reviewErrors.comment
                                                )
                                            }
                                            aria-describedby={
                                                reviewErrors.comment
                                                    ? "review-comment-error"
                                                    : undefined
                                            }
                                            className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2"
                                        />

                                        {reviewErrors.comment && (
                                            <p
                                                id="review-comment-error"
                                                role="alert"
                                                className="mt-2 text-sm text-red-600"
                                            >
                                                {reviewErrors.comment}
                                            </p>
                                        )}
                                    </div>

                                    <button
                                        type="submit"
                                        className="rounded-lg bg-indigo-600 px-6 py-3 font-semibold text-white hover:bg-indigo-700"
                                    >
                                        Submit Review
                                    </button>
                                </form>
                            </section>
                        </div>
                    )}
                </div>
            </section>
        </main>
    );
}
