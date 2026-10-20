
import type { ProductsResponse } from "../types/product";

const API_URL = "https://dummyjson.com/products";

export async function getProducts(): Promise<ProductsResponse> {
    const response = await fetch(API_URL);

    if (!response.ok) {
        throw new Error("Failed to fetch products");
    }

    return response.json();
}
