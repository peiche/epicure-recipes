import { Box, Container, Grid, Link, Paper, Typography } from "@mui/material";
import NextLink from "next/link";
import { getSearchUrlForTags } from "../../utils/utils";
import { HOME_CATEGORY_GROUPS } from "../../lib/recipe-utils";

export default function CategorySection() {
    return (
        <Box sx={{ py: { xs: 6, md: 10 }, bgcolor: 'background.default' }}>
            <Container maxWidth="xl">
                {/* Section Header */}
                <Box sx={{ textAlign: 'center', mb: 6 }}>
                    <Typography
                        variant="h2"
                        sx={{
                            fontSize: { xs: '2rem', md: '2.75rem' },
                            fontWeight: 700,
                            mb: 1,
                        }}
                    >
                        Browse by Category
                    </Typography>
                    <Typography variant="body1" color="text.secondary" sx={{ mx: 'auto' }}>
                        Explore our collection of recipes organized by your favorite cuisine types
                    </Typography>
                </Box>

                {/* Categories Grid */}
                <Grid container spacing={2}>
                    {HOME_CATEGORY_GROUPS.map((category, index) => (
                        <Grid size={{ xs: 6, sm: 4, md: 3, lg: 1.5 }} key={index}>
                            <Paper
                                elevation={0}
                                component={NextLink}
                                href={getSearchUrlForTags(category.tags)}
                                sx={{
                                    display: 'block',
                                    p: 3,
                                    textAlign: 'center',
                                    borderRadius: 3,
                                    cursor: 'pointer',
                                    bgcolor: 'card',
                                    border: '1px solid',
                                    borderColor: 'divider',
                                    transition: 'all 0.3s ease',
                                    textDecoration: 'none',
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
                                        transform: 'translateY(-4px)',
                                        boxShadow: '0 12px 24px -8px rgba(0,0,0,0.15)',
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
                                        fontSize: '2.5rem',
                                        mb: 1.5,
                                        display: 'block',
                                        transition: 'transform 0.3s ease',
                                    }}
                                >
                                    {category.emoji}
                                </Typography>
                                <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 0.5 }}>
                                    {category.label}
                                </Typography>
                            </Paper>
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </Box>
    );
}
