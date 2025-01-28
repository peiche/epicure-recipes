import { RecipeQueryProps } from "./RecipeQueryProps";

export interface TagTemplateProps extends RecipeQueryProps {
    pageContext: {
        tag: string;
    };
}
