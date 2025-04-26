import { Card, CardContent, CardMedia, Link, Typography } from "@mui/material";
import NextLink from "next/link";
import { Recipe, RecipeLite } from "../interfaces/Recipe";

interface RecipeCardProps {
    recipe: Recipe | RecipeLite;
}

export default function RecipeListItem({ recipe }: RecipeCardProps) {
    return (
        <Link component={NextLink} href={`/recipe/${recipe.slug}`} underline='none'>
            <Card variant='outlined' sx={{ display: 'flex' }}>
                <CardMedia
                    component="img"
                    sx={{ width: 151 }} // 151
                    image={`/processed/${recipe.image}`}
                    alt="Live from space album cover"
                />
                <CardContent>
                    <Typography component="div" variant="h5">
                        {recipe.name}
                    </Typography>
                    <Typography
                        variant="subtitle1"
                        component="div"
                        sx={{ color: 'text.secondary' }}
                    >
                        {recipe.description}
                    </Typography>
                </CardContent>
            </Card>
        </Link>
    )
}
