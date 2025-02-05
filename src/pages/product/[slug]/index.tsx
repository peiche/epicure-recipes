import fs from 'fs';
import path from 'path';
import Layout from '../../../components/layout';
import Wrapper from '../../../components/wrapper';
import { Breadcrumbs, Grid2 as Grid, Link, Typography } from '@mui/material';
import NextLink from 'next/link';
import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from 'next';
import { Product } from '../../../interfaces/Product';
import SEO from '../../../components/seo';
import RecipeCard from '../../../components/recipeCard';
import { RESULTS_PER_PAGE } from '../../../constants/pagination';
import Pagination from '../../../components/pagination';
import { PaginationProps } from '../../../interfaces/PaginationProps';
import { getRecipesForProduct } from '../../../lib/recipe';
import { ProductPageProps } from '../../../interfaces/ProductPageProps';

export default function ProductPage({ product, recipes, pagination }: ProductPageProps & InferGetStaticPropsType<typeof getStaticProps>) {
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
                    <Link underline='hover' color='inherit' component={NextLink} href='/recipes'>Recipes</Link>
                    <Typography sx={{ color: 'text.primary' }}>Products</Typography>
                    <Typography sx={{ color: 'text.primary' }}>{name}</Typography>
                </Breadcrumbs>

                <Typography component='h1' variant='h4' mt={1} mb={2}>
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

export const getStaticPaths: GetStaticPaths = async () => {
    const productsDirectory = path.join(process.cwd(), 'src', 'data', 'products');
    const filenames = fs.readdirSync(productsDirectory);

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
    const productPath = path.join(process.cwd(), 'src', 'data', 'products', `${params?.slug}.json`);
    const content = fs.readFileSync(productPath, 'utf8');
    const product: Product = JSON.parse(content);

    const recipes = getRecipesForProduct(params?.slug) || [];

    const totalCount = recipes.length;
    const totalPages = Math.ceil(totalCount / RESULTS_PER_PAGE);

    const pagination: PaginationProps = {
        currentPage: 1,
        totalPages: totalPages,
    };

    return {
        props: {
            product,
            recipes: recipes.slice(0, RESULTS_PER_PAGE),
            pagination,
        },
    }
}