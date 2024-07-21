import { AIRecipe } from "@/type/recipe";
import { Link } from "react-router-dom";
import { Card, CardHeader, CardContent } from "../ui/card";

type Props = {
  aiRecipe: AIRecipe;
};

export function RecipeCardItem({ aiRecipe }: Props) {
  const mealTiming = aiRecipe.conditions.mealTiming;
  const cuisineGenre = aiRecipe.conditions.cuisineGenre;
  const cookingThemes = aiRecipe.conditions.cookingThemes;
  const cookingDifficulties = aiRecipe.conditions.cookingDifficulties;

  return (
    <Link to={`/plan-detail/${aiRecipe.aiRecipeId}`} className="block">
      <Card className="bg-white rounded-lg shadow-lg transform transition hover:scale-105 hover:shadow-xl m-2">
        <CardHeader className="p-4 border-b border-gray-200">
          <p className="text-sm text-gray-500">作成日: {aiRecipe.createdAt}</p>
          <p className="text-sm text-gray-500">提案メニュー</p>

          {aiRecipe.recipe.map((item) => (
            <h2
              key={item.name}
              className="text-lg font-bold mt-2 text-gray-800 truncate"
            >
              {item.name}
            </h2>
          ))}
        </CardHeader>
        <CardContent className="p-4">
          <div className="text-gray-700 space-y-4">
            {mealTiming && (
              <div>
                <span className="font-semibold block">食事タイミング</span>
                <span>{mealTiming}</span>
              </div>
            )}
            {cuisineGenre && (
              <div>
                <span className="font-semibold block">料理ジャンル</span>
                <span>{cuisineGenre}</span>
              </div>
            )}
            {cookingThemes && (
              <div>
                <span className="font-semibold block">料理テーマ</span>
                <span>{cookingThemes}</span>
              </div>
            )}
            {cookingDifficulties && (
              <div>
                <span className="font-semibold block">料理難易度</span>
                <span>{cookingDifficulties}</span>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
