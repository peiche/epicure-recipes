import fs from 'fs';
import path from 'path';
import { Grid2 as Grid, Typography } from '@mui/material';
import { InferGetStaticPropsType } from 'next';
import { Recipe } from '../../interfaces/Recipe';
import Layout from '../../components/layout';
import SEO from '../../components/seo';
import Wrapper from '../../components/wrapper';
import { RESULTS_PER_PAGE } from '../../constants/pagination';
import Pagination from '../../components/pagination';
import RecipeCard from '../../components/recipeCard';
import { PaginationProps } from '../../interfaces/PaginationProps';
import { RecipesPageProps } from '../../interfaces/RecipesPageProps';
import { getRecipes } from '../../lib/recipe';

export default function RecipesPage({ recipes, pagination }: RecipesPageProps & InferGetStaticPropsType<typeof getStaticProps>) {
    return (
        <Layout>
            <SEO title='Recipes' />
            <Wrapper>
                <Typography component='h1' variant='h4' mt={1} mb={3}>Epicure Recipes</Typography>

                <Grid container spacing={2}>
                    {recipes
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
    const recipes = getRecipes();
    const totalCount = recipes.length;
    const totalPages = Math.ceil(totalCount / RESULTS_PER_PAGE);

    const pagination: PaginationProps = {
        currentPage: 1,
        totalPages: totalPages,
    };

    return {
        props: {
            recipes: recipes.slice(0, RESULTS_PER_PAGE),
            pagination,
        },
    };
}
