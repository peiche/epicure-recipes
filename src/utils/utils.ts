import { EMOJI_MAP } from "../constants/emoji";
import Tag from "../interfaces/Tag";

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

/**
 * Helper to get an emoji for a tag slug.
 */
export const getEmojiForTag = (slug: string): string => {
    return EMOJI_MAP[slug.toLowerCase()] || '🍴';
};

/**
 * Constructs an Algolia search URL using the 'name' property from the tag objects
 */
export const getSearchUrlForTags = (tags: Tag[]): string => {
    const baseUrl = '/search/';
    const params = new URLSearchParams();

    const uniqueNames = Array.from(new Set(tags.map(t => t.name)));

    uniqueNames.forEach((name, index) => {
        const key = `recipe[refinementList][tags.name][${index}]`;
        params.append(key, name);
    });

    return `${baseUrl}?${params.toString()}`;
};
