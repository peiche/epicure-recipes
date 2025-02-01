import fs from 'fs';
import path from 'path';
import Layout from '../../components/layout';
import Wrapper from '../../components/wrapper';
import { Breadcrumbs, Link, List, ListItem, ListItemText, Typography } from '@mui/material';
import NextLink from 'next/link';
import { GetStaticProps, InferGetStaticPropsType } from 'next';
import { Tag } from '../../interfaces/Tag';
import { Recipe } from '../../interfaces/Recipe';

interface TagPageProps {
    tag: Tag;
    recipes: Recipe[];
}

export default function TagPage({ tag, recipes }: TagPageProps & InferGetStaticPropsType<typeof getStaticProps>) {
    const {
        name,
    } = tag;

    return (
        <Layout>
            <Wrapper>

                <Breadcrumbs>
                    <Link underline='hover' color='inherit' component={NextLink} href='/'>Recipes</Link>
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
                                <Link component={NextLink} href={`/recipe/${recipe.slug}`}>{recipe.name}</Link>
                            </ListItemText>
                        </ListItem>
                    ))}
                </List>

            </Wrapper>
        </Layout>
    );
}

export async function getStaticPaths() {
    const tagsDirectory = path.join(process.cwd(), 'src', 'data', 'tags');
    const filenames = fs.readdirSync(tagsDirectory);

    return {
        paths: filenames.map((filename) => ({
            params: {
                slug: filename.replace(/\.json$/, ''),
            },
        })),
        fallback: false,
    };
}

export const getStaticProps: GetStaticProps = (context) => {
    const tagPath = path.join(process.cwd(), 'src', 'data', 'tags', `${context.params?.slug}.json`);
    const content = fs.readFileSync(tagPath, 'utf8');
    const tag: Tag = JSON.parse(content);

    const recipes: Recipe[] = [];
    const recipesDirectory = path.join(process.cwd(), 'src', 'data', 'recipes');
    let filenames = fs.readdirSync(recipesDirectory);
    filenames = filenames.map(filename => path.join(process.cwd(), 'src', 'data', 'recipes', filename));
    filenames.forEach((filename) => {
        const content = fs.readFileSync(filename, 'utf8');
        const recipe: Recipe = JSON.parse(content);

        let shouldAdd = false;
        recipe.tags?.forEach((tag: Tag) => {
            if (tag.slug === context.params?.slug) {
                shouldAdd = true;
            }
        });

        if (shouldAdd) {
            recipes.push(recipe);
        }
    });

    return {
        props: {
            tag,
            recipes,
        },
    };
}