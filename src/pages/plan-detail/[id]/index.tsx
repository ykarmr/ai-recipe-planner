import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { db } from "@/lib/firebase";
import { AIRecipe } from "@/type/recipe";
import { getDoc, doc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function PlanDetail() {
  const params = useParams();
  const [aiRecipe, setAIRecipe] = useState<AIRecipe | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      if (!params.id) {
        navigate("/not-found");
        return;
      }

      const aiRecipeDoc = await getDoc(doc(db, "aiRecipes", params.id));
      if (!aiRecipeDoc.exists()) {
        navigate("/not-found");
        return;
      }
      console.log("test");

      const data = aiRecipeDoc.data();
      setAIRecipe(data as AIRecipe);
      // setAIRecipe();
    })();
  }, [navigate, params.id]);

  return (
    <div className="sm:px-10 md:px-32 lg:px-56 xl:px-10 px-5 mt-1 p-8">
      {aiRecipe && (
        <>
          <h2 className="font-bold text-3xl">レシピの条件は以下です</h2>
          <ul className="mt-4 list-disc list-inside">
            {aiRecipe.conditions.mealTiming && (
              <li>食事タイミング: {aiRecipe.conditions.mealTiming}</li>
            )}
            {aiRecipe.conditions.cuisineGenre && (
              <li>料理ジャンル: {aiRecipe.conditions.cuisineGenre}</li>
            )}
            {aiRecipe.conditions.cookingThemes && (
              <li>料理テーマ: {aiRecipe.conditions.cookingThemes}</li>
            )}
            {aiRecipe.conditions.cookingDifficulties && (
              <li>料理難易度: {aiRecipe.conditions.cookingDifficulties}</li>
            )}
          </ul>

          <div className="flex flex-col mt-8 gap-8">
            {aiRecipe.recipe.map((recipe) => (
              <Card key={recipe.name}>
                <CardHeader>
                  <h3 className="text-2xl font-medium">{recipe.name}</h3>
                </CardHeader>
                <CardContent>
                  <p>この料理にかかるお金: {recipe.price}</p>
                  <p>この料理の調理時間: {recipe.time}</p>
                  <p>この料理に必要な食材</p>
                  <ul className="mt-4 list-disc list-inside">
                    {recipe.ingredients.map((item) => {
                      return (
                        <li>
                          {item.name} {item.quantity}({item.price})
                        </li>
                      );
                    })}
                  </ul>

                  <div className="mt-4">
                    <p>調理方法</p>
                    <ul className="list-decimal list-inside mt-2">
                      {recipe.steps.map((item, index) => (
                        <li className="" key={index}>
                          {item.detail}: {item.time}
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

export default PlanDetail;
