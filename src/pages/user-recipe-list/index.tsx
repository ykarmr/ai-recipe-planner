import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { db } from "@/lib/firebase";
import { AIRecipe } from "@/type/recipe";
import { query, where, collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

export function UserRecipeList() {
  const params = useParams();
  const navigate = useNavigate();
  const [list, setList] = useState<AIRecipe[] | null>(null);

  useEffect(() => {
    (async () => {
      if (!params.uid) {
        navigate("/not-found");
        return;
      }

      const aiRecipesDoc = await collection(db, "aiRecipes");
      const q = query(aiRecipesDoc, where("uid", "==", params.uid));
      const filterAiRecipesDoc = await getDocs(q);

      const newList: AIRecipe[] = [];
      filterAiRecipesDoc.forEach((item) => {
        newList.push(item.data() as AIRecipe);
      });
      setList(newList);
    })();
  }, [navigate, params.uid]);

  return (
    <div className="sm:px-10 md:px-32 lg:px-56 xl:px-10 px-5 mt-1 p-8">
      <div className="grid gap-x-8 gap-y-4 grid-cols-3">
        {list?.map((item) => {
          const mealTiming = item.conditions.mealTiming;
          const cuisineGenre = item.conditions.cuisineGenre;
          const cookingThemes = item.conditions.cookingThemes;
          const cookingDifficulties = item.conditions.cookingDifficulties;

          console.log(item.createdAt);
          const title = item.recipe.map((item) => item.name).join("\n");
          return (
            <Link to={`/plan-detail/${item.aiRecipeId}`}>
              <Card>
                <CardHeader>
                  <p>作成日: {item.createdAt}</p>
                  <h2 className="text-xl whitespace-pre break-words truncate font-bold">
                    {title}
                  </h2>
                </CardHeader>
                <CardContent>
                  <ul className="list-disc list-inside">
                    {mealTiming && <li>食事タイミング: {mealTiming}</li>}
                    {cuisineGenre && <li>料理ジャンル: {cuisineGenre}</li>}
                    {cookingThemes && <li>料理テーマ: {cookingThemes}</li>}
                    {cookingDifficulties && (
                      <li>料理難易度: {cookingDifficulties}</li>
                    )}
                  </ul>
                </CardContent>
              </Card>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
