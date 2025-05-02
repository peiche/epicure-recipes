import { Box, Grid } from '@mui/material';
import { GetStaticPaths, GetStaticPathsResult, GetStaticProps, InferGetStaticPropsType } from 'next';
import Layout from '../../components/layout';
import SEO from '../../components/seo';
import Wrapper from '../../components/wrapper';
import { RESULTS_PER_PAGE } from '../../constants/pagination';
import Pagination from '../../components/pagination';
import { PaginationProps } from '../../interfaces/PaginationProps';
import { RecipesPageProps } from '../../interfaces/RecipesPageProps';
import { getRecipes } from '../../lib/recipe';
import { useAppSelector } from '../../redux/hooks';
import { selectView } from '../../redux/slices/viewSlice';
import RecipeListHeader from '../../components/recipeListHeader';
import RecipeList from '../../components/recipeList';
import AdSense from '../../components/adsense';

export default function RecipesPaginationPage({ recipes, pagination }: RecipesPageProps & InferGetStaticPropsType<typeof getStaticProps>) {
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

export const getStaticPaths: GetStaticPaths = async () => {
    const recipes = getRecipes();
    const totalCount = recipes.length;
    const totalPages = Math.ceil(totalCount / RESULTS_PER_PAGE);

    let staticPathsResult: GetStaticPathsResult = {
        paths: [],
        fallback: false,
    };

    for (let i = 2; i < totalPages + 1; i++) {
        staticPathsResult.paths.push({
            params: {
                page: i.toString(),
            },
        });
    }

    return staticPathsResult;
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
    const page = parseInt(String(params?.page));

    const recipes = getRecipes();

    const totalCount = recipes.length;
    const totalPages = Math.ceil(totalCount / RESULTS_PER_PAGE);

    if (page > totalPages) {
        return {
            notFound: true,
        };
    }

    const pagination: PaginationProps = {
        currentPage: page,
        totalPages: totalPages,
    };

    return {
        props: {
            recipes: recipes.slice(
                ((pagination.currentPage - 1) * RESULTS_PER_PAGE),
                ((pagination.currentPage - 1) * RESULTS_PER_PAGE) + RESULTS_PER_PAGE
            ),
            pagination,
        },
    };
}
