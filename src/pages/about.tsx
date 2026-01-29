import { Box, Button, Container, Paper, Typography } from "@mui/material";
import { Favorite, History, Archive, Email } from '@mui/icons-material';
import SEO from "../components/layout/seo";
import Wrapper from "../components/layout/wrapper";
import Layout from "../components/ui/layout";

export default function AboutPage() {
    return (
        <Layout>
            <SEO title='About' />
            <Wrapper>
                <Box component="main" sx={{ flexGrow: 1 }}>
                    {/* Hero Section */}
                    <Box
                        sx={{
                            py: { xs: 8, md: 12 },
                            background: 'linear-gradient(135deg, #F97316 0%, #EA580C 50%, #DC2626 100%)',
                            position: 'relative',
                            overflow: 'hidden',
                        }}
                    >
                        <Box
                            sx={{
                                position: 'absolute',
                                top: -100,
                                right: -100,
                                width: 300,
                                height: 300,
                                borderRadius: '50%',
                                bgcolor: 'rgba(255,255,255,0.1)',
                            }}
                        />
                        <Container maxWidth="md" sx={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
                            <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}>
                                <Archive sx={{ fontSize: 64, color: 'white' }} />
                            </Box>
                            <Typography
                                variant="h2"
                                sx={{
                                    color: 'white',
                                    fontFamily: 'Playfair Display',
                                    fontWeight: 700,
                                    fontSize: { xs: '2.5rem', md: '3.5rem' },
                                    mb: 2,
                                }}
                            >
                                About This Project
                            </Typography>
                            <Typography
                                variant="h6"
                                sx={{
                                    color: 'rgba(255,255,255,0.9)',
                                    maxWidth: 600,
                                    mx: 'auto',
                                }}
                            >
                                Preserving thousands of beloved Epicure recipes for the community
                            </Typography>
                        </Container>
                    </Box>

                    {/* Main Content */}
                    <Container maxWidth="md" sx={{ py: { xs: 6, md: 10 } }}>
                        <Paper
                            elevation={0}
                            sx={{
                                p: { xs: 4, md: 6 },
                                borderRadius: 4,
                                bgcolor: 'background.paper',
                                border: '1px solid',
                                borderColor: 'divider',
                            }}
                        >
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 4 }}>
                                <History sx={{ color: 'primary.main', fontSize: 28 }} />
                                <Typography
                                    variant="h4"
                                    sx={{
                                        fontFamily: 'Playfair Display',
                                        fontWeight: 700,
                                        color: 'text.primary',
                                    }}
                                >
                                    Our Story
                                </Typography>
                            </Box>

                            <Typography
                                variant="body1"
                                sx={{
                                    color: 'text.secondary',
                                    lineHeight: 1.9,
                                    mb: 3,
                                    fontSize: '1.1rem',
                                }}
                            >
                                Epicure was a Canadian-based company that focused on providing meal solutions, spices, and cookware. For years, they built a loyal community of home cooks who relied on their high-quality products and, importantly, the thousands of delicious recipes showcased on their website.
                            </Typography>

                            <Typography
                                variant="body1"
                                sx={{
                                    color: 'text.secondary',
                                    lineHeight: 1.9,
                                    mb: 3,
                                    fontSize: '1.1rem',
                                }}
                            >
                                On January 24, 2025, Epicure temporarily ceased all operations and shut down their website. In the following weeks, they once again opened up their website to allow orders placed for remaining stock, but all recipe pages remained removed. This left many loyal customers without access to the recipes they had come to love and depend on for family meals.
                            </Typography>

                            <Typography
                                variant="body1"
                                sx={{
                                    color: 'text.secondary',
                                    lineHeight: 1.9,
                                    mb: 3,
                                    fontSize: '1.1rem',
                                }}
                            >
                                In the interest of making those recipes available to everyone, I have scraped the Internet Archive's records of those recipe pages and made them available for browsing here, on this website. The goal is simple: to preserve these recipes for the community that loved them.
                            </Typography>

                            <Typography
                                variant="body1"
                                sx={{
                                    color: 'text.secondary',
                                    lineHeight: 1.9,
                                    mb: 4,
                                    fontSize: '1.1rem',
                                }}
                            >
                                I run this website free of charge as a service to the community. However, hosting and maintaining a website does come with costs. If you find this resource valuable and would like to show your appreciation, kindly consider donating a few dollars to help cover operating costs.
                            </Typography>

                            <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                                <Button
                                    variant="contained"
                                    startIcon={<Favorite />}
                                    sx={{
                                        bgcolor: 'primary.main',
                                        px: 4,
                                        py: 1.5,
                                        fontWeight: 600,
                                        '&:hover': {
                                            bgcolor: 'primary.dark',
                                            boxShadow: '0 8px 24px rgba(249, 115, 22, 0.3)',
                                        },
                                    }}
                                >
                                    Support This Project
                                </Button>
                                <Button
                                    variant="outlined"
                                    startIcon={<Email />}
                                    sx={{
                                        borderColor: 'primary.main',
                                        color: 'primary.main',
                                        px: 4,
                                        py: 1.5,
                                        fontWeight: 600,
                                        '&:hover': {
                                            borderColor: 'primary.dark',
                                            bgcolor: 'rgba(249, 115, 22, 0.05)',
                                        },
                                    }}
                                >
                                    Contact Me
                                </Button>
                            </Box>
                        </Paper>

                        {/* Disclaimer */}
                        <Paper
                            elevation={0}
                            sx={{
                                p: 4,
                                mt: 4,
                                borderRadius: 3,
                                bgcolor: 'rgba(249, 115, 22, 0.05)',
                                border: '1px solid',
                                borderColor: 'rgba(249, 115, 22, 0.2)',
                            }}
                        >
                            <Typography
                                variant="subtitle1"
                                sx={{ fontWeight: 600, color: 'text.primary', mb: 1 }}
                            >
                                Disclaimer
                            </Typography>
                            <Typography variant="body2" sx={{ color: 'text.secondary', lineHeight: 1.7 }}>
                                This website is not affiliated with, endorsed by, or connected to Epicure in any way. All recipes were sourced from publicly available archives of the Internet Archive (Wayback Machine). This is a community preservation project intended solely to help home cooks access recipes they previously enjoyed.
                            </Typography>
                        </Paper>
                    </Container>
                </Box>
            </Wrapper>
        </Layout>
    )
}