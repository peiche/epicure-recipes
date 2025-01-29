import { ImageDataLike } from "gatsby-plugin-image";
import { Tag } from "./Tag";

export interface Recipe {
    id: string;
    name: string;
    slug: string;
    totalTime: string;
    servings: string;
    description: string;
    ingredients: Ingredient[];
    preparation: string[];
    tags: Tag[];
    tips: string[];
    perfectlyBalanceYourPlate: string,
    nutritionalInformation: NutritionalInformation,
    imagePath?: ImageDataLike;
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
