
import { useEffect, useState } from "react";
import { getProducts } from "../api/products";
import type { Product } from "../types/product";
import ProductCard from "../components/ProductCard";

type SortOption =
    | "default"
    | "price-asc"
    | "price-desc"
    | "rating-desc";

export default function Products() {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [retryCount, setRetryCount] = useState(0);

    const [search, setSearch] = useState("");
    const [category, setCategory] = useState("all");
    const [sort, setSort] = useState<SortOption>("default");

    useEffect(() => {
        let active = true;

        async function loadProducts() {
            setLoading(true);
            setError(null);

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
    }, [retryCount]);

    const categories = Array.from(
        new Set(products.map((product) => product.category))
    ).sort();

    const filteredProducts = products.filter((product) => {
        const matchesSearch = product.title
            .toLowerCase()
            .includes(search.trim().toLowerCase());

        const matchesCategory =
            category === "all" || product.category === category;

        return matchesSearch && matchesCategory;
    });

    const sortedProducts = [...filteredProducts];

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

        default:
            break;
    }

    if (loading) {
        return (
            <p role="status" className="p-8 text-slate-600">
                Loading products...
            </p>
        );
    }

    if (error) {
        return (
            <div className="p-8">
                <p role="alert" className="mb-4 text-red-600">
                    {error}
                </p>

                <button
                    type="button"
                    onClick={() =>
                        setRetryCount((count) => count + 1)
                    }
                    className="rounded-lg bg-indigo-600 px-4 py-2 font-medium text-white hover:bg-indigo-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                    Try Again
                </button>
            </div>
        );
    }

    return (
        <main className="mx-auto max-w-7xl p-8">
            <h1 className="mb-8 text-3xl font-bold text-slate-900">
                Our Products
            </h1>

            <div className="mb-8 grid gap-4 md:grid-cols-3">
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
                        value={search}
                        onChange={(event) =>
                            setSearch(event.target.value)
                        }
                        placeholder="Search by product name..."
                        className="w-full rounded-lg border border-slate-300 bg-white p-3 outline-none focus:border-indigo-500"
                    />
                </div>

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
                            setCategory(event.target.value)
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
                            setSort(event.target.value as SortOption)
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
                    </select>
                </div>
            </div>

            {sortedProducts.length === 0 ? (
                <p className="text-slate-600">
                    {products.length === 0
                        ? "No products available."
                        : "No products found."}
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
        </main>
    );
}
