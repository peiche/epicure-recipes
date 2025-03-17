import { Button } from "@progress/kendo-react-buttons";
import { PaginationProps, usePagination } from "react-instantsearch";
import { calculateVisiblePages } from "../utils/utils";
import React from "react";

export default function SearchPagination(props: PaginationProps) {
    const {
        nbPages: totalPages,
        currentRefinement,
        refine,
    } = usePagination(props);

    if (totalPages < 2) {
        return (
            <></>
        )
    }

    const currentPage = currentRefinement + 1;
    const visiblePages = calculateVisiblePages(currentPage, totalPages);

    const renderPageNumbers = () => {
        const items = [];

        if (visiblePages[0] > 1) {
            items.push(
                <Button
                    key={1}
                    type='button'
                    fillMode='outline'
                    rounded='full'
                    themeColor='base'
                    onClick={() => {
                        refine(0);
                        window.scrollTo(0, 0);
                    }}
                >1</Button>,
                <span key="ellipsis-start">...</span>
            );
        }

        visiblePages.forEach((page) => {
            items.push(
                <Button
                    key={page}
                    type='button'
                    fillMode={page === currentPage ? 'solid' : 'outline'}
                    rounded='full'
                    themeColor={page === currentPage ? 'primary' : 'base'}
                    onClick={() => {
                        refine(page - 1);
                        window.scrollTo(0, 0);
                    }}
                >{page}</Button>
            );
        });

        if (visiblePages[visiblePages.length - 1] < totalPages) {
            items.push(
                <React.Fragment key={totalPages}>
                    <span key="ellipsis-end">...</span>
                    <Button
                        type='button'
                        fillMode='outline'
                        rounded='full'
                        themeColor='base'
                        onClick={() => {
                            refine(totalPages - 1);
                            window.scrollTo(0, 0);
                        }}
                    >{totalPages}</Button>
                </React.Fragment>
            );
        }

        return items;
    };

    return (
        <div className='k-d-flex k-align-items-center k-justify-content-center k-gap-3'>
            {renderPageNumbers()}
        </div>
    )
};
