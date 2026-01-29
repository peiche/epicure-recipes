import { Favorite, History, Archive } from '@mui/icons-material';
import { Box, Button, Container, Paper, Typography } from "@mui/material";
import NextLink from "next/link";

export default function AboutSection() {
    return (
        <Box
            sx={{
                py: { xs: 6, md: 10 },
                bgcolor: 'rgba(249, 115, 22, 0.03)',
            }}
        >
            <Container maxWidth="md">
                <Paper
                    elevation={0}
                    sx={{
                        p: { xs: 4, md: 6 },
                        borderRadius: 4,
                        bgcolor: 'background.paper',
                        border: '1px solid',
                        borderColor: 'divider',
                        position: 'relative',
                        overflow: 'hidden',
                    }}
                >
                    {/* Decorative icon */}
                    <Box
                        sx={{
                            position: 'absolute',
                            top: -20,
                            right: -20,
                            opacity: 0.05,
                            transform: 'rotate(15deg)',
                        }}
                    >
                        <Archive sx={{ fontSize: 200 }} />
                    </Box>

                    <Box sx={{ position: 'relative', zIndex: 1 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 3 }}>
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
                                lineHeight: 1.8,
                                mb: 3,
                            }}
                        >
                            This website preserves thousands of beloved Epicure recipes that were lost when the company shut down in January 2025. All recipes have been recovered from the Internet Archive and made freely available here for the community.
                        </Typography>

                        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                            <Button
                                variant="contained"
                                component='a'
                                href='https://www.paypal.com/donate/?business=SY2SCFJENKDEJ&no_recurring=0&item_name=I%27m+providing+this+recipe+website+for+free.+If+you%27d+like+to+show+your+appreciation%2C+you+can+donate+the+amount+of+your+choice.&currency_code=USD'
                                target='_blank'
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
                                component={NextLink}
                                href="/about"
                                variant="outlined"
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
                                Learn More
                            </Button>
                        </Box>
                    </Box>
                </Paper>
            </Container>
        </Box>
    )
}