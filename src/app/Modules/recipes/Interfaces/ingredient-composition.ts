export interface IngredientComposition {
  id?: number;
  isDeleted?: boolean;
  creationDate?: Date;
  name?: string;
  ingredientId: number;
  quantity: number;
  unitDescription?: string;
  unit: number;
  recipeId?: number
}

export enum measurementUnits{
  unit,
  mg,
  g,
  kg,
  mL,
  cL,
  dL,
  L,
  pinch,
  qb
}
