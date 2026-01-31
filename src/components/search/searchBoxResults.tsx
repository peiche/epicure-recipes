import { faAlgolia } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { DynamicWidgets, useHits, useInstantSearch, useSearchBox } from "react-instantsearch";
import SearchFilterPanel from "./searchFilterPanel";
import SearchRefinementList from "./searchRefinementList";
import SearchPagination from "./searchPagination";
import SearchRefinements from "./searchRefinements";
import React, { useState } from 'react';
import { Box, Typography, Grid, Paper, TextField, InputAdornment, IconButton, Drawer, Button, Divider, useMediaQuery, Link, CircularProgress } from '@mui/material';
import { Search, FilterList, Close, Restaurant } from '@mui/icons-material';
import theme from "../../themes/theme";
import RecipeCard from "../recipe/recipeCard";
import Recipe from "../../interfaces/Recipe";

export default function SearchBoxResults() {
    const searchParams = useSearchParams();
    const search = searchParams.get('s');
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));
    const [filterDrawerOpen, setFilterDrawerOpen] = useState(false);
    const { items, results } = useHits<Recipe>();
    const { status } = useInstantSearch();

    const {
        query,
        refine,
        clear,
    } = useSearchBox();

    const isInitialLoad = !results || !results.queryID;
    const isRealEmpty = status === 'idle' && items.length === 0 && !isInitialLoad;

    useEffect(() => {
        search && refine(search);
    }, [search]);

    const handleClearSearch = () => {
        clear();
        document.getElementById('search-input')?.focus();
    };

    const filterSidebar = (
        <DynamicWidgets>
            <SearchFilterPanel label='Tags'>
                <SearchRefinementList
                    attribute='tags.name'
                    limit={5}
                    showMore={true}
                    sortBy={['isRefined', 'count:desc', 'name:asc']}
                />
            </SearchFilterPanel>
            <SearchFilterPanel label='Products'>
                <SearchRefinementList
                    attribute='products.name'
                    limit={5}
                    showMore={true}
                    sortBy={['isRefined', 'count:desc', 'name:asc']}
                />
            </SearchFilterPanel>
        </DynamicWidgets>
    );

    return (
        <>
            {/* Search Header */}
            <Box sx={{ mb: 4, mt: 2 }}>
                <Typography
                    variant="h3"
                    sx={{
                        fontFamily: '"Playfair Display", serif',
                        fontWeight: 700,
                        mb: 2,
                    }}
                >
                    {query ? `Results for "${query}"` : 'Browse Recipes'}
                </Typography>

                <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', alignItems: 'center' }}>
                    <TextField
                        value={query}
                        onChange={(event) => refine(event.target.value)}
                        autoComplete="off"
                        autoFocus
                        placeholder="Search recipes, tags, products..."
                        sx={{
                            flex: 1,
                            minWidth: 280,
                            '& .MuiOutlinedInput-root': {
                                borderRadius: 3,
                                bgcolor: 'card',
                            },
                        }}
                        slotProps={{
                            htmlInput: { 'aria-label': 'search' },
                            input: {
                                startAdornment: (
                                    <InputAdornment position='start'>
                                        <Search sx={{ color: 'text.secondary' }} />
                                    </InputAdornment>
                                ),
                                endAdornment: query && (
                                    <InputAdornment position='end'>
                                        <IconButton size="small" onClick={handleClearSearch}>
                                            <Close fontSize="small" />
                                        </IconButton>
                                    </InputAdornment>
                                )
                            }
                        }}
                    />

                    {isMobile && (
                        <Button
                            variant="outlined"
                            startIcon={<FilterList />}
                            onClick={() => setFilterDrawerOpen(true)}
                            sx={{ borderRadius: 2 }}
                        >
                            Filters
                        </Button>
                    )}
                </Box>
                <Box textAlign='right' mt={1} mb={2}>
                    <Link
                        variant='body2'
                        href='https://www.algolia.com'
                        target='_blank'
                        underline='hover'
                        color='text.secondary'
                    >
                        Search powered by{` `}
                        <FontAwesomeIcon icon={faAlgolia} />{` `}
                    </Link>
                </Box>
            </Box>

            {/* Main Content */}
            <Grid container spacing={4} sx={{ mb: 4 }}>
                {/* Sidebar Filters (Desktop) */}
                {items.length > 0 && (
                    <>
                        <Grid
                            size={{ md: 3 }}
                            sx={{ display: { xs: 'none', md: 'block' } }}
                        >
                            <Paper
                                elevation={0}
                                sx={{
                                    p: 3,
                                    borderRadius: 3,
                                    bgcolor: 'card',
                                    border: '1px solid',
                                    borderColor: 'divider',
                                    position: 'sticky',
                                    top: 100,
                                }}
                            >
                                <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
                                    Filters
                                </Typography>
                                {filterSidebar}
                            </Paper>
                        </Grid>
                    </>
                )}

                {items.length > 0 ? (
                    <>
                        {/* Recipe Grid */}
                        <Grid size={{ xs: 12, md: isMobile ? 12 : 9 }}>
                            {/* Results Count */}
                            <Box sx={{ mb: 3 }}>
                                <Typography variant="body1" color="text.secondary">
                                    <strong>{results?.nbHits.toLocaleString()}</strong> recipes found
                                </Typography>
                                <Box sx={{ display: 'flex', gap: 1, alignItems: 'center', mt: 2, flexWrap: 'wrap' }}>
                                    <SearchRefinements includeAllRefinements={true} />
                                </Box>
                            </Box>

                            <Grid container spacing={3}>
                                <Grid container spacing={2}>
                                    {items
                                        .map((item) => (
                                            <React.Fragment key={item.objectID}>
                                                <Grid
                                                    size={{
                                                        xs: 12,
                                                        sm: 6,
                                                        lg: 4,
                                                    }}
                                                >
                                                    <RecipeCard recipe={item} />
                                                </Grid>
                                            </React.Fragment>
                                        ))}
                                </Grid>

                                <SearchPagination />
                            </Grid>

                        </Grid>
                    </>
                ) : (
                    <Grid size={{ xs: 12 }}>
                        <Paper
                            elevation={0}
                            sx={{
                                p: 6,
                                textAlign: 'center',
                                borderRadius: 3,
                                bgcolor: 'card',
                                border: '1px solid',
                                borderColor: 'divider',
                            }}
                        >
                            {isRealEmpty ? (
                                <>
                                    <Restaurant sx={{ fontSize: 64, color: 'text.disabled', mb: 2 }} />
                                    <Typography variant="h5" sx={{ fontWeight: 600, mb: 1 }}>
                                        No recipes found!
                                    </Typography>
                                    <Typography color="text.secondary" sx={{ mb: 3 }}>
                                        Try adjusting your filters or search query.
                                    </Typography>
                                    <Button
                                        variant="contained"
                                        onClick={handleClearSearch}
                                    >
                                        Clear All Filters
                                    </Button>
                                </>
                            ) : (
                                <>
                                    <CircularProgress />
                                    <Typography color="text.secondary" sx={{ mt: 2 }}>
                                        Loading recipes...
                                    </Typography>
                                </>
                            )}

                        </Paper>
                    </Grid>
                )}
            </Grid>

            {/* Mobile Filter Drawer */}
            <Drawer
                anchor="right"
                open={filterDrawerOpen}
                onClose={() => setFilterDrawerOpen(false)}
                slotProps={{
                    paper: {
                        sx: {
                            width: '100%',
                            maxWidth: 360,
                            bgColor: 'background',
                            borderRadius: '16px 0 0 16px',
                        },
                    }
                }}
            >
                <Box sx={{ p: 3 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                        <Typography variant="h6" sx={{ fontWeight: 700 }}>
                            Filters
                        </Typography>
                        <IconButton onClick={() => setFilterDrawerOpen(false)}>
                            <Close />
                        </IconButton>
                    </Box>
                    <Box sx={{ display: 'flex', gap: 1, alignItems: 'center', mb: 2 }}>
                        <SearchRefinements includeAllRefinements={false} />
                    </Box>
                    <Divider sx={{ mb: 3 }} />
                    {filterSidebar}
                </Box>
            </Drawer>
        </>
    )
};
