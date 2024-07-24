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
  group: string;
  details: Detail[];
}

export interface Detail {
  time: string;
  detail: string;
  temperature?: string;
  important_points?: string;
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
  cookingTheme: string | null;
  cookingDifficulty: string | null;
};
