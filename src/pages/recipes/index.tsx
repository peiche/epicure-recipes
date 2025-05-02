import { Box, Grid } from '@mui/material';
import { InferGetStaticPropsType } from 'next';
import Layout from '../../components/layout';
import SEO from '../../components/seo';
import Wrapper from '../../components/wrapper';
import { RESULTS_PER_PAGE } from '../../constants/pagination';
import Pagination from '../../components/pagination';
import { PaginationProps } from '../../interfaces/PaginationProps';
import { RecipesPageProps } from '../../interfaces/RecipesPageProps';
import { getRecipes } from '../../lib/recipe';
import RecipeListHeader from '../../components/recipeListHeader';
import { useAppSelector } from '../../redux/hooks';
import { selectView } from '../../redux/slices/viewSlice';
import RecipeList from '../../components/recipeList';
import AdSense from '../../components/adsense';

export default function RecipesPage({ recipes, pagination }: RecipesPageProps & InferGetStaticPropsType<typeof getStaticProps>) {
    const view = useAppSelector(selectView);

    return (
        <Layout>
            <SEO title='Recipes' />
            <Wrapper>
                <RecipeListHeader
                    title='Epicure Recipes'
                    view={view}
                />

                <Grid container spacing={2}>
                    <RecipeList recipes={recipes} />

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

                <Box py={1}>
                    <AdSense
                        client="ca-pub-8316336599094727"
                        slot="3666901353"
                        format="auto"
                        style={{ display: 'block' }}
                        responsive="true"
                    />
                </Box>

            </Wrapper>
        </Layout>
    );
}

export const getStaticProps = async () => {
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
