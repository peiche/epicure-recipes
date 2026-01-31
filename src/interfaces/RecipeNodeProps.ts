import Product from "./Product";
import Recipe from "./Recipe";
import Tag from "./Tag";

export default interface RecipeNodeProps {
    errors?: any;
    data?: {
        allRecipesJson: {
            edges: Array<{ node: Recipe }>;
        };
        allTagsJson: {
            edges: Array<{ node: Tag }>;
        };
        allProductsJson: {
            edges: Array<{ node: Product }>;
        };
    };
}
