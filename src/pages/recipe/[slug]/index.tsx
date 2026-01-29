import fs from 'fs';
import path from 'path';
import { Box, Breadcrumbs, Button, Chip, Container, Divider, Grid, IconButton, Link, List, ListItem, ListItemIcon, ListItemText, Paper, Rating, Typography } from '@mui/material';
import { AccessTimeOutlined, PrintOutlined, RestaurantOutlined } from '@mui/icons-material';
import {
    AccessTime,
    Restaurant,
    LocalFireDepartment,
    Favorite,
    FavoriteBorder,
    Share,
    Print,
    BookmarkBorder,
    CheckCircle,
    ArrowBack,
} from '@mui/icons-material';
import NextLink from 'next/link';
import Layout from '../../../components/ui/layout';
import Wrapper from '../../../components/layout/wrapper';
import Image from 'next/image';
import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from 'next';
import { Recipe } from '../../../interfaces/Recipe';
import SEO from '../../../components/layout/seo';
import { useState } from 'react';

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

    return (
        <Layout>
            <style global jsx>{`
                .google-auto-placed {
                    display: none;
                }
            `}</style>
            <SEO title={recipe.name} />
            <Wrapper>

                {/* <Breadcrumbs>
                    <Link underline='hover' color='inherit' component={NextLink} href='/recipes'>Recipes</Link>
                    <Typography sx={{ color: 'text.primary' }}>{recipe.name}</Typography>
                </Breadcrumbs>

                <Box sx={{ my: 2 }}>
                    {recipe.image && (
                        <Box position='relative'>
                            <Image
                                src={`/images/${recipe.image}`}
                                alt=''
                                width={1036}
                                height={583}
                                priority
                                style={{
                                    width: '100%',
                                    height: 'auto',
                                }}
                            />
                        </Box>
                    )}

                    <Typography component='h1' variant='h4' mt={1}>{recipe.name}</Typography>
                </Box>

                {recipe.tags?.length > 0 && (
                    <Box my={1}>
                        {recipe.tags.map((tag, index) => (
                            <Chip
                                key={index}
                                variant='outlined'
                                size='small'
                                label={tag.name}
                                component={NextLink}
                                href={`/tag/${tag.slug}`}
                                sx={{
                                    mr: 1,
                                    mb: 1,
                                    cursor: 'pointer',
                                }} />
                        ))}
                    </Box>
                )}

                <Box sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    mt: 1,
                    mb: 2,
                }}>
                    <Box sx={{
                        display: 'flex',
                        gap: 3,
                    }}>
                        {recipe.totalTime && (
                            <Typography sx={{ display: 'inline-flex', alignItems: 'center', gap: 1 }}>
                                <AccessTimeOutlined />
                                {recipe.totalTime}
                            </Typography>
                        )}

                        {recipe.servings && (
                            <Typography sx={{ display: 'inline-flex', alignItems: 'center', gap: 1 }}>
                                <RestaurantOutlined />
                                {recipe.servings}
                            </Typography>
                        )}
                    </Box>

                    <Button
                        variant='contained'
                        disableElevation
                        startIcon={<PrintOutlined />}
                        component={NextLink}
                        href={`/recipe/${recipe.slug}/print`}
                        onClick={(event) => {
                            event.preventDefault();
                            window.open(`/recipe/${recipe.slug}/print`);
                            return false;
                        }}
                    >Print</Button>
                </Box>

                {recipe.description && (
                    <Typography my={2}>{recipe.description}</Typography>
                )}

                <Grid container spacing={2} my={2}>
                    {recipe.ingredients?.length > 0 && (
                        <Grid size={{
                            xs: 12,
                            md: 6,
                        }}>
                            <Typography component='h2' variant='h5' mb={1}>Ingredients</Typography>
                            <List disablePadding>
                                {recipe.ingredients.map((ingredient, index) => (
                                    <ListItem key={index} disablePadding sx={{ display: 'list-item' }}>
                                        <ListItemText>
                                            <span dangerouslySetInnerHTML={{ __html: ingredient.quantity }} />{` `}
                                            {ingredient.name}{ingredient.additionalInstruction && `, ${ingredient.additionalInstruction}`}
                                        </ListItemText>
                                    </ListItem>
                                ))}
                            </List>
                        </Grid>
                    )}

                    {recipe.preparation?.length > 0 && (
                        <Grid size={{
                            xs: 12,
                            md: 6,
                        }}>
                            <Typography component='h2' variant="h5" mb={1}>Preparation</Typography>
                            <List disablePadding component='ol' sx={{
                                listStyle: 'auto',
                                marginLeft: 3,
                            }}>
                                {recipe.preparation.map((prep, index) => (
                                    <ListItem key={index} disablePadding sx={{ display: 'list-item' }}>
                                        <ListItemText>{prep}</ListItemText>
                                    </ListItem>
                                ))}
                            </List>
                        </Grid>
                    )}
                </Grid>

                {recipe.products?.length > 0 && (
                    <>
                        <Typography component='h2' variant="h5" mt={2} mb={1}>Epicure Products Used</Typography>
                        <List>
                            {recipe.products.map((product, index) => (
                                <ListItem key={index} disablePadding>
                                    <ListItemText>
                                        <Link component={NextLink} href={`/product/${product.slug}`}>{product.name}</Link>
                                    </ListItemText>
                                </ListItem>
                            ))}
                        </List>
                    </>
                )}

                {recipe.nutritionalInformation && (
                    <>
                        <Typography component='h2' variant="h5" mt={2} mb={1}>Nutritional Information</Typography>
                        <Typography>
                            Per serving{recipe.nutritionalInformation.servingSize && (
                                `(${recipe.nutritionalInformation.servingSize})`
                            )}:{` `}
                            Calories {recipe.nutritionalInformation.calories},{` `}
                            Fat {recipe.nutritionalInformation.fat} g (Saturated {recipe.nutritionalInformation.saturatedFat} g, {recipe.nutritionalInformation.transFat} 0 g),{` `}
                            Cholesterol {recipe.nutritionalInformation.cholesterol} mg,{` `}
                            Sodium {recipe.nutritionalInformation.sodium} mg,{` `}
                            Carbohydrate {recipe.nutritionalInformation.carbohydrate} g (Fiber {recipe.nutritionalInformation.fiber} g, Sugars {recipe.nutritionalInformation.sugars} g),{` `}
                            Protein {recipe.nutritionalInformation.protein} g.
                        </Typography>
                    </>
                )}

                {recipe.tips?.length > 0 && (
                    <>
                        <Typography component='h2' variant="h5" mt={2} mb={1}>Tips</Typography>
                        {recipe.tips.map((tip, index) => (
                            <Typography key={index}>{tip}</Typography>
                        ))}
                    </>
                )}

                {recipe.perfectlyBalanceYourPlate && (
                    <>
                        <Typography component='h2' variant="h5" mt={2} mb={1}>Perfectly Balance Your Plate</Typography>
                        <Typography>{recipe.perfectlyBalanceYourPlate}</Typography>
                    </>
                )} */}

                <Box component="main" sx={{ flexGrow: 1 }}>
                    {/* Hero Image */}
                    <Box
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
                                {/* <Box sx={{ display: 'flex', gap: 1, mb: 2, flexWrap: 'wrap' }}>
                                    <Chip label={recipe.category} color="primary" size="small" />
                                    <Chip label={recipe.cuisine} variant="outlined" size="small" />
                                    <Chip
                                        label={recipe.difficulty}
                                        color={getDifficultyColor(recipe.difficulty) as any}
                                        size="small"
                                    />
                                </Box> */}

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
                                    {/* <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                                        <Rating value={recipe.rating} precision={0.1} readOnly size="small" />
                                        <Typography variant="body2" color="text.secondary">
                                            {recipe.rating} ({recipe.reviewCount} reviews)
                                        </Typography>
                                    </Box> */}
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
                                    {/* <Button
                                        variant={isFavorite ? 'contained' : 'outlined'}
                                        color={isFavorite ? 'error' : 'primary'}
                                        startIcon={isFavorite ? <Favorite /> : <FavoriteBorder />}
                                        onClick={() => setIsFavorite(!isFavorite)}
                                    >
                                        {isFavorite ? 'Saved' : 'Save Recipe'}
                                    </Button> */}
                                    {/* <IconButton sx={{ border: '1px solid', borderColor: 'divider' }}>
                                        <Share />
                                    </IconButton> */}
                                    <IconButton sx={{ border: '1px solid', borderColor: 'divider' }}>
                                        <Print />
                                    </IconButton>
                                    {/* <IconButton sx={{ border: '1px solid', borderColor: 'divider' }}>
                                        <BookmarkBorder />
                                    </IconButton> */}
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
                                            // p: 3,
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
                                                                {/* <strong>{ingredient.amount} {ingredient.unit}</strong> {ingredient.name} */}
                                                                {/* <strong>{ingredient.quantity}</strong> {ingredient.name} */}
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

                                    {/* Author */}
                                    {/* <Paper
                                        elevation={0}
                                        sx={{
                                            p: 3,
                                            mt: 4,
                                            bgcolor: 'muted',
                                            borderRadius: 3,
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: 2,
                                        }}
                                    >
                                        <Avatar sx={{ width: 56, height: 56, bgcolor: 'primary.main' }}>
                                            {recipe.author.name.charAt(0)}
                                        </Avatar>
                                        <Box>
                                            <Typography variant="subtitle2" color="text.secondary">
                                                Recipe by
                                            </Typography>
                                            <Typography variant="h6" sx={{ fontWeight: 600 }}>
                                                {recipe.author.name}
                                            </Typography>
                                        </Box>
                                    </Paper> */}
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

                            <Box sx={{ mt: 4, pt: 4, borderTop: '1px solid', borderColor: 'divider' }}>
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