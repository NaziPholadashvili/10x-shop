
import type {
    Product,
    ProductsResponse,
    CatalogParams,
} from "../types/product";

const API_URL = "https://dummyjson.com/products";

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
    const response = await fetch(
        buildProductsUrl(params),
        { signal }
    );

    if (!response.ok) {
        throw new Error(
            `Failed to fetch products (HTTP ${response.status})`
        );
    }

    return (await response.json()) as ProductsResponse;
}

export async function getCategories(
    signal?: AbortSignal
): Promise<string[]> {
    const response = await fetch(
        `${API_URL}/category-list`,
        { signal }
    );

    if (!response.ok) {
        throw new Error(
            `Failed to fetch categories (HTTP ${response.status})`
        );
    }

    return (await response.json()) as string[];
}

export async function getProductById(
    id: string,
    signal?: AbortSignal
): Promise<Product> {
    const response = await fetch(
        `${API_URL}/${encodeURIComponent(id)}`,
        { signal }
    );

    if (!response.ok) {
        throw new Error(
            `Failed to fetch product (HTTP ${response.status})`
        );
    }

    return (await response.json()) as Product;
}
