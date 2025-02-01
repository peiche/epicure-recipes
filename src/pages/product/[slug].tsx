import fs from 'fs';
import path from 'path';
import Layout from '../../components/layout';
import Wrapper from '../../components/wrapper';
import { Breadcrumbs, Link, List, ListItem, ListItemText, Typography } from '@mui/material';
import NextLink from 'next/link';
import { GetStaticProps, InferGetStaticPropsType } from 'next';
import { Product } from '../../interfaces/Product';
import { Recipe } from '../../interfaces/Recipe';

interface ProductPageProps {
    product: Product;
    recipes: Recipe[];
}

export default function ProductPage({ product, recipes }: ProductPageProps & InferGetStaticPropsType<typeof getStaticProps>) {
    const {
        name,
    } = product;

    return (
        <Layout>
            <Wrapper>

                <Breadcrumbs>
                    <Link underline='hover' color='inherit' component={NextLink} href='/'>Recipes</Link>
                    <Typography sx={{ color: 'text.primary' }}>Products</Typography>
                    <Typography sx={{ color: 'text.primary' }}>{name}</Typography>
                </Breadcrumbs>

                <Typography component='h1' variant='h4' mt={1} mb={2}>
                    Recipes made with {name}
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
    const productsDirectory = path.join(process.cwd(), 'src', 'data', 'products');
    const filenames = fs.readdirSync(productsDirectory);

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
    const productPath = path.join(process.cwd(), 'src', 'data', 'products', `${context.params?.slug}.json`);
    const content = fs.readFileSync(productPath, 'utf8');
    const product: Product = JSON.parse(content);

    const recipes: Recipe[] = [];
    const recipesDirectory = path.join(process.cwd(), 'src', 'data', 'recipes');
    let filenames = fs.readdirSync(recipesDirectory);
    filenames = filenames.map(filename => path.join(process.cwd(), 'src', 'data', 'recipes', filename));
    filenames.forEach((filename) => {
        const content = fs.readFileSync(filename, 'utf8');
        const recipe: Recipe = JSON.parse(content);

        let shouldAdd = false;
        recipe.products?.forEach((product: Product) => {
            if (product.slug === context.params?.slug) {
                shouldAdd = true;
            }
        });

        if (shouldAdd) {
            recipes.push(recipe);
        }
    });

    return {
        props: {
            product,
            recipes,
        },
    }
}