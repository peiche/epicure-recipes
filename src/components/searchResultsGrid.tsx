import { useHits } from "react-instantsearch";
import { RecipeLite } from "../interfaces/Recipe";
import { Box, Grid2 as Grid, Typography } from "@mui/material";
import { SearchOff } from "@mui/icons-material";
import RecipeCard from "./recipeCard";

export default function SearchResultsGrid() {
    const { items } = useHits<RecipeLite>();

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
            {items.map((item) => (
                <Grid key={item.objectID} size={{
                    xs: 12,
                    sm: 6,
                }}>
                    <RecipeCard recipe={item} />
                </Grid>
            ))}
        </Grid>
    )
};
