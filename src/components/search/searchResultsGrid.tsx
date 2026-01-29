import { useHits } from "react-instantsearch";
import { Recipe, RecipeLite } from "../../interfaces/Recipe";
import { Box, Grid, Typography } from "@mui/material";
import { SearchOff } from "@mui/icons-material";
// import RecipeCard from "./recipeCard";
import { useAppSelector } from "../../redux/hooks";
import { selectView } from "../../redux/slices/viewSlice";
import React from "react";
import RecipeCard from "../recipe/recipeCard";
import RecipeListItem from "../recipe/recipeListItem";
// import RecipeListItem from "./recipeListItem";

export default function SearchResultsGrid() {
    const { items } = useHits<Recipe>();
    const view = useAppSelector(selectView);

    if (items.length === 0) {
        return (
            <Box textAlign='center' my={5}>
                <SearchOff sx={{ width: '5em', height: '5em' }} />
                <Typography variant='body1'>
                    Your search returned no results.
                </Typography>
            </Box>
        )
    }

    return (
        <Grid container spacing={2}>
            {items
                .map((item) => (
                    <React.Fragment key={item.objectID}>
                        {/* {view === 'grid' && ( */}
                            <Grid
                                size={{
                                    xs: 12,
                                    sm: 6,
                                    lg: 4,
                                }}
                            >
                                <RecipeCard recipe={item} />
                            </Grid>
                        {/* )} */}
                        {/* {view === 'list' && (
                            <Grid size={12}>
                                <RecipeListItem recipe={item} />
                            </Grid>
                        )} */}
                    </React.Fragment>
                ))}
        </Grid>
    )
};
