import { faAlgolia } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { Close, Search } from "@mui/icons-material";
// import { Box, Grid, IconButton, InputAdornment, Link, TextField, Typography } from "@mui/material";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { DynamicWidgets, useHits, useInstantSearch, useSearchBox } from "react-instantsearch";
import SearchFilterPanel from "./searchFilterPanel";
import SearchRefinementList from "./searchRefinementList";
import SearchResultsGrid from "./searchResultsGrid";
import SearchPagination from "./searchPagination";
import SearchRefinements from "./searchRefinements";
import SearchDrawer from "./searchDrawer";
// import RecipeListHeader from "./recipeListHeader";
import { selectView } from "../../redux/slices/viewSlice";
import { useAppSelector } from "../../redux/hooks";
import RecipeListHeader from "../recipe/recipeListHeader";

import React, { useState, useMemo } from 'react';
import {
    Box,
    Container,
    Typography,
    Grid,
    Paper,
    Chip,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Slider,
    Checkbox,
    FormControlLabel,
    FormGroup,
    TextField,
    InputAdornment,
    IconButton,
    Drawer,
    Button,
    Divider,
    useMediaQuery,
    useTheme,
    Collapse,
    Link,
    CircularProgress,
} from '@mui/material';
import {
    Search,
    FilterList,
    Close,
    ExpandMore,
    ExpandLess,
    AccessTime,
    LocalFireDepartment,
    Restaurant,
} from '@mui/icons-material';
import theme from "../../themes/theme";
import RecipeCard from "../recipe/recipeCard";
import { Recipe } from "../../interfaces/Recipe";
import SearchClearRefinements from "./searchClearRefinements";

