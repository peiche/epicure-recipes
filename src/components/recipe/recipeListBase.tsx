// src/components/recipe/RecipeListBase.tsx
import { Box, Breadcrumbs, Container, Typography, Link as MuiLink, Grid } from '@mui/material';
// import Grid from '@mui/material/Grid2'; // MUI v7 standard
import { Home } from '@mui/icons-material';
import Link from 'next/link';
import Layout from '../ui/layout';
import SEO from '../layout/seo';
import Wrapper from '../layout/wrapper';
import RecipeList from './recipeList';
import Pagination from '../ui/pagination';
import { RecipesPageProps } from '../../interfaces/RecipesPageProps';

interface RecipeListBaseProps extends RecipesPageProps {
    title: string;
    subtitle: string[];
    breadcrumbLabel: string;
    paginationPrefix: string;
}

export default function RecipeListBase({
    recipes,
    pagination,
    totalCount,
    title,
    subtitle,
    breadcrumbLabel,
    paginationPrefix,
}: RecipeListBaseProps) {
    return (
        <Layout>
            <SEO title={title} />
            <Wrapper>
                <Box component="main" sx={{ flexGrow: 1 }}>
                    {/* Hero Section */}
                    <Box
                        sx={{
                            background: 'linear-gradient(135deg, hsl(24, 95%, 53%) 0%, hsl(24, 95%, 40%) 100%)',
                            py: { xs: 4, md: 6 },
                            mb: 4,
                        }}
                    >
                        <Container maxWidth="xl">
                            <Breadcrumbs sx={{ mb: 2, color: 'rgba(255,255,255,0.7)' }}>
                                <MuiLink
                                    component={Link}
                                    href="/"
                                    sx={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        color: 'rgba(255,255,255,0.7)',
                                        textDecoration: 'none',
                                        '&:hover': { color: 'white' }
                                    }}
                                >
                                    <Home sx={{ mr: 0.5, fontSize: 18 }} />
                                    Home
                                </MuiLink>
                                <Typography sx={{ color: 'white' }}>{breadcrumbLabel}</Typography>
                            </Breadcrumbs>

                            <Typography
                                variant="h2"
                                sx={{
                                    fontFamily: 'var(--font-playfair)',
                                    fontWeight: 700,
                                    color: 'white',
                                    mb: 1,
                                    fontSize: { xs: '2rem', md: '3rem' },
                                }}
                            >
                                {title}
                            </Typography>
                            {subtitle.map((s, i) => (
                                <Typography
                                    variant="h6"
                                    sx={{ color: 'rgba(255,255,255,0.9)', fontWeight: 400 }}
                                >
                                    {/* {s} */}
                                    <span dangerouslySetInnerHTML={{ __html: s }} />
                                </Typography>
                            ))}
                        </Container>
                    </Box>

                    <Container maxWidth="xl">
                        <Box sx={{ mb: 3 }}>
                            <Typography variant="body1" color="text.secondary">
                                Showing <strong>{totalCount.toLocaleString()}</strong> recipes
                            </Typography>
                        </Box>

                        {/* MUI v7 Grid2 implementation */}
                        <Grid container spacing={3} sx={{ mb: 6 }}>
                            <RecipeList recipes={recipes} />

                            <Grid size={12}>
                                {pagination.totalPages > 1 && (
                                    <Pagination
                                        prefix={paginationPrefix}
                                        currentPage={pagination.currentPage}
                                        totalPages={pagination.totalPages}
                                    />
                                )}
                            </Grid>
                        </Grid>
                    </Container>
                </Box>
            </Wrapper>
        </Layout>
    );
}