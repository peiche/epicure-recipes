import fs from 'fs';
import path from 'path';
import Layout from '../../../components/ui/layout';
import Wrapper from '../../../components/layout/wrapper';
import { Breadcrumbs, Grid, Link, Typography } from '@mui/material';
import NextLink from 'next/link';
import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from 'next';
import SEO from '../../../components/layout/seo';
import { RESULTS_PER_PAGE } from '../../../constants/pagination';
import Pagination from '../../../components/ui/pagination';
import { PaginationProps } from '../../../interfaces/PaginationProps';
import { getRecipesForTag } from '../../../lib/recipe';
import { Tag } from '../../../interfaces/Tag';
import { TagPageProps } from '../../../interfaces/TagPageProps';
import React from 'react';
import { useAppSelector } from '../../../redux/hooks';
import { selectView } from '../../../redux/slices/viewSlice';
// import RecipeListHeader from '../../../components/recipeListHeader';
import RecipeList from '../../../components/recipe/recipeList';
import RecipeListHeader from '../../../components/recipe/recipeListHeader';
import RecipeListBase from '../../../components/recipe/recipeListBase';

export default function TagPage(props: TagPageProps) {
    // const {
    //     slug,
    //     name,
    // } = tag;
    // const view = useAppSelector(selectView);

    return (
        <RecipeListBase 
            {...props}
            title={`Recipes for ${props.tag.name}`}
            subtitle={[`Explore our curated list of ${props.tag.name} recipes.`]}
            breadcrumbLabel="Tags"
            paginationPrefix={`/tag/${props.tag.slug}`}
        />
    );
}

export const getStaticPaths: GetStaticPaths = async () => {
    const tagsDirectory = path.join(process.cwd(), 'data', 'tags');
    const filenames = fs.readdirSync(tagsDirectory);

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
    const tagPath = path.join(process.cwd(), 'data', 'tags', `${params?.slug}.json`);
    const content = fs.readFileSync(tagPath, 'utf8');
    const tag: Tag = JSON.parse(content);

    const recipes = getRecipesForTag(params?.slug) || [];

    const totalCount = recipes.length;
    const totalPages = Math.ceil(totalCount / RESULTS_PER_PAGE);

    const pagination: PaginationProps = {
        currentPage: 1,
        totalPages: totalPages,
    };

    return {
        props: {
            tag,
            recipes: recipes.slice(0, RESULTS_PER_PAGE),
            pagination,
            totalCount,
        },
    }
}