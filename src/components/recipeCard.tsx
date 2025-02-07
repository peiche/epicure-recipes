import NextLink from 'next/link';
import { Recipe, RecipeLite } from "../interfaces/Recipe"
import { Card, CardContent, CardMedia, Link, Typography } from '@mui/material';

interface RecipeCardProps {
    recipe: Recipe | RecipeLite;
}

export default function RecipeCard({ recipe }: RecipeCardProps) {
    return (
        <Link component={NextLink} href={`/recipe/${recipe.slug}`} underline='none'>
            <Card variant='outlined' sx={{ height: '100%' }}>
                {recipe.image && (
                    <CardMedia
                        component='img'
                        height='194'
                        image={`/processed/${recipe.image}`}
                        alt=''
                    />
                )}
                <CardContent>
                    <Typography variant='h6' component='div' sx={{
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',

                    }}>
                        {recipe.name}
                    </Typography>
                    {recipe.description && (
                        <Typography variant='body2' mt={1} sx={{
                            display: '-webkit-box',
                            WebkitLineClamp: 3,
                            WebkitBoxOrient: 'vertical',
                            overflow: 'hidden',
                        }}>
                            {recipe.description}
                        </Typography>
                    )}

                </CardContent>
            </Card>
        </Link>
    )
}