import { PaginationProps } from "./PaginationProps";
import { Recipe } from "./Recipe";
import { Tag } from "./Tag";

export interface TagPageProps {
    tag: Tag;
    recipes: Recipe[];
    pagination: PaginationProps,
}
