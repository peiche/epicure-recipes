import fs from 'fs';
import path from 'path';
import Layout from '../../../components/ui/layout';
import Wrapper from '../../../components/layout/wrapper';
import { Box, Breadcrumbs, Grid, Link, Typography } from '@mui/material';
import NextLink from 'next/link';
import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from 'next';
import { Product } from '../../../interfaces/Product';
import SEO from '../../../components/layout/seo';
import { RESULTS_PER_PAGE } from '../../../constants/pagination';
import Pagination from '../../../components/ui/pagination';
import { PaginationProps } from '../../../interfaces/PaginationProps';
import { getRecipesForProduct } from '../../../lib/recipe';
import { ProductPageProps } from '../../../interfaces/ProductPageProps';
import { useAppSelector } from '../../../redux/hooks';
import { selectView } from '../../../redux/slices/viewSlice';
// import RecipeListHeader from '../../../components/recipeListHeader';
import RecipeList from '../../../components/recipe/recipeList';
import AdSense from '../../../components/ui/adsense';
import RecipeListHeader from '../../../components/recipe/recipeListHeader';
import RecipeListBase from '../../../components/recipe/recipeListBase';

export default function ProductPage(props: ProductPageProps) {
    return (
        <RecipeListBase
            {...props}
            title={`Recipes for ${props.product.name}`}
            subtitle={props.product.summary?.length > 0 ? props.product.summary : [`Explore our curated list of recipes made with ${props.product.name}.`]}
            breadcrumbLabel="Products"
            paginationPrefix={`/product/${props.product.slug}`}
        />
    );
}

export const getStaticPaths: GetStaticPaths = async () => {
    const productsDirectory = path.join(process.cwd(), 'data', 'products');
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
    const productPath = path.join(process.cwd(), 'data', 'products', `${params?.slug}.json`);
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
            totalCount,
        },
    }
}