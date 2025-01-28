import * as React from "react"
import { graphql, HeadFC, Link as GatsbyLink, navigate } from "gatsby";
import Layout from "../components/layout";
import { Autocomplete, Link, List, ListItem, ListItemText, TextField, Typography } from "@mui/material";
import { RecipeQueryProps } from "../interfaces/RecipeQueryProps";
import { AutocompleteOption } from "../interfaces/AutocompleteOption";

const IndexPage: React.FC<RecipeQueryProps> = ({
  data: {
    allDataJson: { nodes },
  },
}) => {
  const recipes = nodes.sort((a, b) => ((a.slug > b.slug) ? 1 : -1));

  const searchOptions: Array<AutocompleteOption> = recipes.map(recipe => {
    return {
      label: recipe.name,
      path: `/recipe/${recipe.slug}`,
    };
  });

  const handleAutocompleteChange = (event: React.SyntheticEvent<Element, Event>, value: string | AutocompleteOption | null) => {
    if (value && typeof value === 'object') {
      navigate(value?.path);
    }
  };

  return (
    <Layout>
      <Typography component='h1' variant='h4'>Recipes</Typography>

      <Autocomplete
        options={searchOptions}
        renderInput={(params) => <TextField {...params} label='Search recipes' size='small' />}
        freeSolo
        openOnFocus={false}
        selectOnFocus={false}
        onChange={handleAutocompleteChange}
        sx={{ my: 2 }}
      />

      <List disablePadding>
        {recipes.map((recipe, index) => (
          <ListItem key={index} disablePadding>
            <ListItemText>
              <Link component={GatsbyLink} to={`/recipe/${recipe.slug}`}>{recipe.name}</Link>
            </ListItemText>
          </ListItem>
        ))}
      </List>
    </Layout>
  )
}

export default IndexPage

export const Head: HeadFC = () => <title>Epicure Recipes</title>

export const query = graphql`
  query {
    allDataJson {
      nodes {
        id
        name
        slug
      }
    }
  }
`
