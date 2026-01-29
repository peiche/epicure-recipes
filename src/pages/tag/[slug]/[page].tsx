import fs from 'fs';
import path from 'path';
import Layout from '../../../components/ui/layout';
import Wrapper from '../../../components/layout/wrapper';
import { Breadcrumbs, Grid, Link, Typography } from '@mui/material';
import NextLink from 'next/link';
import { GetStaticPaths, GetStaticPathsResult, GetStaticProps, InferGetStaticPropsType } from 'next';
import SEO from '../../../components/layout/seo';
import { RESULTS_PER_PAGE } from '../../../constants/pagination';
import Pagination from '../../../components/ui/pagination';
import { PaginationProps } from '../../../interfaces/PaginationProps';
import { TagPageProps } from '../../../interfaces/TagPageProps';
import { getRecipesForTag } from '../../../lib/recipe';
import { Tag } from '../../../interfaces/Tag';
import React from 'react';
// import RecipeListHeader from '../../../components/recipeListHeader';
import { useAppSelector } from '../../../redux/hooks';
import { selectView } from '../../../redux/slices/viewSlice';
import RecipeList from '../../../components/recipe/recipeList';
import RecipeListHeader from '../../../components/recipe/recipeListHeader';

export default function TagPaginationPage({ tag, recipes, pagination }: TagPageProps & InferGetStaticPropsType<typeof getStaticProps>) {
    const {
        slug,
        name,
    } = tag;
    const view = useAppSelector(selectView);

    return (
        <Layout>
            <SEO title={`Tag: ${name}`} />
            <Wrapper>

                <Breadcrumbs>
                    <Link underline='hover' color='inherit' component={NextLink} href='/recipes'>Recipes</Link>
                    <Typography sx={{ color: 'text.primary' }}>Tags</Typography>
                    <Typography sx={{ color: 'text.primary' }}>{name}</Typography>
                </Breadcrumbs>

                <RecipeListHeader
                    title={`Recipes tagged with ${name}`}
                    view={view}
                />

                <Grid container spacing={2}>
                    <RecipeList recipes={recipes} />

                    <Grid size={12}>
                        {pagination.totalPages > 1 && (
                            <Pagination
                                prefix={`/tag/${slug}`}
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
    const tagsDirectory = path.join(process.cwd(), 'data', 'tags');
    const filenames = fs.readdirSync(tagsDirectory);

    let staticPathsResult: GetStaticPathsResult = {
        paths: [],
        fallback: false,
    };

    filenames.forEach((filename) => {
        const slug = filename.replace(/\.json$/, '');
        const recipes = getRecipesForTag(slug);

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

export const getStaticProps: GetStaticProps = async ({ params }) => {
    const page = parseInt(String(params?.page));
    const tagPath = path.join(process.cwd(), 'data', 'tags', `${params?.slug}.json`);
    const content = fs.readFileSync(tagPath, 'utf8');
    const tag: Tag = JSON.parse(content);

    const recipes = getRecipesForTag(params?.slug) || [];

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
            tag,
            recipes: recipes.slice(
                ((pagination.currentPage - 1) * RESULTS_PER_PAGE),
                ((pagination.currentPage - 1) * RESULTS_PER_PAGE) + RESULTS_PER_PAGE
            ),
            pagination,
        },
    }
}
