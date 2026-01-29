import { Product } from "./Product";
import { RecipesPageProps } from "./RecipesPageProps";

export interface ProductPageProps extends RecipesPageProps {
    product: Product;
}
