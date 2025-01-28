export function stripHtmlTags(str: string) {
    return str.replace(/<[^>]*>/g, '').replaceAll('&nbsp;', '').replaceAll('&amp;', '&').trim();
}

export function splitParagraphs(str: string) {
    return str
        .split(/<\/?p>/)
        .filter(Boolean);
}

export function extractListItems(str: string) {
    const regex = /<li>(.*?)<\/li>/g;
    let match;
    const items = [];

    while ((match = regex.exec(str)) !== null) {
        const cleanedText = match[1].replace(/\s+/g, ' ').trim();
        items.push(cleanedText);
    }

    return items;
}