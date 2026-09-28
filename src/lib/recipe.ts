import fs from 'fs';
import path from 'path';
import Recipe from '../interfaces/Recipe';
import Tag from '../interfaces/Tag';
import Product from '../interfaces/Product';

const recipesDir = path.join(process.cwd(), 'data', 'recipes');
const tagsDir = path.join(process.cwd(), 'data', 'tags');
const productsDir = path.join(process.cwd(), 'data', 'products');

// --- IN-MEMORY CACHES FOR FAST STATIC GENERATION ---
let cachedRecipes: Recipe[] | null = null;
let cachedRecipeMap: Map<string, Recipe> | null = null;
const cachedTagMap: Map<string, Tag> = new Map();
let cachedTagSlugs: string[] | null = null;
const cachedProductMap: Map<string, Product> = new Map();
let cachedProductSlugs: string[] | null = null;

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
 * Loads all recipes from disk, sorted alphabetically by slug. Cached in memory.
 */
export const getAllRecipes = (): Recipe[] => {
    if (cachedRecipes) return cachedRecipes;
    if (!fs.existsSync(recipesDir)) return [];

    cachedRecipes = fs.readdirSync(recipesDir)
        .filter(file => file.endsWith('.json'))
        .map(file => readJsonFile<Recipe>(path.join(recipesDir, file))!)
        .sort((a, b) => a.slug.localeCompare(b.slug));

    cachedRecipeMap = new Map(cachedRecipes.map(r => [r.slug, r]));
    return cachedRecipes;
};

export const getRecipeBySlug = (slug: string): Recipe | undefined => {
    if (!cachedRecipeMap) {
        getAllRecipes();
    }
    return cachedRecipeMap?.get(slug);
};

export const getRecipesBySlugs = (slugs: string[]): Recipe[] => {
    const all = getAllRecipes();
    return all
        .filter(recipe => slugs.includes(recipe.slug))
        .sort((a, b) => slugs.indexOf(a.slug) - slugs.indexOf(b.slug));
};

// --- TAG FUNCTIONS ---

/**
 * Retrieves tag metadata (name, description, etc.) from data/tags with memory caching.
 */
export const getTagBySlug = (slug: string): Tag | null => {
    if (cachedTagMap.has(slug)) return cachedTagMap.get(slug)!;
    const tag = readJsonFile<Tag>(path.join(tagsDir, `${slug}.json`));
    if (tag) cachedTagMap.set(slug, tag);
    return tag;
};

/**
 * Returns all available tag slugs from the data/tags directory with caching.
 */
export const getAllTagSlugs = (): string[] => {
    if (cachedTagSlugs) return cachedTagSlugs;
    if (!fs.existsSync(tagsDir)) return [];
    cachedTagSlugs = fs.readdirSync(tagsDir).map(file => file.replace(/\.json$/, ''));
    return cachedTagSlugs;
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
 * Retrieves product metadata (name, image, etc.) from data/products with caching.
 */
export const getProductBySlug = (slug: string): Product | null => {
    if (cachedProductMap.has(slug)) return cachedProductMap.get(slug)!;
    const product = readJsonFile<Product>(path.join(productsDir, `${slug}.json`));
    if (product) cachedProductMap.set(slug, product);
    return product;
};

/**
 * Returns all available product slugs from the data/products directory with caching.
 */
export const getAllProductSlugs = (): string[] => {
    if (cachedProductSlugs) return cachedProductSlugs;
    if (!fs.existsSync(productsDir)) return [];
    cachedProductSlugs = fs.readdirSync(productsDir).map(file => file.replace(/\.json$/, ''));
    return cachedProductSlugs;
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

