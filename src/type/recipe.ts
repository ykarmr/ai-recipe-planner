export interface Recipe {
  name: string;
  time: string;
  steps: Step[];
  ingredients: Ingredient[];
  price: string;
}

export interface Ingredient {
  name: string;
  price: string;
  quantity: string;
}

export interface Step {
  time: string;
  detail: string;
}

export type AIRecipe = {
  aiRecipeId: string;
  recipe: Recipe[];
  conditions: Conditions;
  createdAt: string;
  uid: string | null;
};

export type Conditions = {
  mealTiming: string | null;
  cuisineGenre: string | null;
  cookingThemes: string | null;
  cookingDifficulties: string | null;
};
