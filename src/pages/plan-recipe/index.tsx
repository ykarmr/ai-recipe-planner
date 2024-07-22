import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { db } from "@/lib/firebase";
import { generateFromGemini } from "@/lib/gemeini";
import { setDoc, doc } from "firebase/firestore";
import { Loader2 } from "lucide-react";
import { ChangeEvent, useState } from "react";
import { v4 as uuid } from "uuid";
import { useNavigate } from "react-router-dom";
import { AIRecipe, Recipe } from "@/type/recipe";
import { toast } from "sonner";
import { useAuthContext } from "@/components/provider/AuthContextProvider";
import { SelectListItem, SelectList } from "./componets/SelectList";
import {
  mealTimings,
  cuisineGenres,
  cookingThemes,
  cookingDifficulties,
} from "./utils/options";
import { recipeSchema } from "./utils/aiSchema";

export function PlanRecipePage() {
  const navigate = useNavigate();
  const { loginUser } = useAuthContext();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [selectMealTiming, setSelectMealTiming] = useState<SelectListItem>();
  const [selectCuisineGenre, setSelectCuisineGenre] =
    useState<SelectListItem>();
  const [selectCookingThemes, setSelectCookingThemes] =
    useState<SelectListItem>();
  const [selectCookingDifficulties, setSelectCookingDifficulties] =
    useState<SelectListItem>();
  const [numberOfRecipe, setNumberOfRecipe] = useState<number>(1);

  const changeNumberOfRecipe = (e: ChangeEvent<HTMLInputElement>) => {
    setNumberOfRecipe(Number(e.target.value));
  };

  const generateRecipe = async () => {
    setIsLoading(true);
    try {
      if (
        !selectMealTiming?.title &&
        !selectCuisineGenre?.title &&
        !selectCookingThemes?.title &&
        !selectCookingDifficulties?.title
      ) {
        toast(
          "食事タイミング、料理ジャンル、料理テーマ、料理難易度のどれか一つは必須です"
        );
        return;
      }

      if (numberOfRecipe < 1 || numberOfRecipe > 5) {
        toast("献立数は1から5の間にしてください");
        return;
      }

      const schema = JSON.stringify(recipeSchema);

      const mealTiming = selectMealTiming?.title
        ? `食事タイミング: ${selectMealTiming?.title}`
        : "";
      const cuisineGenre = selectCuisineGenre?.title
        ? `料理ジャンル: ${selectCuisineGenre?.title}`
        : "";
      const cookingThemes = selectCookingThemes?.title
        ? `料理テーマ: ${selectCookingThemes?.title}`
        : "";
      const cookingDifficulties = selectCookingDifficulties?.title
        ? `料理難易度: ${selectCookingDifficulties?.title}`
        : "";
      const prompt = `
        貴方は凄腕の料理人です。条件の内容から、レシピ情報を出力してください

        条件
        ${mealTiming}
        ${cuisineGenre}
        ${cookingThemes}
        ${cookingDifficulties}

        出力内容
        ${numberOfRecipe}つ出力
        JSONの形式: 
        ${schema}
      `;

      const aiResponse = await generateFromGemini(prompt);
      const paresAiResponse = JSON.parse(aiResponse);

      const aiRecipeId = uuid();
      const recipe = Array.isArray(paresAiResponse)
        ? paresAiResponse
        : [paresAiResponse];

      const saveData: AIRecipe = {
        aiRecipeId,
        recipe: recipe as Recipe[],
        conditions: {
          mealTiming: selectMealTiming?.title ?? null,
          cuisineGenre: selectCuisineGenre?.title ?? null,
          cookingThemes: selectCookingThemes?.title ?? null,
          cookingDifficulties: selectCookingDifficulties?.title ?? null,
        },
        createdAt: new Date().toUTCString(),
        uid: loginUser?.uid ?? null,
      };

      await setDoc(doc(db, "aiRecipes", aiRecipeId), saveData);

      navigate(`/plan-detail/${aiRecipeId}`);
    } catch (e) {
      toast("エラーが発生しました");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center p-5 sm:p-10">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-3xl">
        <h2 className="font-bold text-3xl mb-4 text-center text-gray-800">
          献立を提案！！
        </h2>
        <p className="mt-3 text-gray-500 text-xl text-center">
          以下の情報を設定して、「献立を提案」を押すとレストラン情報を提示します
        </p>
        <div className="mt-10 flex flex-col gap-9">
          <div>
            <h2 className="text-xl font-medium mb-2">食事タイミング</h2>
            <SelectList
              list={mealTimings}
              onSelect={setSelectMealTiming}
              selectValue={selectMealTiming}
            />
          </div>
          <div>
            <h2 className="text-xl font-medium mb-2">料理ジャンル</h2>
            <SelectList
              list={cuisineGenres}
              onSelect={setSelectCuisineGenre}
              selectValue={selectCuisineGenre}
            />
          </div>
          <div>
            <h2 className="text-xl font-medium mb-2">料理テーマ</h2>
            <SelectList
              list={cookingThemes}
              onSelect={setSelectCookingThemes}
              selectValue={selectCookingThemes}
            />
          </div>
          <div>
            <h2 className="text-xl font-medium mb-2">料理難易度</h2>
            <SelectList
              list={cookingDifficulties}
              onSelect={setSelectCookingDifficulties}
              selectValue={selectCookingDifficulties}
            />
          </div>
          <div>
            <h2 className="text-xl font-medium mb-2">献立数</h2>
            <Input
              onChange={changeNumberOfRecipe}
              type="number"
              min={1}
              max={5}
              value={numberOfRecipe}
              className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
            />
          </div>
        </div>

        <div className="my-10 flex justify-end">
          {isLoading ? (
            <Button disabled className="bg-gray-400 cursor-not-allowed">
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Please wait
            </Button>
          ) : (
            <Button
              onClick={generateRecipe}
              className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg shadow-lg transform transition hover:scale-105"
            >
              献立を提案
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
