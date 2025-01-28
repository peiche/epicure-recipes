import * as React from "react"
import Layout from "../components/layout";
import { graphql, HeadFC, Link as GatsbyLink, navigate } from "gatsby";
import { Autocomplete, Breadcrumbs, Link, List, ListItem, ListItemText, TextField, Typography } from "@mui/material";
import { TagTemplateProps } from "../interfaces/TagTemplateProps";
import { AutocompleteOption } from "../interfaces/AutocompleteOption";

const TagTemplate: React.FC<TagTemplateProps> = ({
    data: {
        allDataJson: { nodes },
    },
    pageContext,
}) => {
    const [tagName, setTagName] = React.useState('');
    const recipes = nodes.sort((a, b) => ((a.slug > b.slug) ? 1 : -1));

    const searchOptions: Array<AutocompleteOption> = recipes.map(recipe => {
        return {
            label: recipe.name,
            path: `/recipe/${recipe.slug}`,
        };
    });

    // until I can find a better way to do this lol
    React.useEffect(() => {
        recipes.forEach(recipe => {
            recipe.tags.forEach(tag => {
                if (tag.slug === pageContext.tag) {
                    setTagName(tag.name);
                }
            })
        })
    }, []);

    const handleAutocompleteChange = (event: React.SyntheticEvent<Element, Event>, value: string | AutocompleteOption | null) => {
        if (value && typeof value === 'object') {
            navigate(value?.path);
        }
    };

    return (
        <Layout>

            <Breadcrumbs>
                <Link underline='hover' color='inherit' component={GatsbyLink} to='/'>Recipes</Link>
                <Typography sx={{ color: 'text.primary' }}>Tags</Typography>
                <Typography sx={{ color: 'text.primary' }}>{tagName}</Typography>
            </Breadcrumbs>

            <Typography component='h1' variant='h4'>
                Recipes tagged with {tagName}
            </Typography>

            <Autocomplete
                options={searchOptions}
                renderInput={(params) => <TextField {...params} label={`Search ${tagName} recipes`} size='small' />}
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

export default TagTemplate

export const Head: HeadFC = () => <title>Epicure Recipes</title>

export const query = graphql`
  query ($tag: String) {
    allDataJson(filter: {tags: {elemMatch: {slug: {eq: $tag}}}}) {
      nodes {
        name
        slug
        tags {
          slug
          name
        }
      }
    }
  }
`
