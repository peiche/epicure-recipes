import fs from 'fs';
import path from 'path';
import { Box, Container, Grid, List, ListItem, ListItemText, Typography } from '@mui/material';
import { AccessTimeOutlined, RestaurantOutlined } from '@mui/icons-material';
import Layout from '../../../components/ui/layout';
import { useEffect } from 'react';
import { Recipe } from '../../../interfaces/Recipe';
import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from 'next';
import SEO from '../../../components/layout/seo';

interface RecipePrintPageProps {
    recipe: Recipe;
}

export default function RecipePrintPage({ recipe }: RecipePrintPageProps & InferGetStaticPropsType<typeof getStaticProps>) {
    const {
        name,
        totalTime,
        servings,
        description,
        ingredients,
        preparation,
        nutritionalInformation,
        tips,
        perfectlyBalanceYourPlate,
    } = recipe;

    useEffect(() => {
        window.print();
    }, []);

    return (
        <Layout>
            <style global jsx>{`
                .google-auto-placed {
                    display: none;
                }
            `}</style>
            <SEO title={name} />
            <Container maxWidth='md' sx={{ my: 3 }}>
                <Typography component='h1' variant='h4' sx={{ my: 2 }}>{name}</Typography>

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
            </Container>
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
            recipe,
        },
    };
}