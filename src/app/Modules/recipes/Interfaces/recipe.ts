import { IngredientComposition } from "./ingredient-composition";

export interface Recipe {
  id: number;
  isDeleted: boolean;
  creationDate?: Date;
  title: string;
  category: number;
  categoryString: string;
  difficulty: number;
  difficultyString: string;
  duration: string;
  servings: number;
  description: string;
  ingredientCompoList: IngredientComposition[],
  isPublished: boolean;
  publishDate?: Date;
  recipePhotoPath: string;
  rating: number;
  creatorMemberId: number
}

export enum ExperienceLevel {
  Debutant,
  Intermediate,
  Experienced
}

export enum Categories {
  Amusebouche,
  Starter,
  Meat,
  Fish,
  Vegetarian,
  Vegan,
  Dessert,
  Pastry,
  Viennoiserie
}
