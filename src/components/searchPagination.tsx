import { Box, Grid2 as Grid, Pagination, PaginationItem } from "@mui/material";
import { PaginationProps, usePagination } from "react-instantsearch";

export default function SearchPagination(props: PaginationProps) {
    const {
        nbPages,
        currentRefinement,
        refine,
    } = usePagination(props);

    if (nbPages < 2) {
        return (
            <></>
        )
    }

    return (
        <Grid size={12}>
            <Box display='flex' justifyContent='center' mt={2}>
                <Pagination
                    count={nbPages}
                    page={currentRefinement + 1}
                    color='primary'
                    showFirstButton
                    showLastButton
                    renderItem={(item) => (
                        (item.page === null || item.disabled === true) ? (
                            <PaginationItem {...item} />
                        ) : (
                            <PaginationItem
                                {...item}
                                color='primary'
                                onClick={() => {
                                    if (item.page !== null) {
                                        refine(item.page - 1);
                                        window.scrollTo(0, 0);
                                    }
                                }}
                            />
                        )
                    )}
                />
            </Box>
        </Grid>
    )
};
