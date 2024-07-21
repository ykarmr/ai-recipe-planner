import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { db } from "@/lib/firebase";
import { AIRecipe } from "@/type/recipe";
import { getDoc, doc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";

export function PlanDetail() {
  const params = useParams();
  const [aiRecipe, setAIRecipe] = useState<AIRecipe | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      if (!params.id) {
        navigate("/not-found");
        return;
      }

      try {
        const aiRecipeDoc = await getDoc(doc(db, "aiRecipes", params.id));
        if (!aiRecipeDoc.exists()) {
          navigate("/not-found");
          return;
        }

        const data = aiRecipeDoc.data();
        setAIRecipe(data as AIRecipe);
      } catch {
        toast("エラーが発生しました");
      }
    })();
  }, [navigate, params.id]);

  return (
    <div className="p-5 sm:p-10">
      {aiRecipe && (
        <>
          <div className="mt-4 bg-white p-6 rounded-lg shadow-md">
            <p>こちらのレシピの生成条件は以下です</p>

            <ul className="mt-4 list-disc list-inside">
              {aiRecipe.conditions.mealTiming && (
                <li className="mb-2">
                  食事タイミング: {aiRecipe.conditions.mealTiming}
                </li>
              )}
              {aiRecipe.conditions.cuisineGenre && (
                <li className="mb-2">
                  料理ジャンル: {aiRecipe.conditions.cuisineGenre}
                </li>
              )}
              {aiRecipe.conditions.cookingThemes && (
                <li className="mb-2">
                  料理テーマ: {aiRecipe.conditions.cookingThemes}
                </li>
              )}
              {aiRecipe.conditions.cookingDifficulties && (
                <li className="mb-2">
                  料理難易度: {aiRecipe.conditions.cookingDifficulties}
                </li>
              )}
              <li className="mb-2">
                こちらのレシピの作成日:{" "}
                {new Date(aiRecipe.createdAt).toLocaleString()}
              </li>
            </ul>
          </div>

          <div className="grid gap-8 mt-8 grid-cols-1">
            {aiRecipe.recipe.map((recipe) => (
              <Card
                key={recipe.name}
                className="bg-white rounded-lg shadow-lg transform transition hover:scale-105 hover:shadow-xl"
              >
                <CardHeader className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white p-4 rounded-t-lg">
                  <h3 className="text-2xl font-medium">{recipe.name}</h3>
                </CardHeader>
                <CardContent className="p-4">
                  <p className="mb-2">この料理にかかるお金: {recipe.price}</p>
                  <p className="mb-2">この料理の調理時間: {recipe.time}</p>
                  <p className="mb-2">この料理に必要な食材:</p>
                  <ul className="mt-4 list-disc list-inside">
                    {recipe.ingredients.map((item) => {
                      return (
                        <li key={item.name} className="mb-1">
                          {item.name} {item.quantity} ({item.price})
                        </li>
                      );
                    })}
                  </ul>

                  <div className="mt-4">
                    <p className="mb-2">調理方法:</p>
                    <ul className="list-decimal list-inside mt-2">
                      {recipe.steps.map((item, index) => (
                        <li className="mb-1" key={index}>
                          {item.detail} ({item.time})
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
