import fs from 'fs';
import Layout from "../components/layout";
import Wrapper from "../components/wrapper";
import path from 'path';
import { Recipe } from '../interfaces/Recipe';
import lunr from 'lunr';
import { InferGetStaticPropsType } from 'next';
import { ChangeEvent, ChangeEventHandler, useEffect, useRef, useState } from 'react';
import { Box, Container, IconButton, Link, List, ListItem, ListItemText, Tab, Tabs, TextField, Typography } from '@mui/material';
import NextLink from 'next/link';
import { Close } from '@mui/icons-material';
import { Tag } from '../interfaces/Tag';
import { Product } from '../interfaces/Product';
import { SearchResult } from '../interfaces/SearchResult';
import TabPanel from '../components/tabPanel';
import SEO from '../components/seo';

interface SearchPageProps {
    searchIndex: object;
    allDocuments: SearchResult[];
}

function a11yProps(index: number) {
    return {
        id: `search-tab-${index}`,
        'aria-controls': `search-tabpanel-${index}`,
    };
}

export default function SearchPage({ searchIndex, allDocuments }: SearchPageProps & InferGetStaticPropsType<typeof getStaticProps>) {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState<Array<SearchResult>>([]);
    const [tabValue, setTabValue] = useState(0);

    const handleQueryChanged = (event: ChangeEvent<HTMLInputElement>) => {
        setQuery(event.target.value);
    }

    const clearQuery = () => {
        setQuery('');
        document.getElementById('search')?.focus();
    };

    const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
        setTabValue(newValue);
    };

    useEffect(() => {
        if (query.length > 0) {
            const idx = lunr.Index.load(searchIndex);
            const matches = idx.search(query);

            const searchResults = matches.map((match) => {
                const result = allDocuments[parseInt(match.ref, 10)];
                return {
                    slug: result.slug,
                    name: result.name,
                    type: result.type,
                };
            });

            setResults(searchResults);
        } else {
            setResults([]);
        }
    }, [query])

    return (
        <Layout>
            <SEO title={`Search: ${query}`} />
            <Wrapper>

                <TextField
                    id='search'
                    value={query}
                    onChange={handleQueryChanged}
                    label='Search recipes'
                    placeholder='Type to search'
                    size='small'
                    fullWidth
                    autoFocus
                    autoComplete='off'
                    slotProps={{
                        input: {
                            endAdornment: (
                                query.length > 0 && (
                                    <IconButton onClick={clearQuery}>
                                        <Close />
                                    </IconButton>
                                )
                            )
                        }
                    }}
                    sx={{ mt: 1, mb: 2 }}
                />

                {results.length > 0 ? (
                    <>
                        <Tabs value={tabValue} onChange={handleTabChange} aria-label="basic tabs example">
                            <Tab label="Recipes" {...a11yProps(0)} sx={{
                                display: results.filter(x => x.type === 'recipe').length > 0 ? 'default' : 'none',
                            }} />
                            <Tab label="Tags" {...a11yProps(1)} sx={{
                                display: results.filter(x => x.type === 'tag').length > 0 ? 'default' : 'none',
                            }} />
                            <Tab label="Products" {...a11yProps(2)} sx={{
                                display: results.filter(x => x.type === 'product').length > 0 ? 'default' : 'none',
                            }} />
                        </Tabs>
                        <TabPanel value={tabValue} index={0}>
                            <List disablePadding>
                                {results.map((result, index) => (
                                    result.type === 'recipe' && (
                                        <ListItem key={index} disablePadding>
                                            <ListItemText>
                                                <Link component={NextLink} href={`/recipe/${result.slug}`}>{result.name}</Link>
                                            </ListItemText>
                                        </ListItem>
                                    )))}
                            </List>
                        </TabPanel>
                        <TabPanel value={tabValue} index={1}>
                            <List disablePadding>
                                {results.map((result, index) => (
                                    result.type === 'tag' && (
                                        <ListItem key={index} disablePadding>
                                            <ListItemText>
                                                <Link component={NextLink} href={`/tag/${result.slug}`}>{result.name}</Link>
                                            </ListItemText>
                                        </ListItem>
                                    )))}
                            </List>
                        </TabPanel>
                        <TabPanel value={tabValue} index={2}>
                            <List disablePadding>
                                {results.map((result, index) => (
                                    result.type === 'product' && (
                                        <ListItem key={index} disablePadding>
                                            <ListItemText>
                                                <Link component={NextLink} href={`/product/${result.slug}`}>{result.name}</Link>
                                            </ListItemText>
                                        </ListItem>
                                    )))}
                            </List>
                        </TabPanel>
                    </>
                ) : (
                    <Typography sx={{
                        my: 5,
                        fontStyle: 'italic',
                        textAlign: 'center',
                    }}>
                        Nothing to show yet. Start typing to search.
                    </Typography>
                )}

            </Wrapper>
        </Layout>
    )
}

export const getStaticProps = () => {
    const recipesDirectory = path.join(process.cwd(), 'src', 'data', 'recipes');
    const recipesFilenames = fs.readdirSync(recipesDirectory);
    const recipes = recipesFilenames
        .filter((file) => file.endsWith('.json'))
        .map((file) => {
            const filePath = path.join(recipesDirectory, file);
            const content = fs.readFileSync(filePath, "utf-8");
            return JSON.parse(content) as Recipe;
        })
        .flat();

    const tagsDirectory = path.join(process.cwd(), 'src', 'data', 'tags');
    const tagsFilenames = fs.readdirSync(tagsDirectory);
    const tags = tagsFilenames
        .filter((file) => file.endsWith('.json'))
        .map((file) => {
            const filePath = path.join(tagsDirectory, file);
            const content = fs.readFileSync(filePath, "utf-8");
            return JSON.parse(content) as Tag;
        })
        .flat();

    const productsDirectory = path.join(process.cwd(), 'src', 'data', 'products');
    const productsFilenames = fs.readdirSync(productsDirectory);
    const products = productsFilenames
        .filter((file) => file.endsWith('.json'))
        .map((file) => {
            const filePath = path.join(productsDirectory, file);
            const content = fs.readFileSync(filePath, "utf-8");
            return JSON.parse(content) as Product;
        })
        .flat();

    const recipeDocs: SearchResult[] = recipes.map(recipe => {
        return {
            slug: recipe.slug,
            name: recipe.name,
            description: recipe.description,
            tags: recipe.tags?.map(tag => tag.name).join(' '),
            products: recipe.products?.map(product => product.name).join(' '),
            type: 'recipe',
        };
    });
    const tagDocs: SearchResult[] = tags.map(tag => {
        return {
            slug: tag.slug,
            name: tag.name,
            type: 'tag',
        };
    });
    const productDocs: SearchResult[] = products.map(product => {
        return {
            slug: product.slug,
            name: product.name,
            type: 'product',
        };
    });

    const allDocuments: SearchResult[] = [
        ...recipeDocs,
        ...tagDocs,
        ...productDocs,
    ];

    const idx = lunr(function () {
        this.ref('id');
        this.field('name', { boost: 30 });
        this.field('description', { boost: 20 });
        this.field('tags', { boost: 10 });
        this.field('products');

        allDocuments.forEach((doc, index) => {
            this.add({
                id: index,
                ...doc,
            });
        });
    });

    return {
        props: {
            searchIndex: idx.toJSON(),
            allDocuments,
        },
    };
}
