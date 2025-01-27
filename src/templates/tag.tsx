import * as React from "react"
import Layout from "../components/layout";
import { graphql, HeadFC, Link as GatsbyLink, PageProps } from "gatsby";
import { Breadcrumbs, Link, List, ListItem, ListItemText, Typography } from "@mui/material";

interface TagTemplateProps {
    data: {
        allDataJson: {
            nodes: RecipeJson[];
        };
    };
    pageContext: {
        tag: string;
    };
}

const TagTemplate: React.FC<TagTemplateProps> = ({ data, pageContext }) => {
    const [tagName, setTagName] = React.useState('');
    const recipes = data.allDataJson.nodes;

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

    return (
        <Layout>

            <Breadcrumbs>
                <Link underline='hover' color='inherit' component={GatsbyLink} to='/'>Recipes</Link>
                <Typography sx={{ color: 'text.primary' }}>Tags</Typography>
                <Typography sx={{ color: 'text.primary' }}>{tagName}</Typography>
            </Breadcrumbs>

            <Typography component='h1' variant='h4' sx={{ my: 1 }}>
                {tagName}
            </Typography>

            <List disablePadding>
                {recipes.map((recipe, index) => (
                    <ListItem key={index} component={GatsbyLink} to={`/recipe/${recipe.slug}`} disablePadding>
                        <ListItemText>{recipe.name}</ListItemText>
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
