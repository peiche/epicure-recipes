import NextLink from 'next/link';
import { Box, Card, CardContent, CardMedia, Link, Typography } from '@mui/material';
import { AccessTime, LocalFireDepartment } from '@mui/icons-material';
import Recipe from '../../interfaces/Recipe';

interface RecipeCardProps {
    recipe: Recipe;
}

export default function RecipeCard({ recipe }: RecipeCardProps) {
    return (
        <Card
            sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                position: 'relative',
                overflow: 'hidden',
                cursor: 'pointer',
                '&:hover .recipe-image': {
                    transform: 'scale(1.05)',
                },
            }}
        >
            {/* Time Badge */}
            <Box
                sx={{
                    position: 'absolute',
                    top: 12,
                    left: 12,
                    zIndex: 2,
                    bgcolor: 'rgba(255,255,255,0.9)',
                    backdropFilter: 'blur(4px)',
                    borderRadius: '20px',
                    px: 1.5,
                    py: 0.5,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 0.5,
                }}
            >
                <AccessTime sx={{ fontSize: 16, color: 'text.secondary' }} />
                <Typography variant="caption" sx={{ fontWeight: 600 }}>
                    {recipe.totalTime}
                </Typography>
            </Box>

            {/* Image */}
            <Link component={NextLink} href={`/recipe/${recipe.slug}`} sx={{ textDecoration: 'none' }}>
                <Box sx={{ overflow: 'hidden' }}>
                    <CardMedia
                        component="img"
                        image={
                            recipe.thumbnail ? `/images/recipes/thumbs/${recipe.thumbnail}` : `/images/recipes/${recipe.image}`
                        }
                        alt={recipe.name}
                        className="recipe-image"
                        sx={{
                            height: 220,
                            objectFit: 'cover',
                            transition: 'transform 0.5s ease',
                        }}
                    />
                </Box>

                <CardContent sx={{ flexGrow: 1, pt: 2 }}>
                    {/* Category & Difficulty */}
                    {/* <Box sx={{ display: 'flex', gap: 1, mb: 1.5 }}>
                        <Chip
                            label={recipe.category}
                            size="small"
                            sx={{
                                bgcolor: 'primary.main',
                                color: 'primary.contrastText',
                                fontWeight: 500,
                                fontSize: '0.75rem',
                            }}
                        />
                    </Box> */}

                    {/* Title */}
                    <Typography
                        variant="h6"
                        component="h3"
                        sx={{
                            fontFamily: 'Playfair Display',
                            fontWeight: 600,
                            mb: 1,
                            lineHeight: 1.3,
                            color: 'text.primary',
                            display: '-webkit-box',
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: 'vertical',
                            overflow: 'hidden',
                        }}
                    >
                        {recipe.name}
                    </Typography>

                    {/* Description */}
                    <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{
                            mb: 2,
                            display: '-webkit-box',
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: 'vertical',
                            overflow: 'hidden',
                        }}
                    >
                        {recipe.description}
                    </Typography>

                    {/* Rating & Calories */}
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            mt: 'auto',
                        }}
                    >
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                            <LocalFireDepartment sx={{ fontSize: 16, color: 'warning.main' }} />
                            <Typography variant="caption" sx={{ fontWeight: 500 }}>
                                {recipe.nutritionalInformation.calories} cal
                            </Typography>
                        </Box>
                    </Box>
                </CardContent>
            </Link>
        </Card>
    )
}