import type Recipe from '../interfaces/Recipe';

/**
 * Strips HTML tags and decodes common HTML entities often found in recipe text.
 */
export function cleanHtml(text?: string | null): string {
    if (!text) return '';

    return text
        .replace(/&frasl;/gi, '/')
        .replace(/&frac12;/gi, '1/2')
        .replace(/&frac14;/gi, '1/4')
        .replace(/&frac34;/gi, '3/4')
        .replace(/&frac13;/gi, '1/3')
        .replace(/&frac23;/gi, '2/3')
        .replace(/&frac18;/gi, '1/8')
        .replace(/&frac38;/gi, '3/8')
        .replace(/&frac58;/gi, '5/8')
        .replace(/&frac78;/gi, '7/8')
        .replace(/&nbsp;/gi, ' ')
        .replace(/&amp;/gi, '&')
        .replace(/&quot;/gi, '"')
        .replace(/&#39;/gi, "'")
        .replace(/&apos;/gi, "'")
        .replace(/&lt;/gi, '<')
        .replace(/&gt;/gi, '>')
        .replace(/&deg;/gi, '°')
        .replace(/&ndash;/gi, '-')
        .replace(/&mdash;/gi, '-')
        .replace(/[–—]/g, '-')
        .replace(/<[^>]*>?/gm, '')
        .replace(/\s+/g, ' ')
        .trim();
}

/**
 * Parses human duration string (e.g. "10 min", "1 hr", "1 hr 15 min", "8 - 9 hours", "10 - 15 min")
 * into an ISO 8601 duration string (e.g. "PT10M", "PT1H", "PT1H15M", "PT9H", "PT15M").
 */
export function parseDurationToIso8601(durationStr?: string | null): string | undefined {
    if (!durationStr) return undefined;

    const cleaned = durationStr
        .toLowerCase()
        .replace(/[–—]/g, '-')
        .replace(/\s+/g, ' ')
        .trim();

    // If there is a range like "10 - 15 min" or "8 - 9 hours", pick the upper bound
    const rangeNormalized = cleaned.replace(/(\d+)\s*-\s*(\d+)/g, '$2');

    let hours = 0;
    let minutes = 0;

    const hourMatch = rangeNormalized.match(/(\d+)\s*(?:hr|hour|hrs|hours)\b/);
    if (hourMatch) {
        hours = parseInt(hourMatch[1], 10);
    }

    const minMatch = rangeNormalized.match(/(\d+)\s*(?:min|minute|mins|minutes)\b/);
    if (minMatch) {
        minutes = parseInt(minMatch[1], 10);
    }

    if (hours === 0 && minutes === 0) {
        // Direct number fallback if just "15" followed by nothing or unknown
        const pureNumberMatch = rangeNormalized.match(/^(\d+)$/);
        if (pureNumberMatch) {
            minutes = parseInt(pureNumberMatch[1], 10);
        } else {
            return undefined;
        }
    }

    let iso = 'PT';
    if (hours > 0) iso += `${hours}H`;
    if (minutes > 0) iso += `${minutes}M`;

    return iso === 'PT' ? undefined : iso;
}

/**
 * Builds a Schema.org Recipe structured data object compliant with Google Rich Results.
 */
export function buildRecipeSchema(recipe: Recipe, siteUrl: string): Record<string, any> {
    const canonicalUrl = `${siteUrl}/recipe/${recipe.slug}/`;
    const cleanedDescription = cleanHtml(recipe.description);
    const description = cleanedDescription || `${recipe.name} recipe - quick, healthy, and easy to make with Epicure.`;

    const ingredients = recipe.ingredients
        ?.map((ing) => {
            const quantity = ing.quantity ? `${cleanHtml(ing.quantity)} ` : '';
            const name = cleanHtml(ing.name);
            const extra = ing.additionalInstruction ? `, ${cleanHtml(ing.additionalInstruction)}` : '';
            return `${quantity}${name}${extra}`.trim();
        })
        .filter(Boolean);

    const instructions = recipe.preparation
        ?.map((step) => ({
            '@type': 'HowToStep',
            text: cleanHtml(step),
        }))
        .filter((step) => Boolean(step.text));

    const totalTimeIso = parseDurationToIso8601(recipe.totalTime);

    // Identify recipe category from tags
    const commonCategories = ['dinner', 'lunch', 'breakfast', 'dessert', 'appetizer', 'snack', 'side dish', 'beverage'];
    const matchedCategoryTag = recipe.tags?.find((t) => commonCategories.includes(t.name.toLowerCase()));
    const recipeCategory = matchedCategoryTag ? matchedCategoryTag.name : (recipe.tags?.[0]?.name || undefined);

    const keywords = recipe.tags?.map((t) => cleanHtml(t.name)).join(', ');

    const schema: Record<string, any> = {
        '@context': 'https://schema.org',
        '@type': 'Recipe',
        name: recipe.name,
        url: canonicalUrl,
        image: recipe.image ? [`${siteUrl}/images/recipes/${encodeURI(recipe.image)}`] : [],
        description,
        recipeYield: recipe.servings ? cleanHtml(recipe.servings) : undefined,
        recipeIngredient: ingredients,
        recipeInstructions: instructions,
        author: {
            '@type': 'Organization',
            name: 'Epicure',
            url: siteUrl,
        },
    };

    if (totalTimeIso) {
        schema.totalTime = totalTimeIso;
    }

    if (recipeCategory) {
        schema.recipeCategory = recipeCategory;
    }

    if (keywords) {
        schema.keywords = keywords;
    }

    if (recipe.nutritionalInformation) {
        const nut = recipe.nutritionalInformation;
        const nutrition: Record<string, any> = {
            '@type': 'NutritionInformation',
        };

        if (nut.calories !== undefined && nut.calories !== null) nutrition.calories = `${nut.calories} calories`;
        if (nut.carbohydrate !== undefined && nut.carbohydrate !== null) nutrition.carbohydrateContent = `${nut.carbohydrate} g`;
        if (nut.protein !== undefined && nut.protein !== null) nutrition.proteinContent = `${nut.protein} g`;
        if (nut.fat !== undefined && nut.fat !== null) nutrition.fatContent = `${nut.fat} g`;
        if (nut.saturatedFat !== undefined && nut.saturatedFat !== null) nutrition.saturatedFatContent = `${nut.saturatedFat} g`;
        if (nut.transFat !== undefined && nut.transFat !== null) nutrition.transFatContent = `${nut.transFat} g`;
        if (nut.cholesterol !== undefined && nut.cholesterol !== null) nutrition.cholesterolContent = `${nut.cholesterol} mg`;
        if (nut.sodium !== undefined && nut.sodium !== null) nutrition.sodiumContent = `${nut.sodium} mg`;
        if (nut.fiber !== undefined && nut.fiber !== null) nutrition.fiberContent = `${nut.fiber} g`;
        if (nut.sugars !== undefined && nut.sugars !== null) nutrition.sugarContent = `${nut.sugars} g`;
        if (nut.servingSize) nutrition.servingSize = cleanHtml(nut.servingSize);

        if (Object.keys(nutrition).length > 1) {
            schema.nutrition = nutrition;
        }
    }

    return schema;
}

/**
 * Builds a Schema.org BreadcrumbList structured data object.
 */
export function buildBreadcrumbSchema(
    items: Array<{ name: string; path: string }>,
    siteUrl: string
): Record<string, any> {
    return {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: items.map((item, index) => {
            const cleanPath = item.path.startsWith('/') ? item.path : `/${item.path}`;
            const fullUrl = cleanPath === '/' ? `${siteUrl}/` : `${siteUrl}${cleanPath}`;
            return {
                '@type': 'ListItem',
                position: index + 1,
                name: item.name,
                item: fullUrl,
            };
        }),
    };
}

/**
 * Builds a Schema.org ItemList structured data object for listing/category pages.
 */
export function buildItemListSchema(
    items: Array<{ name: string; path: string; image?: string }>,
    siteUrl: string,
    startPosition: number = 1
): Record<string, any> {
    return {
        '@context': 'https://schema.org',
        '@type': 'ItemList',
        itemListElement: items.map((item, index) => {
            const cleanPath = item.path.startsWith('/') ? item.path : `/${item.path}`;
            const fullUrl = `${siteUrl}${cleanPath}`;
            const listItem: Record<string, any> = {
                '@type': 'ListItem',
                position: startPosition + index,
                name: item.name,
                url: fullUrl,
            };
            if (item.image) {
                listItem.image = item.image.startsWith('http')
                    ? item.image
                    : `${siteUrl}${item.image.startsWith('/') ? '' : '/'}${item.image}`;
            }
            return listItem;
        }),
    };
}

/**
 * Builds a Schema.org WebSite structured data object with SearchAction.
 */
export function buildWebSiteSchema(siteUrl: string): Record<string, any> {
    return {
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: 'Epicure Recipes',
        url: `${siteUrl}/`,
        potentialAction: {
            '@type': 'SearchAction',
            target: {
                '@type': 'EntryPoint',
                urlTemplate: `${siteUrl}/search/?recipe%5Bquery%5D={search_term_string}`,
            },
            'query-input': 'required name=search_term_string',
        },
    };
}