export default function SearchBoxResults() {
    const searchParams = useSearchParams();
    const search = searchParams.get('s');
    // const view = useAppSelector(selectView);
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
                <SearchRefinementList attribute='tags.name' limit={5} showMore={true} />
            </SearchFilterPanel>
            <SearchFilterPanel label='Products'>
                <SearchRefinementList attribute='products.name' limit={5} showMore={true} />
            </SearchFilterPanel>
        </DynamicWidgets>
    );

    return (
        // <>
        //     <TextField
        //         id='search-input'
        //         placeholder='Search...'
        //         value={query}
        //         onChange={(event) => refine(event.target.value)}
        //         autoComplete='off'
        //         autoFocus
        //         fullWidth
        //         slotProps={{
        //             htmlInput: { 'aria-label': 'search' },
        //             input: {
        //                 startAdornment: (
        //                     <InputAdornment position='start'>
        //                         <Search />
        //                     </InputAdornment>
        //                 ),
        //                 endAdornment: (
        //                     <InputAdornment position='end'>
        //                         {query && (
        //                             <IconButton onClick={handleClearSearch}>
        //                                 <Close />
        //                             </IconButton>
        //                         )}
        //                     </InputAdornment>
        //                 )
        //             }
        //         }}
        //     />
        //     <Box textAlign='right' mt={1} mb={2}>
        //         <Link
        //             variant='body2'
        //             href='https://www.algolia.com'
        //             target='_blank'
        //             underline='hover'
        //             color='inherit'
        //         >
        //             Search powered by{` `}
        //             <FontAwesomeIcon icon={faAlgolia} />{` `}
        //         </Link>
        //     </Box>

        //     {query ? (
        //         <>
        //             <Grid container>
        //                 <Grid size={12} sx={{
        //                     display: { xs: 'none', md: 'block' },
        //                 }}>
        //                     <Box sx={{
        //                         display: 'flex',
        //                         justifyContent: 'space-between',
        //                         alignItems: 'center',
        //                         mb: 1,
        //                     }}>
        //                         <SearchRefinements />

        //                         <RecipeListHeader
        //                             title={null}
        //                             view={view}
        //                         />
        //                     </Box>
        //                 </Grid>
        //                 <Grid size={12} mb={2} sx={{
        //                     display: { xs: 'block', md: 'none' },
        //                 }}>
        //                     <Box sx={{
        //                         display: 'flex',
        //                         justifyContent: 'space-between',
        //                         alignItems: 'center',
        //                         mb: 1,
        //                     }}>
        //                         <SearchDrawer>
        //                             <SearchRefinements />
        //                             {filterSidebar}
        //                         </SearchDrawer>

        //                         <RecipeListHeader
        //                             title={null}
        //                             view={view}
        //                         />
        //                     </Box>
        //                 </Grid>
        //                 <Grid size={{
        //                     xs: 12,
        //                     sm: 6,
        //                     md: 3,
        //                     // lg: 4,
        //                 }} sx={{
        //                     display: { xs: 'none', md: 'block' },
        //                 }}>
        //                     {filterSidebar}
        //                 </Grid>

        //                 <Grid size={{
        //                     xs: 12,
        //                     md: 9,
        //                 }}>
        //                     <SearchResultsGrid />
        //                 </Grid>

        //                 <SearchPagination />
        //             </Grid>
        //         </>
        //     ) : (
        //         <Box p={5}>
        //             <Typography textAlign='center' fontStyle='italic'>Type something to start searching</Typography>
        //         </Box>
        //     )}
        // </>
        <>
            {/* Search Header */}
            <Box sx={{ mb: 4, mt: 2 }}>
                <Typography
                    variant="h3"
                    sx={{
                        fontFamily: '"Playfair Display", serif',
                        fontWeight: 700,
                        mb: 2,
                        // background: 'linear-gradient(135deg, hsl(var(--primary)), hsl(var(--primary-glow)))',
                        // WebkitBackgroundClip: 'text',
                        // WebkitTextFillColor: 'transparent',
                    }}
                >
                    {query ? `Results for "${query}"` : 'Browse Recipes'}
                </Typography>

                <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', alignItems: 'center' }}>
                    <TextField
                        // value={searchQuery}
                        value={query}
                        // onChange={(e) => setSearchQuery(e.target.value)}
                        onChange={(event) => refine(event.target.value)}
                        autoComplete="off"
                        // autoSave="off"
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
                        // InputProps={{
                        //     startAdornment: (
                        //         <InputAdornment position="start">
                        //             <Search sx={{ color: 'text.secondary' }} />
                        //         </InputAdornment>
                        //     ),
                        //     endAdornment: query && (
                        //         <InputAdornment position="end">
                        //             <IconButton size="small" onClick={handleClearSearch}>
                        //                 <Close fontSize="small" />
                        //             </IconButton>
                        //         </InputAdornment>
                        //     ),
                        // }}
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
                            sx={{
                                borderRadius: 2,
                                // borderColor: activeFilterCount > 0 ? 'primary.main' : 'divider',
                                // color: activeFilterCount > 0 ? 'primary.main' : 'text.primary',
                            }}
                        >
                            {/* Filters {activeFilterCount > 0 && `(${activeFilterCount})`} */}
                            Filters
                        </Button>
                    )}

                    {/* <FormControl size="small" sx={{ minWidth: 150 }}>
                        <InputLabel>Sort by</InputLabel>
                        <Select
                            value={sortBy}
                            label="Sort by"
                            onChange={(e) => setSortBy(e.target.value)}
                            sx={{ borderRadius: 2, bgcolor: 'card' }}
                        >
                            <MenuItem value="rating">Top Rated</MenuItem>
                            <MenuItem value="newest">Newest</MenuItem>
                            <MenuItem value="quickest">Quickest</MenuItem>
                            <MenuItem value="calories">Lowest Calories</MenuItem>
                        </Select>
                    </FormControl> */}
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

            {/* Active Filters Display */}
            {/* {activeFilterCount > 0 && (
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 3 }}>
                    {selectedCuisine !== 'All' && (
                        <Chip
                            label={`Cuisine: ${selectedCuisine}`}
                            onDelete={() => setSelectedCuisine('All')}
                            size="small"
                            sx={{ bgcolor: 'primary.light', color: 'primary.contrastText' }}
                        />
                    )}
                    {selectedDifficulty !== 'All' && (
                        <Chip
                            label={`Difficulty: ${selectedDifficulty}`}
                            onDelete={() => setSelectedDifficulty('All')}
                            size="small"
                            sx={{ bgcolor: 'secondary.light', color: 'secondary.contrastText' }}
                        />
                    )}
                    {selectedDietary.map(diet => (
                        <Chip
                            key={diet}
                            label={diet}
                            onDelete={() => handleDietaryChange(diet)}
                            size="small"
                            sx={{ bgcolor: 'muted' }}
                        />
                    ))}
                    {selectedCategories.map(cat => (
                        <Chip
                            key={cat}
                            label={cat}
                            onDelete={() => handleCategoryChange(cat)}
                            size="small"
                            sx={{ bgcolor: 'muted' }}
                        />
                    ))}
                </Box>
            )} */}

            {/* Main Content */}
            <Grid container spacing={4} sx={{ mb: 4 }}>
                {/* Sidebar Filters (Desktop) */}
                {items.length > 0 && (
                    <>
                        {/* {!isMobile && ( */}
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
                                {/* {filterContent} */}
                                {filterSidebar}
                            </Paper>
                        </Grid>
                        {/* )} */}
                    </>
                )}

                {items.length > 0 ? (
                    <>
                        {/* Recipe Grid */}
                        <Grid size={{ xs: 12, md: isMobile ? 12 : 9 }}>
                            {/* Results Count */}

                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
                                <Typography variant="body1" color="text.secondary">
                                    <strong>{results?.nbHits.toLocaleString()}</strong> recipes found
                                </Typography>
                                <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                                    <SearchRefinements includeAllRefinements={true} />
                                </Box>
                                {/* <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                            <Chip
                                icon={<AccessTime sx={{ fontSize: 16 }} />}
                                label="Quick"
                                size="small"
                                variant="outlined"
                                onClick={() => setCookTimeRange([0, 30])}
                                sx={{ cursor: 'pointer' }}
                            />
                            <Chip
                                icon={<LocalFireDepartment sx={{ fontSize: 16 }} />}
                                label="Low Cal"
                                size="small"
                                variant="outlined"
                                onClick={() => setCalorieRange([0, 400])}
                                sx={{ cursor: 'pointer' }}
                            />
                        </Box> */}
                            </Box>



                            <Grid container spacing={3}>
                                {/* <SearchResultsGrid /> */}
                                {/* {filteredRecipes.map((recipe, index) => (
                                <Grid
                                    size={{ xs: 12, sm: 6, lg: 4 }}
                                    key={recipe.id}
                                    sx={{
                                        animation: `fadeInUp 0.4s ease-out ${index * 0.05}s both`,
                                        '@keyframes fadeInUp': {
                                            from: { opacity: 0, transform: 'translateY(20px)' },
                                            to: { opacity: 1, transform: 'translateY(0)' },
                                        },
                                    }}
                                >
                                    <RecipeCard recipe={recipe} onFavoriteToggle={handleFavoriteToggle} />
                                </Grid>
                            ))} */}
                                <Grid container spacing={2}>
                                    {items
                                        .map((item) => (
                                            <React.Fragment key={item.objectID}>
                                                {/* {view === 'grid' && ( */}
                                                <Grid
                                                    size={{
                                                        xs: 12,
                                                        sm: 6,
                                                        lg: 4,
                                                    }}
                                                >
                                                    <RecipeCard recipe={item} />
                                                </Grid>
                                                {/* )} */}
                                                {/* {view === 'list' && (
                                                        <Grid size={12}>
                                                            <RecipeListItem recipe={item} />
                                                        </Grid>
                                                    )} */}
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
                                        sx={{
                                            // background: 'linear-gradient(135deg, hsl(var(--primary)), hsl(var(--primary-glow)))',
                                        }}
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
                // PaperProps={{
                //     sx: {
                //         width: '100%',
                //         maxWidth: 360,
                //         bgcolor: 'background',
                //     },
                // }}
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
                sx={{
                    // borderRadius: 0,
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
                    {/* <Button
                        variant="text"
                        size="small"
                        onClick={}
                        sx={{ mb: 2, color: 'error.main' }}
                    >
                        Clear all filters
                    </Button> */}
                    <Box sx={{ display: 'flex', gap: 1, alignItems: 'center', mb: 2 }}>
                        {/* <SearchClearRefinements /> */}
                        <SearchRefinements includeAllRefinements={false} />
                    </Box>
                    <Divider sx={{ mb: 3 }} />
                    {filterSidebar}
                </Box>
            </Drawer>
        </>
    )
};
