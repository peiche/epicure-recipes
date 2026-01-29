import { Box, Button, Chip, Container, InputBase, Paper, Typography } from "@mui/material";
import { Search, TrendingUp } from '@mui/icons-material';
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRouter } from "next/router";

export default function HeroSection() {
    const [searchQuery, setSearchQuery] = useState('');
    const router = useRouter();

    // const handleSearch = () => {
    //     router.push(`/search/${searchQuery ? `?s=${encodeURIComponent(searchQuery)}` : ''}`);
    // };

    return (
        <Box
            sx={{
                position: 'relative',
                minHeight: { xs: '70vh', md: '85vh', lg: 'calc(100vh - 65px)' },
                display: 'flex',
                alignItems: 'center',
                overflow: 'hidden',
            }}
        >
            {/* Background Image */}
            <Box
                sx={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundImage: `url(/images/hero-food.jpg)`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    '&::after': {
                        content: '""',
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        background: 'linear-gradient(180deg, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0.6) 100%)',
                    },
                }}
            />

            {/* Content */}
            <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
                <Box
                    sx={{
                        maxWidth: 700,
                        mx: 'auto',
                        textAlign: 'center',
                        color: 'white',
                        animation: 'fadeInUp 0.8s ease-out',
                        '@keyframes fadeInUp': {
                            from: {
                                opacity: 0,
                                transform: 'translateY(30px)',
                            },
                            to: {
                                opacity: 1,
                                transform: 'translateY(0)',
                            },
                        },
                    }}
                >
                    {/* Tagline */}
                    {/* <Chip
                        label="📚 Over 3,000 recipes"
                        sx={{
                            mb: 3,
                            bgcolor: 'rgba(255,255,255,0.2)',
                            backdropFilter: 'blur(10px)',
                            color: 'white',
                            fontWeight: 500,
                            fontSize: '0.9rem',
                            py: 2.5,
                            px: 1,
                        }}
                    /> */}

                    {/* Title */}
                    <Typography
                        variant="h1"
                        sx={{
                            fontSize: { xs: '2.5rem', sm: '3.5rem', md: '4.5rem' },
                            fontWeight: 700,
                            mb: 2,
                            lineHeight: 1.1,
                            textShadow: '0 4px 30px rgba(0,0,0,0.3)',
                        }}
                    >
                        Epicure Recipes
                        <Box
                            component="span"
                            sx={{
                                display: 'block',
                                color: '#FFB300',
                            }}
                        >
                            Preserved Forever
                        </Box>
                    </Typography>

                    {/* Subtitle */}
                    <Typography
                        variant="h5"
                        sx={{
                            mb: 4,
                            opacity: 0.9,
                            fontWeight: 400,
                            maxWidth: 550,
                            mx: 'auto',
                            lineHeight: 1.6,
                        }}
                    >
                        Browse thousands of beloved Epicure recipes, recovered and preserved for the community after the company closed in 2025.
                    </Typography>

                    {/* Search Bar */}
                    <Paper
                        elevation={0}
                        component='form'
                        action='/search'
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            maxWidth: 550,
                            mx: 'auto',
                            p: 0.5,
                            pl: 3,
                            borderRadius: '50px',
                            bgcolor: 'rgba(255,255,255,0.95)',
                            backdropFilter: 'blur(10px)',
                            boxShadow: '0 8px 32px rgba(0,0,0,0.2)',
                        }}
                    >
                        <Search sx={{ color: 'text.secondary', mr: 1 }} />
                        <InputBase
                            placeholder="Search for recipes..."
                            name='recipe[query]'
                            value={searchQuery}
                            required
                            autoComplete='off'
                            onChange={(e) => setSearchQuery(e.target.value)}
                            // onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                            sx={{
                                flex: 1,
                                fontSize: '1rem',
                                py: 1,
                            }}
                        />
                        <Button
                            variant="contained"
                            size="large"
                            // onClick={handleSearch}
                            type='submit'
                            sx={{
                                borderRadius: '50px',
                                px: 4,
                                py: 1.5,
                                fontSize: '1rem',
                            }}
                        >
                            Search
                        </Button>
                    </Paper>

                    {/* Trending Searches */}
                    <Box sx={{ mt: 3, display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 1 }}>
                        {/* <Box sx={{ display: 'flex', alignItems: 'center', mr: 1 }}>
                            <TrendingUp sx={{ fontSize: 18, mr: 0.5, opacity: 0.8 }} />
                            <Typography variant="body2" sx={{ opacity: 0.8 }}>
                                Trending:
                            </Typography>
                        </Box> */}
                        {/* {trendingSearches.map((term) => (
                            <Chip
                                key={term}
                                label={term}
                                size="small"
                                clickable
                                onClick={() => handleTrendingClick(term)}
                                sx={{
                                    bgcolor: 'rgba(255,255,255,0.2)',
                                    color: 'white',
                                    borderColor: 'rgba(255,255,255,0.3)',
                                    '&:hover': {
                                        bgcolor: 'rgba(255,255,255,0.3)',
                                    },
                                }}
                                variant="outlined"
                            />
                        ))} */}
                    </Box>
                </Box>
            </Container>

            {/* Decorative Elements */}
            {/* <Box
                sx={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    height: 100,
                    background: 'linear-gradient(to top, hsl(30, 40%, 98%) 0%, transparent 100%)',
                }}
            /> */}
        </Box>
    )
}
