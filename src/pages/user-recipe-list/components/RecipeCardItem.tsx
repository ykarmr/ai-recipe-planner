import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { AIRecipe } from "@/type/recipe";
import { Link } from "react-router-dom";

type Props = {
  aiRecipe: AIRecipe;
};

export function RecipeCardItem({ aiRecipe }: Props) {
  const mealTiming = aiRecipe.conditions.mealTiming;
  const cuisineGenre = aiRecipe.conditions.cuisineGenre;
  const cookingThemes = aiRecipe.conditions.cookingTheme;
  const cookingDifficulties = aiRecipe.conditions.cookingDifficulty;

  return (
    <Link to={`/plan-detail/${aiRecipe.aiRecipeId}`} className="block">
      <Card className="m-4 overflow-hidden rounded-xl bg-white shadow-lg sm:transform sm:transition sm:hover:scale-105 sm:hover:shadow-2xl">
        <CardHeader className="bg-gradient-to-r from-blue-500 to-indigo-600 p-5 text-white">
          <p className="text-sm">
            作成日: {new Date(aiRecipe.createdAt).toLocaleString()}
          </p>
          <p className="text-sm">提案メニュー</p>
          {aiRecipe.recipe.map((item) => (
            <h2 key={item.name} className="mt-2 truncate text-lg font-bold">
              {item.name}
            </h2>
          ))}
        </CardHeader>
        <CardContent className="p-5">
          <div className="space-y-4 text-gray-700">
            {mealTiming && (
              <div>
                <span className="block font-semibold text-gray-900">
                  食事タイミング
                </span>
                <span>{mealTiming}</span>
              </div>
            )}
            {cuisineGenre && (
              <div>
                <span className="block font-semibold text-gray-900">
                  料理ジャンル
                </span>
                <span>{cuisineGenre}</span>
              </div>
            )}
            {cookingThemes && (
              <div>
                <span className="block font-semibold text-gray-900">
                  料理テーマ
                </span>
                <span>{cookingThemes}</span>
              </div>
            )}
            {cookingDifficulties && (
              <div>
                <span className="block font-semibold text-gray-900">
                  料理難易度
                </span>
                <span>{cookingDifficulties}</span>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
