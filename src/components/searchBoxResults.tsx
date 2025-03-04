import { faAlgolia } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Close, Search } from "@mui/icons-material";
import { Box, Grid2 as Grid, IconButton, InputAdornment, Link, TextField, Typography } from "@mui/material";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { DynamicWidgets, useSearchBox } from "react-instantsearch";
import SearchFilterPanel from "./searchFilterPanel";
import SearchRefinementList from "./searchRefinementList";
import SearchResultsGrid from "./searchResultsGrid";
import SearchPagination from "./searchPagination";
import SearchRefinements from "./searchRefinements";
import SearchDrawer from "./searchDrawer";

export default function SearchBoxResults() {
    const searchParams = useSearchParams();
    const search = searchParams.get('s');

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
                            <SearchRefinements />
                        </Grid>
                        <Grid size={12} mb={2} sx={{
                            display: { xs: 'block', md: 'none' },
                        }}>
                            <SearchDrawer>
                                <SearchRefinements />
                                {filterSidebar}
                            </SearchDrawer>
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
