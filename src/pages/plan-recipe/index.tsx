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

import { SelectListItem, SelectList } from "./componets/SelectList";
import {
  mealTimings,
  cuisineGenres,
  cookingThemes,
  cookingDifficulties,
} from "./utils/options";
import { recipeSchema } from "./utils/aiSchema";
import { useAuthState } from "@/hooks/auth/useAuthState";

type FormData = {
  mealTiming?: SelectListItem;
  cuisineGenre?: SelectListItem;
  cookingTheme?: SelectListItem;
  cookingDifficulty?: SelectListItem;
  numberOfRecipe: number;
};
export function PlanRecipePage() {
  const navigate = useNavigate();
  const { user: loginUser } = useAuthState();

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [formData, setFormData] = useState<FormData>({ numberOfRecipe: 1 });

  const changeSelectList = (name: string) => (item?: SelectListItem) => {
    setFormData({ ...formData, [name]: item });
  };

  const changeNumberOfRecipe = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, numberOfRecipe: Number(e.target.value) });
  };

  const generateRecipe = async () => {
    setIsLoading(true);
    try {
      if (
        !formData.mealTiming?.title &&
        !formData.cuisineGenre?.title &&
        !formData.cookingTheme?.title &&
        !formData.cookingDifficulty?.title
      ) {
        toast(
          "食事タイミング、料理ジャンル、料理テーマ、料理難易度のどれか一つは必須です"
        );
        return;
      }

      if (formData.numberOfRecipe < 1 || formData.numberOfRecipe > 5) {
        toast("献立数は1から5の間にしてください");
        return;
      }

      const schema = JSON.stringify(recipeSchema);

      const mealTiming = formData.mealTiming?.title
        ? `食事タイミング: ${formData.mealTiming?.title}`
        : "";
      const cuisineGenre = formData.cuisineGenre?.title
        ? `料理ジャンル: ${formData.cuisineGenre?.title}`
        : "";
      const cookingThemes = formData.cookingTheme?.title
        ? `料理テーマ: ${formData.cookingTheme?.title}`
        : "";
      const cookingDifficulties = formData.cookingDifficulty?.title
        ? `料理難易度: ${formData.cookingDifficulty?.title}`
        : "";
      const prompt = `
        貴方は凄腕の料理人です。条件の内容から、レシピ情報を出力してください

        条件
        ${mealTiming}
        ${cuisineGenre}
        ${cookingThemes}
        ${cookingDifficulties}

        出力内容
        ${formData.numberOfRecipe}つ出力
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
          mealTiming: formData.mealTiming?.title ?? null,
          cuisineGenre: formData.cuisineGenre?.title ?? null,
          cookingTheme: formData.cookingTheme?.title ?? null,
          cookingDifficulty: formData.cookingDifficulty?.title ?? null,
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
    <div className="flex items-center justify-center p-5 sm:p-10 w-full">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full">
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
              onSelect={changeSelectList("mealTiming")}
              selectValue={formData.mealTiming}
            />
          </div>
          <div>
            <h2 className="text-xl font-medium mb-2">料理ジャンル</h2>
            <SelectList
              list={cuisineGenres}
              onSelect={changeSelectList("cuisineGenre")}
              selectValue={formData.cuisineGenre}
            />
          </div>
          <div>
            <h2 className="text-xl font-medium mb-2">料理テーマ</h2>
            <SelectList
              list={cookingThemes}
              onSelect={changeSelectList("cookingTheme")}
              selectValue={formData.cookingTheme}
            />
          </div>
          <div>
            <h2 className="text-xl font-medium mb-2">料理難易度</h2>
            <SelectList
              list={cookingDifficulties}
              onSelect={changeSelectList("cookingDifficulty")}
              selectValue={formData.cookingDifficulty}
            />
          </div>
          <div>
            <h2 className="text-xl font-medium mb-2">献立数</h2>
            <Input
              onChange={changeNumberOfRecipe}
              type="number"
              min={1}
              max={5}
              value={formData.numberOfRecipe}
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
