
export interface Product {
    id: number;
    title: string;
    description: string;
    price: number;
    discountPercentage: number;
    rating: number;
    stock: number;
    brand?: string;
    category: string;
    thumbnail: string;
    images: string[];
}

export interface ProductsResponse {
    products: Product[];
    total: number;
    skip: number;
    limit: number;
}

export type CatalogSortOption =
    | "default"
    | "price-asc"
    | "price-desc"
    | "rating-desc"
    | "title-asc";

export interface CatalogParams {
    page: number;
    limit: number;
    search: string;
    category: string;
    sort: CatalogSortOption;
}
