import React from "react";
import { Recipe } from "../../interfaces/Recipe"
import { Grid } from "@mui/material";
import RecipeCard from "./recipeCard";
// import RecipeListItem from "../recipeListItem";
import { useAppSelector } from "../../redux/hooks";
import { selectView } from "../../redux/slices/viewSlice";
import RecipeListItem from "./recipeListItem";

interface RecipeListProps {
    recipes: Recipe[];
}

export default function RecipeList(props: RecipeListProps) {
    const { recipes } = props;
    const view = useAppSelector(selectView);

    return (
        <>
            {recipes
                .map((recipe, index) => (
                    <React.Fragment key={index}>
                        {/* {view === 'grid' && ( */}
                            <Grid
                                // size={{
                                //     xs: 12,
                                //     sm: 6,
                                //     md: 4,
                                // }}
                                size={{ xs: 12, sm: 6, md: 4, lg: 3 }}
                                // key={recipe.id}
                                sx={{
                                    animation: 'fadeInUp 0.5s ease forwards',
                                    animationDelay: `${index * 0.05}s`,
                                    // opacity: 0,
                                }}
                            >
                                <RecipeCard recipe={recipe} />
                            </Grid>
                        {/* )} */}
                        {/* {view === 'list' && (
                            <Grid size={12}>
                                <RecipeListItem recipe={recipe} />
                            </Grid>
                        )} */}
                    </React.Fragment>
                ))}
        </>
    )
}
