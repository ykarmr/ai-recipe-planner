import { AIRecipe } from "@/type/recipe";
import { Link } from "react-router-dom";
import { Card, CardHeader, CardContent } from "../ui/card";

type Props = {
  aiRecipe: AIRecipe;
};
function RecipeCardItem({ aiRecipe }: Props) {
  const mealTiming = aiRecipe.conditions.mealTiming;
  const cuisineGenre = aiRecipe.conditions.cuisineGenre;
  const cookingThemes = aiRecipe.conditions.cookingThemes;
  const cookingDifficulties = aiRecipe.conditions.cookingDifficulties;
  const title = aiRecipe.recipe.map((item) => item.name).join("\n");

  return (
    <Link to={`/plan-detail/${aiRecipe.aiRecipeId}`}>
      <Card>
        <CardHeader>
          <p>作成日: {aiRecipe.createdAt}</p>
          <h2 className="text-xl whitespace-pre break-words truncate font-bold">
            {title}
          </h2>
        </CardHeader>
        <CardContent>
          <ul className="list-disc list-inside">
            {mealTiming && <li>食事タイミング: {mealTiming}</li>}
            {cuisineGenre && <li>料理ジャンル: {cuisineGenre}</li>}
            {cookingThemes && <li>料理テーマ: {cookingThemes}</li>}
            {cookingDifficulties && <li>料理難易度: {cookingDifficulties}</li>}
          </ul>
        </CardContent>
      </Card>
    </Link>
  );
}

export default RecipeCardItem;
