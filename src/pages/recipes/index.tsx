import { GetStaticProps } from 'next';
import { getRecipes } from '../../lib/recipe';
import { RESULTS_PER_PAGE } from '../../constants/pagination';
import { RecipesPageProps } from '../../interfaces/RecipesPageProps';
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

export const getStaticProps: GetStaticProps = async () => {
    const recipes = getRecipes();
    const totalCount = recipes.length;
    
    return {
        props: {
            recipes: recipes.slice(0, RESULTS_PER_PAGE),
            pagination: { currentPage: 1, totalPages: Math.ceil(totalCount / RESULTS_PER_PAGE) },
            totalCount,
        },
    };
}