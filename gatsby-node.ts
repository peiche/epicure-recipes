import { GatsbyNode, graphql } from "gatsby";
import path from "path";
import { RecipeNodeProps } from "./src/interfaces/RecipeNodeProps";

export const createPages: GatsbyNode['createPages'] = async ({
    graphql,
    actions,
    reporter,
}) => {
    const { createPage } = actions;

    const result: RecipeNodeProps = await graphql(
        `
            query {
                allDataJson {
                    edges {
                        node {
                            slug
                        }
                    }
                    distinct(field: {tags: {slug: SELECT}})
                }
            }
        `
    );

    if (result.errors) {
        reporter.panicOnBuild(`Error while running GraphQL query.`);
    }

    const recipeTemplate = path.resolve(`src/templates/recipe.tsx`);
    result.data?.allDataJson.edges.forEach(({ node }) => {
        const { slug } = node;
        if (!slug) {
            return;
        }

        createPage({
            path: `recipe/${slug}`,
            component: recipeTemplate,
            context: {
                slug,
            },
        });
    });

    const tagTemplate = path.resolve(`src/templates/tag.tsx`);
    result.data?.allDataJson.distinct.forEach((tag) => {
        createPage({
            path: `tag/${tag}`,
            component: tagTemplate,
            context: {
                tag,
            },
        });
    });
}