import { GatsbyNode, graphql } from "gatsby";
import path from "path";
import { RecipeNodeProps } from "./src/interfaces/RecipeNodeProps";
import axios from "axios";

export const createPages: GatsbyNode['createPages'] = async ({
    graphql,
    actions,
    reporter,
}) => {
    const { createPage } = actions;

    const result: RecipeNodeProps = await graphql(
        `
            query {
                allRecipesJson {
                    edges {
                        node {
                            slug
                        }
                    }
                }
                allTagsJson {
                    edges {
                        node {
                            slug
                        }
                    }
                }
                allProductsJson {
                    edges {
                        node {
                            slug
                        }
                    }
                }
            }
        `
    );

    if (result.errors) {
        reporter.panicOnBuild(`Error while running GraphQL query.`);
    }

    result.data?.allRecipesJson.edges.forEach(({ node }) => {
        const { slug } = node;
        if (!slug) {
            return;
        }

        createPage({
            path: `recipe/${slug}`,
            component: path.resolve(`src/templates/recipe.tsx`),
            context: {
                slug,
            },
        });

        createPage({
            path: `recipe/${slug}/print`,
            component: path.resolve(`src/templates/recipe-print.tsx`),
            context: {
                slug,
            },
        });
    });

    result.data?.allTagsJson.edges.forEach(({ node }) => {
        const { slug } = node;
        if (!slug) {
            return;
        }

        createPage({
            path: `tag/${slug}`,
            component: path.resolve(`src/templates/tag.tsx`),
            context: {
                slug,
            },
        });
    });

    result.data?.allProductsJson.edges.forEach(({ node }) => {
        const { slug } = node;
        if (!slug) {
            return;
        }

        createPage({
            path: `product/${slug}`,
            component: path.resolve(`src/templates/product.tsx`),
            context: {
                slug,
            },
        });
    });
}