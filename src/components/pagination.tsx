import { Button } from '@progress/kendo-react-buttons';
import Link from 'next/link';
import { calculateVisiblePages } from '../utils/utils';

interface PaginationProps {
    prefix: string;
    currentPage: number;
    totalPages: number;
}

export default function Pagination({ prefix, currentPage, totalPages }: PaginationProps) {
    const visiblePages = calculateVisiblePages(currentPage, totalPages);

    const renderPageNumbers = () => {
        const items = [];

        if (visiblePages[0] > 1) {
            items.push(
                <Link key={1} href={`${prefix}/`}>
                    <Button
                        type='button'
                        fillMode='outline'
                        rounded='full'
                        themeColor='base'
                    >1</Button>
                </Link>,
                <span key="ellipsis-start">...</span>
            );
        }

        visiblePages.forEach((page) => {
            items.push(
                <Link key={page} href={`${prefix}/${page}`}>
                    <Button
                        type='button'
                        fillMode={page === currentPage ? 'solid' : 'outline'}
                        rounded='full'
                        themeColor={page === currentPage ? 'primary' : 'base'}
                    >{page}</Button>
                </Link>
            );
        });

        if (visiblePages[visiblePages.length - 1] < totalPages) {
            items.push(
                <span key="ellipsis-end">...</span>,
                <Link key={totalPages} href={`${prefix}/${totalPages}/`}>
                    <Button
                        type='button'
                        fillMode='outline'
                        rounded='full'
                        themeColor='base'
                    >{totalPages}</Button>
                </Link>
            );
        }

        return items;
    };

    return (
        <div className='k-d-flex k-align-items-center k-justify-content-center k-gap-3'>
            {renderPageNumbers()}
        </div>
    )
}
