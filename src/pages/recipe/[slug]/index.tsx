import fs from 'fs';
import path from 'path';
import { Box, Breadcrumbs, Button, Chip, Grid2 as Grid, Link, List, ListItem, ListItemText, Typography } from '@mui/material';
import { AccessTimeOutlined, PrintOutlined, RestaurantOutlined } from '@mui/icons-material';
import NextLink from 'next/link';
import Layout from '../../../components/layout';
import Wrapper from '../../../components/wrapper';
import Image from 'next/image';
import { GetStaticProps, InferGetStaticPropsType } from 'next';
import { Recipe } from '../../../interfaces/Recipe';
import SEO from '../../../components/seo';
import { ImageProps } from '../../../interfaces/ImageProps';

interface RecipePageProps {
    recipe: Recipe;
    image: ImageProps;
}

export default function RecipePage({ recipe, image }: RecipePageProps & InferGetStaticPropsType<typeof getStaticProps>) {
    const {
        name,
        slug,
        tags,
        totalTime,
        servings,
        description,
        ingredients,
        preparation,
        products,
        nutritionalInformation,
        tips,
        perfectlyBalanceYourPlate,
    } = recipe;

    return (
        <Layout>
            <SEO title={name} />
            <Wrapper>

                <Breadcrumbs>
                    <Link underline='hover' color='inherit' component={NextLink} href='/'>Recipes</Link>
                    <Typography sx={{ color: 'text.primary' }}>{name}</Typography>
                </Breadcrumbs>

                <Box sx={{ my: 2 }}>
                    {image?.src && (
                        <Box position='relative'>
                            <Image
                                src={image.src}
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

                    <Typography component='h1' variant='h4' mt={1}>{name}</Typography>
                </Box>

                {tags?.length > 0 && (
                    <Box my={1}>
                        {tags.map((tag, index) => (
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
                        {totalTime && (
                            <Typography sx={{ display: 'inline-flex', alignItems: 'center', gap: 1 }}>
                                <AccessTimeOutlined />
                                {totalTime}
                            </Typography>
                        )}

                        {servings && (
                            <Typography sx={{ display: 'inline-flex', alignItems: 'center', gap: 1 }}>
                                <RestaurantOutlined />
                                {servings}
                            </Typography>
                        )}
                    </Box>

                    <Button
                        variant='contained'
                        disableElevation
                        startIcon={<PrintOutlined />}
                        component={NextLink}
                        href={`/recipe/${slug}/print`}
                        onClick={(event) => {
                            event.preventDefault();
                            window.open(`/recipe/${slug}/print`);
                            return false;
                        }}
                    >Print</Button>
                </Box>

                {description && (
                    <Typography my={2}>{description}</Typography>
                )}

                <Grid container spacing={2} my={2}>
                    {ingredients?.length > 0 && (
                        <Grid size={{
                            xs: 12,
                            md: 6,
                        }}>
                            <Typography component='h2' variant='h5' mb={1}>Ingredients</Typography>
                            <List disablePadding>
                                {ingredients.map((ingredient, index) => (
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

                    {preparation?.length > 0 && (
                        <Grid size={{
                            xs: 12,
                            md: 6,
                        }}>
                            <Typography component='h2' variant="h5" mb={1}>Preparation</Typography>
                            <List disablePadding component='ol' sx={{
                                listStyle: 'auto',
                                marginLeft: 3,
                            }}>
                                {preparation.map((prep, index) => (
                                    <ListItem key={index} disablePadding sx={{ display: 'list-item' }}>
                                        <ListItemText>{prep}</ListItemText>
                                    </ListItem>
                                ))}
                            </List>
                        </Grid>
                    )}
                </Grid>

                {products?.length > 0 && (
                    <>
                        <Typography component='h2' variant="h5" mt={2} mb={1}>Epicure Products Used</Typography>
                        <List>
                            {products.map((product, index) => (
                                <ListItem key={index} disablePadding>
                                    <ListItemText>
                                        <Link component={NextLink} href={`/product/${product.slug}`}>{product.name}</Link>
                                    </ListItemText>
                                </ListItem>
                            ))}
                        </List>
                    </>
                )}

                {nutritionalInformation && (
                    <>
                        <Typography component='h2' variant="h5" mt={2} mb={1}>Nutritional Information</Typography>
                        <Typography>
                            Per serving{nutritionalInformation.servingSize && (
                                `(${nutritionalInformation.servingSize})`
                            )}:{` `}
                            Calories {nutritionalInformation.calories},{` `}
                            Fat {nutritionalInformation.fat} g (Saturated {nutritionalInformation.saturatedFat} g, {nutritionalInformation.transFat} 0 g),{` `}
                            Cholesterol {nutritionalInformation.cholesterol} mg,{` `}
                            Sodium {nutritionalInformation.sodium} mg,{` `}
                            Carbohydrate {nutritionalInformation.carbohydrate} g (Fiber {nutritionalInformation.fiber} g, Sugars {nutritionalInformation.sugars} g),{` `}
                            Protein {nutritionalInformation.protein} g.
                        </Typography>
                    </>
                )}

                {tips?.length > 0 && (
                    <>
                        <Typography component='h2' variant="h5" mt={2} mb={1}>Tips</Typography>
                        {tips.map((tip, index) => (
                            <Typography key={index}>{tip}</Typography>
                        ))}
                    </>
                )}

                {perfectlyBalanceYourPlate && (
                    <>
                        <Typography component='h2' variant="h5" mt={2} mb={1}>Perfectly Balance Your Plate</Typography>
                        <Typography>{perfectlyBalanceYourPlate}</Typography>
                    </>
                )}
            </Wrapper>
        </Layout>
    );
}

export const getStaticPaths = () => {
    const recipesDirectory = path.join(process.cwd(), 'src', 'data', 'recipes');
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

export const getStaticProps: GetStaticProps = ({ params }) => {
    const recipePath = path.join(process.cwd(), 'src', 'data', 'recipes', `${params?.slug}.json`);
    const content = fs.readFileSync(recipePath, 'utf8');
    const recipe: Recipe = JSON.parse(content);

    const image: ImageProps = {};

    if (recipe.image) {
        const srcDir = path.join(process.cwd(), 'src/data/images');
        const destDir = path.join(process.cwd(), 'public/processed');

        if (!fs.existsSync(destDir)) {
            fs.mkdirSync(destDir, { recursive: true });
        }

        const imagePath = recipe.image;
        const srcPath = path.join(srcDir, imagePath);
        const destPath = path.join(destDir, imagePath);

        if (fs.existsSync(srcPath) && !fs.existsSync(destPath)) {
            fs.copyFileSync(srcPath, destPath);
        }

        image.src = `/processed/${imagePath}`;
    }

    return {
        props: {
            recipe,
            image,
        },
    };
}