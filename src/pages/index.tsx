import * as React from "react"
import { graphql, HeadFC, Link } from "gatsby";
import Layout from "../components/layout";
import { Autocomplete, IconButton, InputAdornment, List, ListItem, ListItemText, TextField, Typography } from "@mui/material";
import { Close } from "@mui/icons-material";

const IndexPage: React.FC<RecipeQueryProps> = ({
  data: {
    allDataJson: { edges },
  },
}) => {
  const [search, setSearch] = React.useState('');

  const recipes = edges.map(edge => edge.node);

  const recipesFiltered = React.useMemo(
    () => {
      if (search.length > 0) {
        const keyword = search.toLocaleLowerCase();
        return recipes.filter(recipe => {
          return recipe.name.toLocaleLowerCase().includes(keyword);
        });
      } else {
        return recipes;
      }
    },
    [search]
  );

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setSearch(event.target.value);
  };

  const clearSearch = () => {
    setSearch('');
  };

  return (
    <Layout>
      <Typography component='h1' variant='h4'>Recipes</Typography>

      <TextField
        value={search}
        onChange={handleSearchChange}
        size='small'
        label='Search'
        fullWidth
        sx={{ my: 2 }}
        autoComplete="off"
        slotProps={{
          input: {
            endAdornment: (
              <InputAdornment position="end">
                {search.length > 0 && (
                  <IconButton
                    aria-label='clear search'
                    onClick={clearSearch}
                    edge='end'
                  >
                    <Close />
                  </IconButton>
                )}
              </InputAdornment>
            )
          }
        }}
      />

      <List disablePadding>
        {recipesFiltered.map((recipe, index) => (
          <ListItem key={index} component={Link} to={`/recipe/${recipe.slug}`} disablePadding>
            <ListItemText>{recipe.name}</ListItemText>
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
      edges {
        node {
          id
          name
          slug
        }
      }
    }
  }
`
