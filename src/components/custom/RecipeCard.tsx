import { AIRecipe } from "@/type/recipe";

import RecipeCardItem from "./RecipeCardItem";

type Props = {
  list: AIRecipe[];
};
function RecipeCard({ list }: Props) {
  return (
    <div className="grid gap-x-8 gap-y-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {list?.map((item) => (
        <RecipeCardItem key={item.aiRecipeId} aiRecipe={item} />
      ))}
    </div>
  );
}

export default RecipeCard;
