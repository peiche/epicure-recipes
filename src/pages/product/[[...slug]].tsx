import { GetStaticPaths, GetStaticProps } from 'next';
import { RESULTS_PER_PAGE } from '../../constants/pagination';
import { 
  getAllProductSlugs, 
  getRecipesByProduct, 
  getProductBySlug 
} from '../../lib/recipe';
import ProductPageProps from '../../interfaces/ProductPageProps';
import React from 'react';
import RecipeListBase from '../../components/recipe/recipeListBase';

export default function ProductPage(props: ProductPageProps) {
  return (
    <RecipeListBase
      {...props}
      title={`Recipes for ${props.product.name}`}
      subtitle={
        props.product.summary?.length > 0 
          ? props.product.summary 
          : [`Explore our curated list of recipes made with ${props.product.name}.`]
      }
      breadcrumbLabel="Products"
      paginationPrefix={`/product/${props.product.slug}`}
    />
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const slugs = getAllProductSlugs();
  const paths: Array<{ params: { slug: string[] } }> = [];

  slugs.forEach((slug) => {
    const recipes = getRecipesByProduct(slug);
    const totalPages = Math.ceil(recipes.length / RESULTS_PER_PAGE);

    // Path for Page 1: /product/maple-syrup
    paths.push({ params: { slug: [slug] } });

    // Paths for Page 2+: /product/maple-syrup/2
    for (let i = 2; i <= totalPages; i++) {
      paths.push({ params: { slug: [slug, i.toString()] } });
    }
  });

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const slugArray = params?.slug as string[];

  if (!slugArray || slugArray.length === 0) {
    return { notFound: true };
  }

  const productSlug = slugArray[0];
  const pagePart = slugArray[1];
  const currentPage = pagePart ? parseInt(pagePart, 10) : 1;

  // 1. Get Product Metadata from the library
  const product = getProductBySlug(productSlug);
  if (!product) return { notFound: true };

  // 2. Get and Paginate Recipes from the library
  const allRecipesForProduct = getRecipesByProduct(productSlug) || [];
  const totalCount = allRecipesForProduct.length;
  const totalPages = Math.ceil(totalCount / RESULTS_PER_PAGE);

  // 404 if the page number is out of bounds
  if (currentPage > totalPages && totalPages > 0) {
    return { notFound: true };
  }

  const start = (currentPage - 1) * RESULTS_PER_PAGE;
  const paginatedRecipes = allRecipesForProduct.slice(start, start + RESULTS_PER_PAGE);

  return {
    props: {
      product,
      recipes: paginatedRecipes,
      pagination: {
        currentPage,
        totalPages,
      },
      totalCount,
    },
  };
};
