interface RecipeQueryProps {
    data: {
        allDataJson: {
            edges: Array<{ node: RecipeJson }>;
        };
    };
}
