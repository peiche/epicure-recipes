import fs from 'fs';
import path from 'path';
import Layout from '../../../components/layout';
import Wrapper from '../../../components/wrapper';
import { Breadcrumbs, Grid, Link, Typography } from '@mui/material';
import NextLink from 'next/link';
import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from 'next';
import SEO from '../../../components/seo';
import { RESULTS_PER_PAGE } from '../../../constants/pagination';
import Pagination from '../../../components/pagination';
import { PaginationProps } from '../../../interfaces/PaginationProps';
import { getRecipesForTag } from '../../../lib/recipe';
import { Tag } from '../../../interfaces/Tag';
import { TagPageProps } from '../../../interfaces/TagPageProps';
import React from 'react';
import { useAppSelector } from '../../../redux/hooks';
import { selectView } from '../../../redux/slices/viewSlice';
import RecipeListHeader from '../../../components/recipeListHeader';
import RecipeList from '../../../components/recipeList';

export default function TagPage({ tag, recipes, pagination }: TagPageProps & InferGetStaticPropsType<typeof getStaticProps>) {
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
    const tagsDirectory = path.join(process.cwd(), 'src', 'data', 'tags');
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
    const tagPath = path.join(process.cwd(), 'src', 'data', 'tags', `${params?.slug}.json`);
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
        },
    }
}