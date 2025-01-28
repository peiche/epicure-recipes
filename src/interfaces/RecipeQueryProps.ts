import { RecipeJson } from "./RecipeJson";

export interface RecipeQueryProps {
    data: {
        allDataJson: {
            nodes: Array<RecipeJson>;
        };
    };
}
