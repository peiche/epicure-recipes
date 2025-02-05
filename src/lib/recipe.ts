import fs from 'fs';
import path from "path";
import { Product } from "../interfaces/Product";
import { Recipe } from "../interfaces/Recipe";
import { Tag } from '../interfaces/Tag';

export const getRecipes = () => {
    let recipes: Recipe[] = [];
    const recipesDirectory = path.join(process.cwd(), 'src', 'data', 'recipes');
    let filenames = fs.readdirSync(recipesDirectory);
    filenames = filenames.map(filename => path.join(process.cwd(), 'src', 'data', 'recipes', filename));
    filenames.forEach((filename) => {
        const content = fs.readFileSync(filename, 'utf8');
        const recipe: Recipe = JSON.parse(content);

        recipes.push(recipe);
    });

    recipes = recipes.sort((a, b) => {
        if (a.slug < b.slug) {
            return -1;
        }
        if (a.slug > b.slug) {
            return 1;
        }
        return 0;
    });

    return recipes;
};

export const getRecipesForTag = (slug: string | string[] | undefined) => {
    let recipes: Recipe[] = [];
    const recipesDirectory = path.join(process.cwd(), 'src', 'data', 'recipes');
    let filenames = fs.readdirSync(recipesDirectory);
    filenames = filenames.map(filename => path.join(process.cwd(), 'src', 'data', 'recipes', filename));
    filenames.forEach((filename) => {
        const content = fs.readFileSync(filename, 'utf8');
        const recipe: Recipe = JSON.parse(content);

        let shouldAdd = false;
        recipe.tags?.forEach((tag: Tag) => {
            if (tag.slug === slug) {
                shouldAdd = true;
            }
        });

        if (shouldAdd) {
            recipes.push(recipe);
        }
    });

    recipes = recipes.sort((a, b) => {
        if (a.slug < b.slug) {
            return -1;
        }
        if (a.slug > b.slug) {
            return 1;
        }
        return 0;
    });

    return recipes;
};

export const getRecipesForProduct = (slug: string | string[] | undefined) => {
    let recipes: Recipe[] = [];
    const recipesDirectory = path.join(process.cwd(), 'src', 'data', 'recipes');
    let filenames = fs.readdirSync(recipesDirectory);
    filenames = filenames.map(filename => path.join(process.cwd(), 'src', 'data', 'recipes', filename));
    filenames.forEach((filename) => {
        const content = fs.readFileSync(filename, 'utf8');
        const recipe: Recipe = JSON.parse(content);

        let shouldAdd = false;
        recipe.products?.forEach((product: Product) => {
            if (product.slug === slug) {
                shouldAdd = true;
            }
        });

        if (shouldAdd) {
            recipes.push(recipe);
        }
    });

    recipes = recipes.sort((a, b) => {
        if (a.slug < b.slug) {
            return -1;
        }
        if (a.slug > b.slug) {
            return 1;
        }
        return 0;
    });

    return recipes;
};
