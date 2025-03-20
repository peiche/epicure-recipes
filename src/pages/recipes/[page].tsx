import { GetStaticPaths, GetStaticPathsResult, GetStaticProps, InferGetStaticPropsType } from 'next';
import Layout from '../../components/layout';
import SEO from '../../components/seo';
import Wrapper from '../../components/wrapper';
import { RESULTS_PER_PAGE } from '../../constants/pagination';
import Pagination from '../../components/pagination';
import RecipeCard from '../../components/recipeCard';
import { PaginationProps } from '../../interfaces/PaginationProps';
import { RecipesPageProps } from '../../interfaces/RecipesPageProps';
import { getRecipes } from '../../lib/recipe';
import { Typography } from '@progress/kendo-react-common';
import { GridLayout, GridLayoutItem } from '@progress/kendo-react-layout';

export default function RecipesPaginationPage({ recipes, pagination }: RecipesPageProps & InferGetStaticPropsType<typeof getStaticProps>) {
    return (
        <Layout>
            <SEO title='Recipes' />
            <Wrapper>
                <Typography.h1 className='k-h3'>Epicure Recipes</Typography.h1>

                <GridLayout
                    className='grid-responsive-3-cols'
                    gap={{
                        cols: 10,
                        rows: 10,
                    }}
                >
                    {recipes.map((recipe, index) => (
                        <GridLayoutItem key={index}>
                            <RecipeCard recipe={recipe} />
                        </GridLayoutItem>
                    ))}
                </GridLayout>
                {pagination.totalPages > 1 && (
                    <div className='k-mt-md'>
                        <Pagination
                            prefix='/recipes'
                            currentPage={pagination.currentPage}
                            totalPages={pagination.totalPages}
                        />
                    </div>
                )}

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
