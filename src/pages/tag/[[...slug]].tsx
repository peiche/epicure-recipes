import { GetStaticPaths, GetStaticProps } from 'next';
import { RESULTS_PER_PAGE } from '../../constants/pagination';
import { getAllTagSlugs, getRecipesByTag, getTagBySlug } from '../../lib/recipe';
import TagPageProps from '../../interfaces/TagPageProps';
import React from 'react';
import RecipeListBase from '../../components/recipe/recipeListBase';

export default function TagPage(props: TagPageProps) {
    // If the data hasn't loaded or tag is missing, Next.js handles via notFound in getStaticProps
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
    const tagSlugs = getAllTagSlugs();
    const paths: Array<{ params: { slug: string[] } }> = [];

    tagSlugs.forEach((slug) => {
        const recipes = getRecipesByTag(slug);
        const totalPages = Math.ceil(recipes.length / RESULTS_PER_PAGE);

        // Path for Page 1: /tag/dinner
        paths.push({ params: { slug: [slug] } });

        // Paths for Page 2+: /tag/dinner/2
        for (let i = 2; i <= totalPages; i++) {
            paths.push({ params: { slug: [slug, i.toString()] } });
        }
    });

    return {
        paths,
        fallback: false, // Set to 'blocking' if you want to handle new tags without a rebuild
    };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
    const slugArray = params?.slug as string[];
    
    // Safety check for empty params
    if (!slugArray || slugArray.length === 0) {
        return { notFound: true };
    }

    const tagSlug = slugArray[0];
    const pagePart = slugArray[1];
    const currentPage = pagePart ? parseInt(pagePart, 10) : 1;

    // 1. Fetch Tag Metadata
    const tag = getTagBySlug(tagSlug);
    if (!tag) return { notFound: true };

    // 2. Fetch and Paginate Recipes
    const allRecipesForTag = getRecipesByTag(tagSlug) || [];
    const totalCount = allRecipesForTag.length;
    const totalPages = Math.ceil(totalCount / RESULTS_PER_PAGE);

    // Redirect or 404 if user tries to access a page higher than exists
    if (currentPage > totalPages && totalPages > 0) {
        return { notFound: true };
    }

    const start = (currentPage - 1) * RESULTS_PER_PAGE;
    const paginatedRecipes = allRecipesForTag.slice(start, start + RESULTS_PER_PAGE);

    return {
        props: {
            tag,
            recipes: paginatedRecipes,
            pagination: {
                currentPage,
                totalPages,
            },
            totalCount,
        },
    };
};
