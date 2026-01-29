import { Box, Button, Container, Grid, Typography } from "@mui/material";
// import Grid from "@mui/material/Grid2"; // Use Grid2 for MUI v7
import { ArrowForward } from '@mui/icons-material';
import NextLink from "next/link";
// import RecipeCard from "../recipe/RecipeCard"; // Assuming this is your card component
import { Recipe } from "../../interfaces/Recipe";
import RecipeCard from "../recipe/recipeCard";

interface FeaturedRecipesProps {
    recipes: Recipe[];
}

export default function FeaturedRecipes({ recipes }: FeaturedRecipesProps) {
    return (
        <Box sx={{ py: { xs: 6, md: 10 }, bgcolor: 'background.default' }}>
            <Container maxWidth="xl">
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: { xs: 'column', md: 'row' },
                        justifyContent: 'space-between',
                        alignItems: { xs: 'flex-start', md: 'center' },
                        mb: 4,
                        gap: 2,
                    }}
                >
                    <Box>
                        <Typography
                            variant="h2"
                            sx={{
                                fontFamily: 'var(--font-playfair)', // Use your Google Font
                                fontSize: { xs: '2rem', md: '2.75rem' },
                                fontWeight: 700,
                                mb: 1,
                            }}
                        >
                            Featured Recipes
                        </Typography>
                        <Typography variant="body1" color="text.secondary">
                            Hand-picked favorites
                        </Typography>
                    </Box>

                    <Button
                        endIcon={<ArrowForward />}
                        component={NextLink}
                        href="/recipes"
                        sx={{
                            color: 'primary.main',
                            fontWeight: 600,
                            '&:hover': {
                                bgcolor: 'transparent',
                                textDecoration: 'underline',
                            },
                        }}
                    >
                        View All Recipes
                    </Button>
                </Box>

                <Grid container spacing={3}>
                    {recipes.map((recipe, index) => (
                        <Grid
                            size={{ xs: 12, sm: 6, md: 4, lg: 3 }}
                            key={index}
                            sx={{
                                animation: `fadeIn 0.5s ease-out ${index * 0.1}s both`,
                                '@keyframes fadeIn': {
                                    from: { opacity: 0, transform: 'translateY(20px)' },
                                    to: { opacity: 1, transform: 'translateY(0)' },
                                },
                            }}
                        >
                            <RecipeCard recipe={recipe} />
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </Box>
    );
}