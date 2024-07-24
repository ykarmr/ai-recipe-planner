// RecipeCardList.tsx
import { AIRecipe } from "@/type/recipe";
import { RecipeCardItem } from "./RecipeCardItem";

type Props = {
  list: AIRecipe[];
};
export function RecipeCardList({ list }: Props) {
  return (
    <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
      {list.map((item) => (
        <RecipeCardItem key={item.aiRecipeId} aiRecipe={item} />
      ))}
    </div>
  );
}
