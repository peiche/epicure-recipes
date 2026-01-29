import { Tag } from "./Tag";
import { Product } from "./Product";

export interface RecipeLite {
    name: string;
    slug: string;
    description: string;
    image: string;
    thumbnail: string;
}

export interface Recipe extends RecipeLite {
    totalTime: string;
    servings: string;
    ingredients: Ingredient[];
    preparation: string[];
    tags: Tag[];
    products: Product[];
    tips: string[];
    perfectlyBalanceYourPlate: string,
    nutritionalInformation: NutritionalInformation,
}

interface Ingredient {
    name: string;
    quantity: string;
    additionalInstruction: string;
    // relatedIngredients: []
}

interface NutritionalInformation {
    servingSize: string;
    calories: number;
    fat: number;
    saturatedFat: number;
    transFat: number;
    cholesterol: number;
    sodium: number;
    carbohydrate: number;
    fiber: number;
    sugars: number;
    protein: number;
}
