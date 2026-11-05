
import type {
    Product,
    ProductsResponse,
    CatalogParams,
} from "../types/product";

import { ApiError, isApiError } from "../errors/ApiError";

const API_URL = "https://dummyjson.com/products";

async function fetchJson<T>(
    url: string,
    errorMessage: string,
    signal?: AbortSignal
): Promise<T> {
    try {
        const response = await fetch(url, { signal });

        if (!response.ok) {
            throw new ApiError(
                `${errorMessage} (HTTP ${response.status})`,
                response.status
            );
        }

        return (await response.json()) as T;
    } catch (error: unknown) {
        if (isApiError(error)) {
            // HTTP errors retain their original message and status.
            throw error;
        }

        // Preserve AbortError, network errors and other failures.
        throw error;
    }
}

export function buildProductsUrl(
    params: CatalogParams
): string {
    const { page, limit, search, category, sort } = params;

    const skip = (page - 1) * limit;

    let url = API_URL;

    if (search.trim()) {
        url += "/search";
    } else if (category !== "all") {
        url += `/category/${encodeURIComponent(category)}`;
    }

    const query = new URLSearchParams({
        limit: String(limit),
        skip: String(skip),
    });

    if (search.trim()) {
        query.set("q", search.trim());
    }

    switch (sort) {
        case "price-asc":
            query.set("sortBy", "price");
            query.set("order", "asc");
            break;

        case "price-desc":
            query.set("sortBy", "price");
            query.set("order", "desc");
            break;

        case "rating-desc":
            query.set("sortBy", "rating");
            query.set("order", "desc");
            break;

        case "title-asc":
            query.set("sortBy", "title");
            query.set("order", "asc");
            break;

        default:
            break;
    }

    return `${url}?${query.toString()}`;
}

export async function getProducts(
    params: CatalogParams = {
        page: 1,
        limit: 12,
        search: "",
        category: "all",
        sort: "default",
    },
    signal?: AbortSignal
): Promise<ProductsResponse> {
    return fetchJson<ProductsResponse>(
        buildProductsUrl(params),
        "Failed to fetch products",
        signal
    );
}

export async function getCategories(
    signal?: AbortSignal
): Promise<string[]> {
    return fetchJson<string[]>(
        `${API_URL}/category-list`,
        "Failed to fetch categories",
        signal
    );
}

export async function getProductById(
    id: string,
    signal?: AbortSignal
): Promise<Product> {
    return fetchJson<Product>(
        `${API_URL}/${encodeURIComponent(id)}`,
        "Failed to fetch product",
        signal
    );
}

export async function getRelatedProducts(
    category: string,
    currentProductId: number,
    signal?: AbortSignal
): Promise<Product[]> {
    const data = await fetchJson<ProductsResponse>(
        `${API_URL}/category/${encodeURIComponent(category)}?limit=5`,
        "Failed to fetch related products",
        signal
    );

    return data.products
        .filter((product) => product.id !== currentProductId)
        .slice(0, 4);
}
