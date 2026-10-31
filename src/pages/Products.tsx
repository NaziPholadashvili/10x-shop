
import { useCallback, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { getCategories, getProducts } from "../api/products";
import type {
    Product,
    CatalogSortOption,
} from "../types/product";
import ProductCard from "../components/ProductCard";

const PAGE_SIZE = 12;

const SORT_OPTIONS: CatalogSortOption[] = [
    "default",
    "price-asc",
    "price-desc",
    "rating-desc",
    "title-asc",
];

interface SearchFieldProps {
    initialValue: string;
    onSearch: (value: string) => void;
}

// Search input has its own local state.
// The key in Products synchronizes it with URL changes.
function SearchField({
    initialValue,
    onSearch,
}: SearchFieldProps) {
    const [value, setValue] = useState(initialValue);

    useEffect(() => {
        if (value === initialValue) {
            return;
        }

        const timeoutId = window.setTimeout(() => {
            onSearch(value.trim());
        }, 400);

        return () => {
            window.clearTimeout(timeoutId);
        };
    }, [value, initialValue, onSearch]);

    return (
        <div>
            <label
                htmlFor="product-search"
                className="mb-2 block font-medium text-slate-700"
            >
                Search Products
            </label>

            <input
                id="product-search"
                type="search"
                value={value}
                onChange={(event) => setValue(event.target.value)}
                placeholder="Search by product name..."
                className="w-full rounded-lg border border-slate-300 bg-white p-3 outline-none focus:border-indigo-500"
            />
        </div>
    );
}

function getValidPage(value: string | null): number {
    const page = Number(value);

    if (
        !value ||
        !Number.isSafeInteger(page) ||
        page < 1
    ) {
        return 1;
    }

    return page;
}

function getValidSort(
    value: string | null
): CatalogSortOption {
    if (
        value &&
        SORT_OPTIONS.includes(value as CatalogSortOption)
    ) {
        return value as CatalogSortOption;
    }

    return "default";
}

export default function Products() {
    const [searchParams, setSearchParams] = useSearchParams();

    const search = searchParams.get("q") ?? "";
    const category = searchParams.get("category") ?? "all";
    const sort = getValidSort(searchParams.get("sort"));
    const page = getValidPage(searchParams.get("page"));

    const [products, setProducts] = useState<Product[]>([]);
    const [categories, setCategories] = useState<string[]>([]);
    const [total, setTotal] = useState(0);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [retryCount, setRetryCount] = useState(0);

    // Update URL after the search debounce.
    const handleSearch = useCallback(
        (value: string) => {
            const nextParams = new URLSearchParams();

            if (value) {
                nextParams.set("q", value);
            }

            if (sort !== "default") {
                nextParams.set("sort", sort);
            }

            setLoading(true);
            setSearchParams(nextParams);
        },
        [sort, setSearchParams]
    );

    // Fetch products whenever URL filters or page change.
    useEffect(() => {
        const controller = new AbortController();

        async function loadProducts() {
            try {
                const data = await getProducts(
                    {
                        page,
                        limit: PAGE_SIZE,
                        search,
                        category,
                        sort,
                    },
                    controller.signal
                );

                if (!controller.signal.aborted) {
                    setProducts(data.products);
                    setTotal(data.total);
                    setError(null);
                    setLoading(false);
                }
            } catch {
                if (!controller.signal.aborted) {
                    setError("Failed to load products.");
                    setLoading(false);
                }
            }
        }

        void loadProducts();

        return () => {
            controller.abort();
        };
    }, [page, search, category, sort, retryCount]);

    // Load categories independently.
    useEffect(() => {
        const controller = new AbortController();

        async function loadCategories() {
            try {
                const data = await getCategories(controller.signal);

                if (!controller.signal.aborted) {
                    setCategories(data);
                }
            } catch (error) {
                if (!controller.signal.aborted) {
                    console.error(
                        "Failed to load categories:",
                        error
                    );
                }
            }
        }

        void loadCategories();

        return () => {
            controller.abort();
        };
    }, []);

    const totalPages = Math.max(
        1,
        Math.ceil(total / PAGE_SIZE)
    );

    const handleCategoryChange = (value: string) => {
        const nextParams = new URLSearchParams();

        if (value !== "all") {
            nextParams.set("category", value);
        }

        if (sort !== "default") {
            nextParams.set("sort", sort);
        }

        setLoading(true);
        setSearchParams(nextParams);
    };

    const handleSortChange = (
        value: CatalogSortOption
    ) => {
        const nextParams = new URLSearchParams();

        if (search.trim()) {
            nextParams.set("q", search);
        } else if (category !== "all") {
            nextParams.set("category", category);
        }

        if (value !== "default") {
            nextParams.set("sort", value);
        }

        setLoading(true);
        setSearchParams(nextParams);
    };

    const handlePageChange = (nextPage: number) => {
        if (
            nextPage < 1 ||
            nextPage > totalPages ||
            nextPage === page
        ) {
            return;
        }

        const nextParams = new URLSearchParams(searchParams);
        nextParams.set("page", String(nextPage));

        setLoading(true);
        setSearchParams(nextParams);

        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    const handleClearFilters = () => {
        setLoading(true);
        setSearchParams(new URLSearchParams());
    };

    // Local sorting fallback for the returned page.
    const sortedProducts = [...products];

    switch (sort) {
        case "price-asc":
            sortedProducts.sort((a, b) => a.price - b.price);
            break;

        case "price-desc":
            sortedProducts.sort((a, b) => b.price - a.price);
            break;

        case "rating-desc":
            sortedProducts.sort((a, b) => b.rating - a.rating);
            break;

        case "title-asc":
            sortedProducts.sort((a, b) =>
                a.title.localeCompare(b.title)
            );
            break;

        default:
            break;
    }

    const hasFilters =
        search.trim() !== "" ||
        category !== "all" ||
        sort !== "default";

    return (
        <main className="mx-auto max-w-7xl p-8">
            <h1 className="mb-8 text-3xl font-bold text-slate-900">
                Our Products
            </h1>

            <div className="mb-6 grid gap-4 md:grid-cols-3">
                <SearchField
                    key={search}
                    initialValue={search}
                    onSearch={handleSearch}
                />

                <div>
                    <label
                        htmlFor="category-filter"
                        className="mb-2 block font-medium text-slate-700"
                    >
                        Filter by Category
                    </label>

                    <select
                        id="category-filter"
                        value={category}
                        onChange={(event) =>
                            handleCategoryChange(event.target.value)
                        }
                        className="w-full rounded-lg border border-slate-300 bg-white p-3 outline-none focus:border-indigo-500"
                    >
                        <option value="all">
                            All Categories
                        </option>

                        {categories.map((item) => (
                            <option key={item} value={item}>
                                {item}
                            </option>
                        ))}
                    </select>
                </div>

                <div>
                    <label
                        htmlFor="product-sort"
                        className="mb-2 block font-medium text-slate-700"
                    >
                        Sort Products
                    </label>

                    <select
                        id="product-sort"
                        value={sort}
                        onChange={(event) =>
                            handleSortChange(
                                event.target.value as CatalogSortOption
                            )
                        }
                        className="w-full rounded-lg border border-slate-300 bg-white p-3 outline-none focus:border-indigo-500"
                    >
                        <option value="default">
                            Default
                        </option>

                        <option value="price-asc">
                            Price: Low to High
                        </option>

                        <option value="price-desc">
                            Price: High to Low
                        </option>

                        <option value="rating-desc">
                            Rating: High to Low
                        </option>

                        <option value="title-asc">
                            Title: A to Z
                        </option>
                    </select>
                </div>
            </div>

            {hasFilters && (
                <button
                    type="button"
                    onClick={handleClearFilters}
                    className="mb-6 rounded-lg border border-slate-300 px-4 py-2 font-medium text-slate-700 hover:bg-slate-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                    Clear Filters
                </button>
            )}

            {loading ? (
                <p role="status" className="text-slate-600">
                    Loading products...
                </p>
            ) : error ? (
                <div>
                    <p role="alert" className="mb-4 text-red-600">
                        {error}
                    </p>

                    <button
                        type="button"
                        onClick={() => {
                            setLoading(true);
                            setError(null);
                            setRetryCount((count) => count + 1);
                        }}
                        className="rounded-lg bg-indigo-600 px-4 py-2 font-medium text-white hover:bg-indigo-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                        Try Again
                    </button>
                </div>
            ) : (
                <>
                    {sortedProducts.length === 0 ? (
                        <p className="text-slate-600">
                            No products found.
                        </p>
                    ) : (
                        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                            {sortedProducts.map((product) => (
                                <ProductCard
                                    key={product.id}
                                    product={product}
                                />
                            ))}
                        </div>
                    )}

                    {totalPages > 1 && (
                        <nav
                            aria-label="Product pagination"
                            className="mt-10 flex flex-wrap items-center justify-center gap-4"
                        >
                            <button
                                type="button"
                                onClick={() =>
                                    handlePageChange(page - 1)
                                }
                                disabled={page === 1}
                                className="rounded-lg border border-slate-300 px-4 py-2 font-medium text-slate-700 hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-50"
                            >
                                Previous
                            </button>

                            <span className="text-sm font-medium text-slate-700">
                                Page {page} of {totalPages}
                            </span>

                            <button
                                type="button"
                                onClick={() =>
                                    handlePageChange(page + 1)
                                }
                                disabled={page >= totalPages}
                                className="rounded-lg border border-slate-300 px-4 py-2 font-medium text-slate-700 hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-50"
                            >
                                Next
                            </button>
                        </nav>
                    )}
                </>
            )}
        </main>
    );
}
