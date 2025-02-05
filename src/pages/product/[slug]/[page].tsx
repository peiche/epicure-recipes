import fs from 'fs';
import path from 'path';
import Layout from '../../../components/layout';
import Wrapper from '../../../components/wrapper';
import { Breadcrumbs, Grid2 as Grid, Link, Typography } from '@mui/material';
import NextLink from 'next/link';
import { GetStaticPaths, GetStaticPathsResult, GetStaticProps, InferGetStaticPropsType } from 'next';
import { Product } from '../../../interfaces/Product';
import SEO from '../../../components/seo';
import RecipeCard from '../../../components/recipeCard';
import { RESULTS_PER_PAGE } from '../../../constants/pagination';
import Pagination from '../../../components/pagination';
import { PaginationProps } from '../../../interfaces/PaginationProps';
import { getRecipesForProduct } from '../../../lib/recipe';
import { ProductPageProps } from '../../../interfaces/ProductPageProps';

export default function ProductPaginationPage({ product, recipes, pagination }: ProductPageProps & InferGetStaticPropsType<typeof getStaticProps>) {
    const {
        slug,
        name,
        summary,
    } = product;

    return (
        <Layout>
            <SEO title={`Product: ${name}`} />
            <Wrapper>

                <Breadcrumbs>
                    <Link underline='hover' color='inherit' component={NextLink} href='/'>Recipes</Link>
                    <Typography sx={{ color: 'text.primary' }}>Products</Typography>
                    <Typography sx={{ color: 'text.primary' }}>{name}</Typography>
                </Breadcrumbs>

                <Typography component='h1' variant='h4' mt={1} mb={3}>
                    Recipes made with {name}
                </Typography>

                {summary && summary.map((summStr: string, index: number) => (
                    <Typography key={index} mb={2}>
                        <span dangerouslySetInnerHTML={{ __html: summStr }} />
                    </Typography>
                ))}

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
                                prefix={`/product/${slug}`}
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

export const getStaticPaths: GetStaticPaths = () => {
    const productsDirectory = path.join(process.cwd(), 'src', 'data', 'products');
    const filenames = fs.readdirSync(productsDirectory);

    let staticPathsResult: GetStaticPathsResult = {
        paths: [],
        fallback: false,
    };

    filenames.forEach((filename) => {
        const slug = filename.replace(/\.json$/, '');
        const recipes = getRecipesForProduct(slug);

        const totalCount = recipes.length;
        const totalPages = Math.ceil(totalCount / RESULTS_PER_PAGE);

        for (let i = 2; i < totalPages + 1; i++) {
            staticPathsResult.paths.push({
                params: {
                    slug,
                    page: i.toString(),
                },
            });
        }
    });

    return staticPathsResult;
}

export const getStaticProps: GetStaticProps = ({ params }) => {
    const page = parseInt(String(params?.page));
    const productPath = path.join(process.cwd(), 'src', 'data', 'products', `${params?.slug}.json`);
    const content = fs.readFileSync(productPath, 'utf8');
    const product: Product = JSON.parse(content);

    const recipes = getRecipesForProduct(params?.slug) || [];

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
            product,
            recipes: recipes.slice(
                ((pagination.currentPage - 1) * RESULTS_PER_PAGE),
                ((pagination.currentPage - 1) * RESULTS_PER_PAGE) + RESULTS_PER_PAGE
            ),
            pagination,
        },
    }
}
