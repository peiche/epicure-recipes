import { Tag } from "./Tag";
import { Product } from "./Product";

export interface Recipe {
    name: string;
    slug: string;
    totalTime: string;
    servings: string;
    description: string;
    ingredients: Ingredient[];
    preparation: string[];
    tags: Tag[];
    products: Product[];
    tips: string[];
    perfectlyBalanceYourPlate: string,
    nutritionalInformation: NutritionalInformation,
    image: string;
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
