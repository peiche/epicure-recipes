import fs from 'fs';
import path from 'path';
import { Card, CardContent, CardHeader, CardMedia, Grid2 as Grid, Link, List, ListItem, ListItemText, Typography } from '@mui/material';
import NextLink from 'next/link';
import { InferGetStaticPropsType } from 'next';
import { Recipe } from '../../interfaces/Recipe';
import Layout from '../../components/layout';
import SEO from '../../components/seo';
import Wrapper from '../../components/wrapper';
import { RESULTS_PER_PAGE } from '../../constants/pagination';
import Pagination from '../../components/pagination';
import RecipeCard from '../../components/recipeCard';
import { PaginationProps } from '../../interfaces/PaginationProps';

interface RecipesPageProps {
    recipes: Recipe[];
    pagination: PaginationProps,
}

export default function RecipesPage({ recipes, pagination }: RecipesPageProps & InferGetStaticPropsType<typeof getStaticProps>) {
    return (
        <Layout>
            <SEO title='Recipes' />
            <Wrapper>
                <Typography component='h1' variant='h4' mt={1} mb={3}>Epicure Recipes</Typography>

                <Grid container spacing={2}>
                    {recipes
                        .slice(0, RESULTS_PER_PAGE)
                        .map((recipe, index) => (
                            <Grid
                                key={index}
                                size={{
                                    xs: 12,
                                    sm: 6,
                                    md: 4,
                                }}
                            >
                                <RecipeCard recipe={recipe} />
                            </Grid>
                        ))}

                    <Grid size={12}>
                        {pagination.totalPages > 1 && (
                            <Pagination
                                prefix='/recipes'
                                currentPage={pagination.currentPage}
                                totalPages={pagination.totalPages}
                            />
                        )}
                    </Grid>
                </Grid>

            </Wrapper>
        </Layout>
    );
}

export const getStaticProps = () => {
    const recipesDirectory = path.join(process.cwd(), 'src', 'data', 'recipes');
    let filenames = fs.readdirSync(recipesDirectory);
    filenames = filenames.map(filename => path.join(process.cwd(), 'src', 'data', 'recipes', filename));

    let recipes: Recipe[] = [];
    filenames.forEach((filename) => {
        const content = fs.readFileSync(filename, 'utf8');
        const recipe: Recipe = JSON.parse(content);

        recipes.push(recipe);
    });

    const totalCount = recipes.length;
    const totalPages = Math.ceil(totalCount / RESULTS_PER_PAGE);

    recipes = recipes.sort((a, b) => {
        if (a.slug < b.slug) {
            return -1;
        }
        if (a.slug > b.slug) {
            return 1;
        }
        return 0;
    });

    const pagination: PaginationProps = {
        currentPage: 1,
        totalPages: totalPages,
    };

    return {
        props: {
            recipes,
            pagination,
        },
    };
}
