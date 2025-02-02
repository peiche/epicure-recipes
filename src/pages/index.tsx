import fs from 'fs';
import path from 'path';
import Layout from '../components/layout';
import Wrapper from '../components/wrapper';
import { Link, List, ListItem, ListItemText, Typography } from '@mui/material';
import NextLink from 'next/link';
import { Recipe } from '../interfaces/Recipe';
import { InferGetStaticPropsType } from 'next';
import SEO from '../components/seo';

interface HomePageProps {
    recipes: Recipe[];
}

export default function HomePage({ recipes }: HomePageProps & InferGetStaticPropsType<typeof getStaticProps>) {
    return (
        <Layout>
            <SEO title='Home' />
            <Wrapper>
                <Typography component='h1' variant='h4' mt={1} mb={2}>Epicure Recipes</Typography>

                <List disablePadding>
                    {recipes.map((recipe, index) => (
                        <ListItem key={index} disablePadding>
                            <ListItemText>
                                <Link component={NextLink} href={`/recipe/${recipe.slug}`}>{recipe.name}</Link>
                            </ListItemText>
                        </ListItem>
                    ))}
                </List>

            </Wrapper>
        </Layout>
    );
}

export const getStaticProps = () => {
    const recipesDirectory = path.join(process.cwd(), 'src', 'data', 'recipes');
    let filenames = fs.readdirSync(recipesDirectory);
    filenames = filenames.map(filename => path.join(process.cwd(), 'src', 'data', 'recipes', filename));

    const recipes: Recipe[] = [];
    filenames.forEach((filename) => {
        const content = fs.readFileSync(filename, 'utf8');
        const recipe: Recipe = JSON.parse(content);

        recipes.push(recipe);
    });

    return {
        props: {
            recipes,
        },
    };
}
