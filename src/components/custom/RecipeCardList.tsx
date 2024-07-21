// RecipeCardList.tsx
import { AIRecipe } from "@/type/recipe";
import { RecipeCardItem } from "./RecipeCardItem";

type Props = {
  list: AIRecipe[];
};
export function RecipeCardList({ list }: Props) {
  return (
    <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      {list.map((item) => (
        <RecipeCardItem key={item.aiRecipeId} aiRecipe={item} />
      ))}
    </div>
  );
}
