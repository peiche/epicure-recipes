import { RecipeJson } from "./RecipeJson";

export interface RecipeNodeProps {
    errors?: any;
    data?: {
        allDataJson: {
            edges: Array<{ node: RecipeJson }>;
            distinct: Array<string>;
        };
    };
}
