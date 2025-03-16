export const isElementVisibleInScrollableDiv = (element: Element, scrollableDiv: HTMLElement) => {
    const elementRect = element.getBoundingClientRect();
    const scrollableDivRect = scrollableDiv.getBoundingClientRect();

    return (
        elementRect.top >= scrollableDivRect.top &&
        elementRect.left >= scrollableDivRect.left &&
        elementRect.bottom <= scrollableDivRect.bottom &&
        elementRect.right <= scrollableDivRect.right
    );
}

export const calculateVisiblePages = (currentPage: number, totalPages: number, visibleRange = 5) => {
    const visiblePages = [];
    const halfRange = Math.floor(visibleRange / 2);

    let start = Math.max(currentPage - halfRange, 1);
    let end = Math.min(currentPage + halfRange, totalPages);

    if (end - start + 1 < visibleRange) {
        if (start === 1) {
            end = Math.min(totalPages, visibleRange);
        } else {
            start = Math.max(1, totalPages - visibleRange + 1);
        }
    }

    for (let i = start; i <= end; i++) {
        visiblePages.push(i);
    }

    return visiblePages;
};
