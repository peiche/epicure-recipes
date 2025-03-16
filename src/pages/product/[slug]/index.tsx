import fs from 'fs';
import path from 'path';
import Layout from '../../../components/layout';
import Wrapper from '../../../components/wrapper';
import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from 'next';
import { Product } from '../../../interfaces/Product';
import SEO from '../../../components/seo';
import RecipeCard from '../../../components/recipeCard';
import { RESULTS_PER_PAGE } from '../../../constants/pagination';
import Pagination from '../../../components/pagination';
import { PaginationProps } from '../../../interfaces/PaginationProps';
import { getRecipesForProduct } from '../../../lib/recipe';
import { ProductPageProps } from '../../../interfaces/ProductPageProps';
import { Typography } from '@progress/kendo-react-common';
import { GridLayout, GridLayoutItem } from '@progress/kendo-react-layout';
import Breadcrumb from '../../../components/breadcrumbs';

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

                <Breadcrumb
                    items={[
                        { text: 'Recipes', href: '/recipes' },
                        { text: 'Products' },
                        { text: name },
                    ]}
                />

                <Typography.h1 className='k-h3'>Recipes made with {name}</Typography.h1>

                {summary && summary.map((summStr: string, index: number) => (
                    <Typography.p key={index}>
                        <span dangerouslySetInnerHTML={{ __html: summStr }} />
                    </Typography.p>
                ))}

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
                            prefix={`/product/${slug}`}
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