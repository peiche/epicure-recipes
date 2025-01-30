import * as React from "react"
import Layout from "../components/layout";
import { graphql, HeadFC, Link as GatsbyLink, navigate } from "gatsby";
import { Autocomplete, Breadcrumbs, Link, List, ListItem, ListItemText, TextField, Typography } from "@mui/material";
import { AutocompleteOption } from "../interfaces/AutocompleteOption";
import Wrapper from "../components/wrapper";
import { Tag } from "../interfaces/Tag";
import { Recipe } from "../interfaces/Recipe";

interface TagTemplateProps {
    data: {
        tagsJson: Tag;
        allRecipesJson: {
            nodes: Array<Recipe>;
        };
    };
}

const TagTemplate: React.FC<TagTemplateProps> = ({
    data: {
        tagsJson: { name },
        allRecipesJson: { nodes: recipes },
    },
}) => {
    return (
        <Layout>
            <Wrapper>

                <Breadcrumbs>
                    <Link underline='hover' color='inherit' component={GatsbyLink} to='/'>Recipes</Link>
                    <Typography sx={{ color: 'text.primary' }}>Tags</Typography>
                    <Typography sx={{ color: 'text.primary' }}>{name}</Typography>
                </Breadcrumbs>

                <Typography component='h1' variant='h4' mt={1} mb={2}>
                    Recipes tagged with {name}
                </Typography>

                <List disablePadding>
                    {recipes.map((recipe, index) => (
                        <ListItem key={index} disablePadding>
                            <ListItemText>
                                <Link component={GatsbyLink} to={`/recipe/${recipe.slug}`}>{recipe.name}</Link>
                            </ListItemText>
                        </ListItem>
                    ))}
                </List>

            </Wrapper>
        </Layout>
    )
}

export default TagTemplate

export const Head: HeadFC = () => <title>Epicure Recipes</title>

export const query = graphql`
  query ($slug: String) {
    tagsJson(slug: {eq: $slug}) {
      name
    }
    allRecipesJson(
      filter: {tags: {elemMatch: {slug: {eq: $slug}}}}
      sort: {slug: ASC}
    ) {
      nodes {
        name
        slug
      }
    }
  }
`
