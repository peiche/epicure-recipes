import { GetStaticPaths, GetStaticProps } from 'next';
import { getAllRecipes } from '../../lib/recipe';
import { RESULTS_PER_PAGE } from '../../constants/pagination';
import RecipesPageProps from '../../interfaces/RecipesPageProps';
import RecipeListBase from '../../components/recipe/recipeListBase';

export default function RecipesPage(props: RecipesPageProps) {
    return (
        <RecipeListBase 
            {...props}
            title="Browse All Recipes"
            subtitle={["Discover delicious recipes for every occasion"]}
            breadcrumbLabel="Recipes"
            paginationPrefix="/recipes"
        />
    );
}

/**
 * Generates paths for /recipes (page 1) 
 * and /recipes/2, /recipes/3, etc.
 */
export const getStaticPaths: GetStaticPaths = async () => {
    const allRecipes = getAllRecipes();
    const totalPages = Math.ceil(allRecipes.length / RESULTS_PER_PAGE);

    // 1. Root path: /recipes (params.page will be empty)
    const paths: Array<{ params: { page: string[] } }> = [{ params: { page: [] } }];

    // 2. Paginated paths: /recipes/2, /recipes/3...
    for (let i = 2; i <= totalPages; i++) {
        paths.push({ params: { page: [i.toString()] } });
    }

    return {
        paths,
        fallback: false,
    };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
    // page is undefined for /recipes, or ['2'] for /recipes/2
    const pageArray = params?.page as string[] | undefined;
    const currentPage = pageArray && pageArray[0] ? parseInt(pageArray[0], 10) : 1;

    const allRecipes = getAllRecipes();
    const totalCount = allRecipes.length;
    const totalPages = Math.ceil(totalCount / RESULTS_PER_PAGE);

    // Safety: 404 if page requested is out of range
    if (currentPage > totalPages && totalPages > 0) {
        return { notFound: true };
    }

    // Calculate slicing bounds
    const start = (currentPage - 1) * RESULTS_PER_PAGE;
    const paginatedRecipes = allRecipes.slice(start, start + RESULTS_PER_PAGE);

    return {
        props: {
            recipes: paginatedRecipes,
            pagination: {
                currentPage,
                totalPages,
            },
            totalCount,
        },
    };
};
