import { Box, Breadcrumbs, Container, Typography, Link, Grid } from '@mui/material';
import { Home } from '@mui/icons-material';
import NextLink from 'next/link';
import Layout from '../ui/layout';
import SEO from '../layout/seo';
import Wrapper from '../layout/wrapper';
import RecipeList from './recipeList';
import Pagination from '../ui/pagination';
import RecipesPageProps from '../../interfaces/RecipesPageProps';
import config from '../../config';
import { buildBreadcrumbSchema, buildItemListSchema, cleanHtml } from '../../lib/seo-utils';
import { RESULTS_PER_PAGE } from '../../constants/pagination';

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
    const isFirstPage = !pagination || pagination.currentPage <= 1;
    const pageTitle = isFirstPage ? title : `${title} - Page ${pagination.currentPage}`;
    const canonicalPath = isFirstPage ? `${paginationPrefix}/` : `${paginationPrefix}/${pagination.currentPage}/`;
    const cleanSubtitle = subtitle.map(cleanHtml).join(' ').trim();
    const metaDescription = cleanSubtitle || `Browse ${title} on Epicure Recipes. Discover healthy, quick recipes with clean ingredients.`;

    const breadcrumbItems: Array<{ name: string; path: string }> = [
        { name: 'Home', path: '/' },
    ];

    if (paginationPrefix === '/recipes') {
        breadcrumbItems.push({ name: 'Recipes', path: '/recipes/' });
    } else if (paginationPrefix.startsWith('/tag/')) {
        breadcrumbItems.push({ name: 'Categories', path: '/categories/' });
        breadcrumbItems.push({ name: title.replace(/^Recipes for\s*/i, ''), path: `${paginationPrefix}/` });
    } else if (paginationPrefix.startsWith('/product/')) {
        breadcrumbItems.push({ name: 'Products', path: '/categories/' });
        breadcrumbItems.push({ name: title.replace(/^Recipes for\s*/i, ''), path: `${paginationPrefix}/` });
    } else {
        breadcrumbItems.push({ name: breadcrumbLabel, path: `${paginationPrefix}/` });
    }

    const breadcrumbSchema = buildBreadcrumbSchema(breadcrumbItems, config.siteUrl);
    const startPosition = ((pagination?.currentPage || 1) - 1) * RESULTS_PER_PAGE + 1;
    const itemListSchema = buildItemListSchema(
        recipes.map((r) => ({
            name: r.name,
            path: `/recipe/${r.slug}/`,
            image: r.image ? `/images/recipes/${r.image}` : undefined,
        })),
        config.siteUrl,
        startPosition
    );

    return (
        <Layout>
            <SEO
                title={pageTitle}
                description={metaDescription}
                canonical={canonicalPath}
                jsonLd={[breadcrumbSchema, itemListSchema]}
            />
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
                                <Link
                                    component={NextLink}
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
                                </Link>
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
                                    key={i}
                                    variant="h6"
                                    sx={{ color: 'rgba(255,255,255,0.9)', fontWeight: 400 }}
                                >
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