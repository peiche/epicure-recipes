import { Box, Link, Pagination as MuiPagination, PaginationItem } from "@mui/material";
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
                renderItem={(item) => (
                    (item.page === null || item.disabled === true) ? (
                        <PaginationItem {...item} />
                    ) : (
                        <NextLink href={`${prefix}/${item.page === 1 ? '' : `${item.page}`}`}>
                            {/* {JSON.stringify(item)} */}
                            <PaginationItem {...item} color='primary' />
                        </NextLink>
                    )
                )}
            />
        </Box>
    )
}

export default Pagination;
