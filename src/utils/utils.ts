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
