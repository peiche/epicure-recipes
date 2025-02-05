import { PaginationProps } from "./PaginationProps";
import { Product } from "./Product";
import { Recipe } from "./Recipe";

export interface ProductPageProps {
    product: Product;
    recipes: Recipe[];
    pagination: PaginationProps,
}
