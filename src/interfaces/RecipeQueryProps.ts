import Recipe from "./Recipe";

export default interface RecipeQueryProps {
    data: {
        allRecipesJson: {
            nodes: Array<Recipe>;
        };
    };
}
