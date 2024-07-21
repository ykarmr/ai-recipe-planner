import SelectList, { SelectListItem } from "@/components/custom/SelectList";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { db } from "@/lib/firebase";
import { recipeSchema } from "@/utils/aiSchema";
import { generateFromGemini } from "@/utils/gemeini";
import { setDoc, doc } from "firebase/firestore";
import { Loader2 } from "lucide-react";
import { ChangeEvent, useState } from "react";
import { v4 as uuid } from "uuid";
import { useNavigate } from "react-router-dom";
import { AIRecipe, Recipe } from "@/type/recipe";
import { toast } from "sonner";
import { useAuthContext } from "@/components/provider/AuthContextProvider";

const mealTimings: SelectListItem[] = [
  { id: 1, title: "朝食", desc: "一日の始まりを迎えるための食事" },
  { id: 2, title: "昼食", desc: "午後の活動のためのエネルギーを補給" },
  { id: 3, title: "夕食", desc: "一日の終わりにリラックスする食事" },
  { id: 4, title: "おやつ", desc: "ちょっとした間食やティータイム" },
];

const cuisineGenres: SelectListItem[] = [
  { id: 1, title: "和食", desc: "日本の伝統的な料理" },
  { id: 2, title: "洋食", desc: "西洋風の料理" },
  { id: 3, title: "中華", desc: "中国の伝統的な料理" },
  { id: 4, title: "エスニック", desc: "異国情緒あふれる料理" },
  { id: 5, title: "イタリアン", desc: "イタリアン料理" },
  { id: 6, title: "スパニッシュ", desc: "スペイン料理" },
];

const cookingThemes: SelectListItem[] = [
  { id: 1, title: "ヘルシー", desc: "健康志向の料理" },
  { id: 2, title: "時短", desc: "短時間で作れる料理" },
  { id: 3, title: "贅沢", desc: "豪華で特別な料理" },
  { id: 4, title: "シンプル", desc: "簡単で基本的な料理" },
  { id: 5, title: "珍しい", desc: "珍しい料理" },
  { id: 6, title: "パーティー", desc: "パーティー料理" },
];

const cookingDifficulties: SelectListItem[] = [
  { id: 1, title: "簡単", desc: "初心者向けの料理" },
  { id: 2, title: "普通", desc: "一般的な難易度の料理" },
  { id: 3, title: "難しい", desc: "経験者向けの料理" },
  { id: 4, title: "プロ", desc: "プロフェッショナル向けの料理" },
];

export function PlanRecipe() {
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
