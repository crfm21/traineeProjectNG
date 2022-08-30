import { IngredientComposition } from "./ingredient-composition";

export interface Ingredient{
  id?: number;
  isDeleted?: boolean;
  creationDate?: Date;
  name: string;
  ingredientCompositions?: IngredientComposition[];
}
