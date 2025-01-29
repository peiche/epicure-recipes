import { Recipe } from "./Recipe";

export interface RecipeQueryProps {
    data: {
        allRecipesJson: {
            nodes: Array<Recipe>;
        };
    };
}
