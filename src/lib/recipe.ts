import fs from 'fs';
import path from 'path';
import Recipe from '../interfaces/Recipe';
import Tag from '../interfaces/Tag';
import Product from '../interfaces/Product';

const recipesDir = path.join(process.cwd(), 'data', 'recipes');
const tagsDir = path.join(process.cwd(), 'data', 'tags');
const productsDir = path.join(process.cwd(), 'data', 'products');

// --- INTERNAL HELPERS ---

/**
 * Shared utility to read and parse JSON files safely.
 */
const readJsonFile = <T>(filePath: string): T | null => {
    if (!fs.existsSync(filePath)) return null;
    const content = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(content) as T;
};

// --- RECIPE FUNCTIONS ---

/**
 * Loads all recipes from disk, sorted alphabetically by slug.
 */
export const getAllRecipes = (): Recipe[] => {
    if (!fs.existsSync(recipesDir)) return [];

    return fs.readdirSync(recipesDir)
        .filter(file => file.endsWith('.json'))
        .map(file => readJsonFile<Recipe>(path.join(recipesDir, file))!)
        .sort((a, b) => a.slug.localeCompare(b.slug));
};

export const getRecipeBySlug = (slug: string): Recipe | undefined => {
    return getAllRecipes().find(recipe => recipe.slug === slug);
};

export const getRecipesBySlugs = (slugs: string[]): Recipe[] => {
    return getAllRecipes()
        .filter(recipe => slugs.includes(recipe.slug))
        .sort((a, b) => slugs.indexOf(a.slug) - slugs.indexOf(b.slug));
};

// --- TAG FUNCTIONS ---

/**
 * Retrieves tag metadata (name, description, etc.) from data/tags.
 */
export const getTagBySlug = (slug: string): Tag | null => {
    return readJsonFile<Tag>(path.join(tagsDir, `${slug}.json`));
};

/**
 * Returns all available tag slugs from the data/tags directory.
 */
export const getAllTagSlugs = (): string[] => {
    if (!fs.existsSync(tagsDir)) return [];
    return fs.readdirSync(tagsDir).map(file => file.replace(/\.json$/, ''));
};

/**
 * Finds all recipes that contain a specific tag slug.
 */
export const getRecipesByTag = (slug: string): Recipe[] => {
    if (!slug) return [];
    return getAllRecipes().filter(recipe =>
        recipe.tags?.some(tag => tag.slug === slug)
    );
};

// --- TAG FUNCTIONS ---

/**
 * Returns all tag objects from the data/tags folder.
 */
export const getTags = (): Tag[] => {
    const slugs = getAllTagSlugs();
    return slugs
        .map(slug => getTagBySlug(slug))
        .filter((tag): tag is Tag => tag !== null);
};

// --- PRODUCT FUNCTIONS ---

/**
 * Retrieves product metadata (name, image, etc.) from data/products.
 */
export const getProductBySlug = (slug: string): Product | null => {
    return readJsonFile<Product>(path.join(productsDir, `${slug}.json`));
};

/**
 * Returns all available product slugs from the data/products directory.
 */
export const getAllProductSlugs = (): string[] => {
    if (!fs.existsSync(productsDir)) return [];
    return fs.readdirSync(productsDir).map(file => file.replace(/\.json$/, ''));
};

/**
 * Finds all recipes associated with a specific product slug.
 */
export const getRecipesByProduct = (slug: string | string[] | undefined): Recipe[] => {
    if (!slug) return [];
    const target = Array.isArray(slug) ? slug[0] : slug;

    return getAllRecipes().filter(recipe =>
        recipe.products?.some(product => product.slug === target)
    );
};

/**
 * Returns the most frequently used tags across all recipes.
 * @param limit The number of top tags to return (e.g., 6)
 */
export const getPopularTags = (limit: number = 6) => {
    const allRecipes = getAllRecipes();
    const counts: Record<string, number> = {};

    // 1. Count occurrences of each tag slug
    allRecipes.forEach((recipe) => {
        recipe.tags?.forEach((tag) => {
            if (tag.slug) {
                counts[tag.slug] = (counts[tag.slug] || 0) + 1;
            }
        });
    });

    // 2. Sort slugs by frequency and take the top N
    const topSlugs = Object.keys(counts)
        .sort((a, b) => counts[b] - counts[a])
        .slice(0, limit);

    // 3. Map back to full Tag metadata
    return topSlugs
        .map((slug) => getTagBySlug(slug))
        .filter((tag): tag is Tag => tag !== null);
};
