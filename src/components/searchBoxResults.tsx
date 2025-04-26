import { faAlgolia } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Close, Search } from "@mui/icons-material";
import { Box, Grid, IconButton, InputAdornment, Link, TextField, Typography } from "@mui/material";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { DynamicWidgets, useSearchBox } from "react-instantsearch";
import SearchFilterPanel from "./searchFilterPanel";
import SearchRefinementList from "./searchRefinementList";
import SearchResultsGrid from "./searchResultsGrid";
import SearchPagination from "./searchPagination";
import SearchRefinements from "./searchRefinements";
import SearchDrawer from "./searchDrawer";
import RecipeListHeader from "./recipeListHeader";
import { selectView } from "../redux/slices/viewSlice";
import { useAppSelector } from "../redux/hooks";

export default function SearchBoxResults() {
    const searchParams = useSearchParams();
    const search = searchParams.get('s');
    const view = useAppSelector(selectView);

    const {
        query,
        refine,
        clear,
    } = useSearchBox();

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
        <>
            <TextField
                id='search-input'
                placeholder='Search...'
                value={query}
                onChange={(event) => refine(event.target.value)}
                autoComplete='off'
                autoFocus
                fullWidth
                slotProps={{
                    htmlInput: { 'aria-label': 'search' },
                    input: {
                        startAdornment: (
                            <InputAdornment position='start'>
                                <Search />
                            </InputAdornment>
                        ),
                        endAdornment: (
                            <InputAdornment position='end'>
                                {query && (
                                    <IconButton onClick={handleClearSearch}>
                                        <Close />
                                    </IconButton>
                                )}
                            </InputAdornment>
                        )
                    }
                }}
            />
            <Box textAlign='right' mt={1} mb={2}>
                <Link
                    variant='body2'
                    href='https://www.algolia.com'
                    target='_blank'
                    underline='hover'
                    color='inherit'
                >
                    Search powered by{` `}
                    <FontAwesomeIcon icon={faAlgolia} />{` `}
                </Link>
            </Box>

            {query ? (
                <>
                    <Grid container>
                        <Grid size={12} sx={{
                            display: { xs: 'none', md: 'block' },
                        }}>
                            <Box sx={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                mb: 1,
                            }}>
                                <SearchRefinements />

                                <RecipeListHeader
                                    title={null}
                                    view={view}
                                />
                            </Box>
                        </Grid>
                        <Grid size={12} mb={2} sx={{
                            display: { xs: 'block', md: 'none' },
                        }}>
                            <Box sx={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                mb: 1,
                            }}>
                                <SearchDrawer>
                                    <SearchRefinements />
                                    {filterSidebar}
                                </SearchDrawer>

                                <RecipeListHeader
                                    title={null}
                                    view={view}
                                />
                            </Box>
                        </Grid>
                        <Grid size={{
                            xs: 12,
                            md: 3,
                        }} sx={{
                            display: { xs: 'none', md: 'block' },
                        }}>
                            {filterSidebar}
                        </Grid>

                        <Grid size={{
                            xs: 12,
                            md: 9,
                        }}>
                            <SearchResultsGrid />
                        </Grid>

                        <SearchPagination />
                    </Grid>
                </>
            ) : (
                <Box p={5}>
                    <Typography textAlign='center' fontStyle='italic'>Type something to start searching</Typography>
                </Box>
            )}
        </>
    )
};
