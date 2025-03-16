import fs from 'fs';
import path from 'path';
import Layout from '../../../components/layout';
import Wrapper from '../../../components/wrapper';
import { GetStaticPaths, GetStaticPathsResult, GetStaticProps, InferGetStaticPropsType } from 'next';
import SEO from '../../../components/seo';
import RecipeCard from '../../../components/recipeCard';
import { RESULTS_PER_PAGE } from '../../../constants/pagination';
import Pagination from '../../../components/pagination';
import { PaginationProps } from '../../../interfaces/PaginationProps';
import { TagPageProps } from '../../../interfaces/TagPageProps';
import { getRecipesForTag } from '../../../lib/recipe';
import { Tag } from '../../../interfaces/Tag';
import { Typography } from '@progress/kendo-react-common';
import { GridLayout, GridLayoutItem } from '@progress/kendo-react-layout';
import Breadcrumb from '../../../components/breadcrumbs';

export default function TagPaginationPage({ tag, recipes, pagination }: TagPageProps & InferGetStaticPropsType<typeof getStaticProps>) {
    const {
        slug,
        name,
    } = tag;

    return (
        <Layout>
            <SEO title={`Tag: ${name}`} />
            <Wrapper>

                <Breadcrumb
                    items={[
                        { text: 'Recipes', href: '/recipes' },
                        { text: 'Tags' },
                        { text: name },
                    ]}
                />

                <Typography.h1 className='k-h3'>
                    Recipes tagged with {name}
                </Typography.h1>

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
                            prefix={`/tag/${slug}`}
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
    const tagsDirectory = path.join(process.cwd(), 'src', 'data', 'tags');
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
    const tagPath = path.join(process.cwd(), 'src', 'data', 'tags', `${params?.slug}.json`);
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
