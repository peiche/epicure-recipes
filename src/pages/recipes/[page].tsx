import { GetStaticPaths, GetStaticProps } from 'next';
import { getRecipes } from '../../lib/recipe';
import { RESULTS_PER_PAGE } from '../../constants/pagination';
import { RecipesPageProps } from '../../interfaces/RecipesPageProps';
import RecipeListBase from '../../components/recipe/recipeListBase';

export default function RecipesPaginationPage(props: RecipesPageProps) {
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

export const getStaticPaths: GetStaticPaths = async () => {
    const recipes = getRecipes();
    const totalPages = Math.ceil(recipes.length / RESULTS_PER_PAGE);
    const paths = Array.from({ length: totalPages - 1 }, (_, i) => ({
        params: { page: (i + 2).toString() },
    }));

    return { paths, fallback: false };
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
    const page = parseInt(String(params?.page));
    const recipes = getRecipes();
    const totalCount = recipes.length;
    const totalPages = Math.ceil(totalCount / RESULTS_PER_PAGE);

    if (isNaN(page) || page > totalPages || page < 1) return { notFound: true };

    return {
        props: {
            recipes: recipes.slice((page - 1) * RESULTS_PER_PAGE, page * RESULTS_PER_PAGE),
            pagination: { currentPage: page, totalPages },
            totalCount,
        },
    };
}