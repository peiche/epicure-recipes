import { Box, Pagination as MuiPagination, PaginationItem } from "@mui/material";
import NextLink from 'next/link';

interface PaginationProps {
    prefix: string;
    currentPage: number;
    totalPages: number;
}

const Pagination = ({ prefix, currentPage, totalPages }: PaginationProps) => {
    return (
        <Box display='flex' justifyContent='center' mt={2}>
            <MuiPagination
                count={totalPages}
                page={currentPage}
                showFirstButton
                showLastButton
                renderItem={(item) => (
                    (item.page === null || item.disabled === true) ? (
                        <PaginationItem {...item} />
                    ) : (
                        <PaginationItem
                            {...item}
                            color='primary'
                            component={NextLink}
                            href={`${prefix}/${item.page === 1 ? '' : `${item.page}`}`}
                        />
                    )
                )}
            />
        </Box>
    )
}

export default Pagination;
