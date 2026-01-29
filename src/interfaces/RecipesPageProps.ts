import { PaginationProps } from "./PaginationProps";
import { Recipe } from "./Recipe";

export interface RecipesPageProps {
    recipes: Recipe[];
    pagination: PaginationProps;
    totalCount: number;
}
