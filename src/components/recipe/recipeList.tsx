import React from "react";
import Recipe from "../../interfaces/Recipe"
import { Grid } from "@mui/material";
import RecipeCard from "./recipeCard";

interface RecipeListProps {
    recipes: Recipe[];
}

export default function RecipeList(props: RecipeListProps) {
    const { recipes } = props;

    return (
        <>
            {recipes
                .map((recipe, index) => (
                    <React.Fragment key={index}>
                            <Grid
                                size={{ xs: 12, sm: 6, md: 4, lg: 3 }}
                                sx={{
                                    animation: 'fadeInUp 0.5s ease forwards',
                                    animationDelay: `${index * 0.05}s`,
                                }}
                            >
                                <RecipeCard recipe={recipe} />
                            </Grid>
                    </React.Fragment>
                ))}
        </>
    )
}
