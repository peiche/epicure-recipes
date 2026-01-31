import { Box, Container, Grid, Paper, Typography } from "@mui/material";
import SEO from "../components/layout/seo";
import Wrapper from "../components/layout/wrapper";
import Layout from "../components/ui/layout";
import { ALL_CATEGORY_GROUPS } from "../lib/recipe-utils";
import NextLink from "next/link";
import { getSearchUrlForTags } from "../utils/utils";

export default function CategoriesPage() {
    return (
        <Layout>
            <SEO title='Categories' />
            <Wrapper>
                <Box component="main" sx={{ flex: 1, py: { xs: 4, md: 8 }, bgcolor: 'background.default' }}>
                    <Container maxWidth="xl">
                        {/* Page Header */}
                        <Box sx={{ textAlign: 'center', mb: { xs: 4, md: 6 } }}>
                            <Typography
                                variant="h1"
                                sx={{
                                    fontSize: { xs: '2rem', md: '3rem' },
                                    fontWeight: 700,
                                    fontFamily: 'Playfair Display',
                                    mb: 2,
                                }}
                            >
                                Recipe Categories
                            </Typography>
                            <Typography
                                variant="body1"
                                color="text.secondary"
                                sx={{ maxWidth: 600, mx: 'auto', fontSize: { xs: '1rem', md: '1.125rem' } }}
                            >
                                Explore our collection of Epicure recipes organized by cuisine type and cooking style
                            </Typography>
                        </Box>

                        {/* Categories Grid */}
                        <Grid container spacing={3}>
                            {ALL_CATEGORY_GROUPS.map((category, index) => (
                                <Grid size={{ xs: 6, sm: 4, md: 3 }} key={category.id}>
                                    <Paper
                                        elevation={0}
                                        component={NextLink}
                                        href={getSearchUrlForTags(category.tags)}
                                        sx={{
                                            display: 'block',
                                            textDecoration: 'none',
                                            p: { xs: 3, md: 4 },
                                            textAlign: 'center',
                                            borderRadius: 3,
                                            cursor: 'pointer',
                                            bgcolor: 'background.paper',
                                            border: '1px solid',
                                            borderColor: 'divider',
                                            transition: 'all 0.3s ease',
                                            animation: `fadeInUp 0.5s ease-out ${index * 0.05}s both`,
                                            '@keyframes fadeInUp': {
                                                from: {
                                                    opacity: 0,
                                                    transform: 'translateY(20px)',
                                                },
                                                to: {
                                                    opacity: 1,
                                                    transform: 'translateY(0)',
                                                },
                                            },
                                            '&:hover': {
                                                transform: 'translateY(-6px)',
                                                boxShadow: '0 16px 32px -8px rgba(0,0,0,0.15)',
                                                borderColor: 'primary.main',
                                                '& .category-icon': {
                                                    transform: 'scale(1.2)',
                                                },
                                            },
                                        }}
                                    >
                                        <Typography
                                            className="category-icon"
                                            sx={{
                                                fontSize: { xs: '2.5rem', md: '3.5rem' },
                                                mb: 2,
                                                display: 'block',
                                                transition: 'transform 0.3s ease',
                                            }}
                                        >
                                            {category.emoji}
                                        </Typography>
                                        <Typography
                                            variant="h6"
                                            sx={{
                                                fontWeight: 600,
                                                mb: 0.5,
                                                fontFamily: 'Playfair Display',
                                            }}
                                        >
                                            {category.label}
                                        </Typography>
                                    </Paper>
                                </Grid>
                            ))}
                        </Grid>
                    </Container>
                </Box>
            </Wrapper>
        </Layout>
    );
}