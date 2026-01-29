import { RecipesPageProps } from "./RecipesPageProps";
import { Tag } from "./Tag";

export interface TagPageProps extends RecipesPageProps {
    tag: Tag;
}
