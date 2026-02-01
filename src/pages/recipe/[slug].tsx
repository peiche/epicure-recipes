import fs from 'fs';
import path from 'path';
import { Box, Breadcrumbs, Button, Chip, Container, Divider, Grid, IconButton, Link, List, ListItem, ListItemIcon, ListItemText, Paper, Rating, Typography } from '@mui/material';
import { AccessTime, Restaurant, LocalFireDepartment, Print, CheckCircle, ArrowBack } from '@mui/icons-material';
import NextLink from 'next/link';
import Layout from '../../components/ui/layout';
import Wrapper from '../../components/layout/wrapper';
import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from 'next';
import Recipe from '../../interfaces/Recipe';
import SEO from '../../components/layout/seo';
import { useState } from 'react';
// import styles from './recipe.module.css';

interface RecipePageProps {
    recipe: Recipe;
}

export default function RecipePage({ recipe }: RecipePageProps & InferGetStaticPropsType<typeof getStaticProps>) {
    const [completedSteps, setCompletedSteps] = useState<string[]>([]);

    const toggleStep = (step: string) => {
        setCompletedSteps((prev) =>
            prev.includes(step) ? prev.filter((s) => s !== step) : [...prev, step]
        );
    };

    const handlePrint = () => {
        window.print();
    };

    return (
        <Layout>
            <style global jsx>{`
                .google-auto-placed {
                    display: none;
                }
            `}</style>
            <SEO title={recipe.name} />
            <Wrapper>
                <Box component='main' sx={{ flexGrow: 1 }}>
                    {/* Hero Image */}
                    <Box
                        className='hide-on-print'
                        sx={{
                            position: 'relative',
                            height: { xs: 300, md: 450 },
                            overflow: 'hidden',
                        }}
                    >
                        <Box
                            component="img"
                            src={`/images/recipes/${recipe.image}`}
                            alt={recipe.name}
                            sx={{
                                width: '100%',
                                height: '100%',
                                objectFit: 'cover',
                            }}
                        />
                        <Box
                            sx={{
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                right: 0,
                                bottom: 0,
                                background: 'linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 50%)',
                            }}
                        />
                        <Button
                            component={NextLink}
                            href="/recipes"
                            startIcon={<ArrowBack />}
                            sx={{
                                position: 'absolute',
                                top: 20,
                                left: 20,
                                bgcolor: 'rgba(255,255,255,0.9)',
                                color: 'text.primary',
                                '&:hover': { bgcolor: 'white' },
                            }}
                        >
                            Back
                        </Button>
                    </Box>

                    <Container maxWidth="lg" sx={{ mt: -8, position: 'relative', zIndex: 1, pb: 8 }}>
                        <Paper elevation={0} sx={{ p: { xs: 3, md: 5 }, borderRadius: 4, boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }}>
                            {/* Header Section */}
                            <Box sx={{ mb: 4 }}>
                                <Typography
                                    variant="h2"
                                    sx={{
                                        fontSize: { xs: '1.75rem', md: '2.5rem' },
                                        fontWeight: 700,
                                        mb: 2,
                                    }}
                                >
                                    {recipe.name}
                                </Typography>

                                <Typography variant="body1" color="text.secondary" sx={{ mb: 3, maxWidth: 700 }}>
                                    {recipe.description}
                                </Typography>

                                {/* Meta Info */}
                                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3, mb: 3 }}>
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                                        <AccessTime sx={{ fontSize: 20, color: 'text.secondary' }} />
                                        <Typography variant="body2">
                                            {/* <strong>{recipe.prepTime}</strong> min prep • <strong>{recipe.cookTime}</strong> min cook */}
                                            <strong>{recipe.totalTime}</strong>
                                        </Typography>
                                    </Box>
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                                        <Restaurant sx={{ fontSize: 20, color: 'text.secondary' }} />
                                        <Typography variant="body2">{recipe.servings}</Typography>
                                    </Box>
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                                        <LocalFireDepartment sx={{ fontSize: 20, color: 'warning.main' }} />
                                        <Typography variant="body2">{recipe.nutritionalInformation.calories} calories</Typography>
                                    </Box>
                                </Box>

                                {/* Actions */}
                                <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                                    <IconButton
                                        onClick={handlePrint}
                                        sx={{ border: '1px solid', borderColor: 'divider' }}
                                    >
                                        <Print />
                                    </IconButton>
                                </Box>
                            </Box>

                            <Divider sx={{ my: 4 }} />

                            {/* Content Grid */}
                            <Grid container spacing={4}>
                                {/* Ingredients */}
                                <Grid size={{ xs: 12, md: 4 }}>
                                    <Paper
                                        elevation={0}
                                        sx={{
                                            bgcolor: 'muted',
                                            borderRadius: 3,
                                            position: 'sticky',
                                            top: 100,
                                        }}
                                    >
                                        <Typography variant="h5" sx={{ fontWeight: 600, mb: 3 }}>
                                            Ingredients
                                        </Typography>
                                        <List disablePadding>
                                            {recipe.ingredients.map((ingredient, index) => (
                                                <ListItem key={index} disablePadding sx={{ mb: 1.5 }}>
                                                    <ListItemIcon sx={{ minWidth: 32 }}>
                                                        <Box
                                                            sx={{
                                                                width: 8,
                                                                height: 8,
                                                                borderRadius: '50%',
                                                                bgcolor: 'primary.main',
                                                            }}
                                                        />
                                                    </ListItemIcon>
                                                    <ListItemText
                                                        primary={
                                                            <Typography variant="body2">
                                                                <strong dangerouslySetInnerHTML={{ __html: ingredient.quantity }} />{` `}
                                                                {ingredient.name}
                                                                {ingredient.additionalInstruction && `, ${ingredient.additionalInstruction}`}
                                                            </Typography>
                                                        }
                                                    />
                                                </ListItem>
                                            ))}
                                        </List>
                                    </Paper>
                                </Grid>

                                {/* Instructions */}
                                <Grid size={{ xs: 12, md: 8 }}>
                                    <Typography variant="h5" sx={{ fontWeight: 600, mb: 3 }}>
                                        Instructions
                                    </Typography>
                                    <List disablePadding>
                                        {recipe.preparation.map((preparation, index) => (
                                            <ListItem
                                                key={index}
                                                disablePadding
                                                sx={{ mb: 3, alignItems: 'flex-start' }}
                                            >
                                                <ListItemIcon sx={{ mt: 0.5 }}>
                                                    <IconButton
                                                        size="small"
                                                        onClick={() => toggleStep(preparation)}
                                                        sx={{
                                                            bgcolor: completedSteps.includes(preparation)
                                                                ? 'success.main'
                                                                : 'primary.main',
                                                            color: 'white',
                                                            width: 32,
                                                            height: 32,
                                                            fontSize: '0.9rem',
                                                            fontWeight: 600,
                                                            '&:hover': {
                                                                bgcolor: completedSteps.includes(preparation)
                                                                    ? 'success.dark'
                                                                    : 'primary.dark',
                                                            },
                                                        }}
                                                    >
                                                        {completedSteps.includes(preparation) ? (
                                                            <CheckCircle sx={{ fontSize: 18 }} />
                                                        ) : (
                                                            index + 1
                                                        )}
                                                    </IconButton>
                                                </ListItemIcon>
                                                <ListItemText
                                                    primary={
                                                        <Typography
                                                            variant="body1"
                                                            sx={{
                                                                textDecoration: completedSteps.includes(preparation)
                                                                    ? 'line-through'
                                                                    : 'none',
                                                                opacity: completedSteps.includes(preparation) ? 0.6 : 1,
                                                                lineHeight: 1.7,
                                                            }}
                                                        >
                                                            {preparation}
                                                        </Typography>
                                                    }
                                                />
                                            </ListItem>
                                        ))}
                                    </List>
                                </Grid>
                            </Grid>

                            {recipe.nutritionalInformation && (
                                <Box sx={{ mt: 3 }}>
                                    <Typography variant="h5" sx={{ fontWeight: 600, mb: 2 }}>Nutritional Information</Typography>
                                    <Typography>
                                        Per serving{recipe.nutritionalInformation.servingSize && (
                                            `(${recipe.nutritionalInformation.servingSize})`
                                        )}:{` `}
                                        Calories {recipe.nutritionalInformation.calories},{` `}
                                        Fat {recipe.nutritionalInformation.fat} g (Saturated {recipe.nutritionalInformation.saturatedFat} g, Trans {recipe.nutritionalInformation.transFat} g),{` `}
                                        Cholesterol {recipe.nutritionalInformation.cholesterol} mg,{` `}
                                        Sodium {recipe.nutritionalInformation.sodium} mg,{` `}
                                        Carbohydrate {recipe.nutritionalInformation.carbohydrate} g (Fiber {recipe.nutritionalInformation.fiber} g, Sugars {recipe.nutritionalInformation.sugars} g),{` `}
                                        Protein {recipe.nutritionalInformation.protein} g.
                                    </Typography>
                                </Box>
                            )}

                            {recipe.tips?.length > 0 && (
                                <Box sx={{ mt: 3 }}>
                                    <Typography variant="h5" sx={{ fontWeight: 600, mb: 2 }}>Tips</Typography>
                                    {recipe.tips.map((tip, index) => (
                                        <Typography key={index}>{tip}</Typography>
                                    ))}
                                </Box>
                            )}

                            {recipe.perfectlyBalanceYourPlate && (
                                <Box sx={{ mt: 3 }}>
                                    <Typography variant="h5" sx={{ fontWeight: 600, mb: 2 }}>Perfectly Balance Your Plate</Typography>
                                    <Typography>{recipe.perfectlyBalanceYourPlate}</Typography>
                                </Box>
                            )}

                            <Box className='hide-on-print' sx={{ mt: 4, pt: 4, borderTop: '1px solid', borderColor: 'divider' }}>
                                {/* Tags */}
                                {recipe.tags?.length > 0 && (
                                    <Box>
                                        <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 2 }}>
                                            Tags
                                        </Typography>
                                        <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                                            {recipe.tags.map((tag, index) => (
                                                <Chip
                                                    key={index}
                                                    component={NextLink}
                                                    href={`/tag/${tag.slug}`}
                                                    label={`#${tag.name}`}
                                                    size="small"
                                                    variant="outlined"
                                                    sx={{
                                                        textTransform: 'lowercase',
                                                        cursor: 'pointer',
                                                    }}
                                                />
                                            ))}
                                        </Box>
                                    </Box>
                                )}

                                {recipe.products?.length > 0 && (
                                    <Box sx={{ mt: 3 }}>
                                        <Typography variant="h5" sx={{ fontWeight: 600 }}>Epicure Products Used</Typography>
                                        <List>
                                            {recipe.products.map((product, index) => (
                                                <ListItem key={index} disablePadding>
                                                    <ListItemText>
                                                        <Link component={NextLink} href={`/product/${product.slug}`}>{product.name}</Link>
                                                    </ListItemText>
                                                </ListItem>
                                            ))}
                                        </List>
                                    </Box>
                                )}
                            </Box>
                        </Paper>
                    </Container>
                </Box>
            </Wrapper>
        </Layout>
    );
}

export const getStaticPaths: GetStaticPaths = async () => {
    const recipesDirectory = path.join(process.cwd(), 'data', 'recipes');
    const filenames = fs.readdirSync(recipesDirectory);

    return {
        paths: filenames.map((filename) => ({
            params: {
                slug: filename.replace(/\.json$/, ''),
            },
        })),
        fallback: false,
    };
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
    const recipePath = path.join(process.cwd(), 'data', 'recipes', `${params?.slug}.json`);
    const content = fs.readFileSync(recipePath, 'utf8');
    const recipe: Recipe = JSON.parse(content);

    return {
        props: {
            recipe
        },
    };
}
