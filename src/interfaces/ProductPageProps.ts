import Product from "./Product";
import RecipesPageProps from "./RecipesPageProps";

export default interface ProductPageProps extends RecipesPageProps {
    product: Product;
}
