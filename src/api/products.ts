
import type { Product, ProductsResponse } from "../types/product";

const API_URL = "https://dummyjson.com/products";

export async function getProducts(): Promise<ProductsResponse> {
    const response = await fetch(API_URL);

    if (!response.ok) {
        throw new Error(
            `Failed to fetch products (HTTP ${response.status})`
        );
    }

    return response.json();
}

export async function getProductById(
    id: string
): Promise<Product> {
    const response = await fetch(`${API_URL}/${id}`);

    if (!response.ok) {
        throw new Error(
            `Failed to fetch product (HTTP ${response.status})`
        );
    }

    return response.json();
}
