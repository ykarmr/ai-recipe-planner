import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Conditions } from "@/type/recipe";

type Props = {
  conditions: Conditions;
  createdAt: string;
};
export function ConditionsCard({ conditions, createdAt }: Props) {
  return (
    <Card className="bg-white p-6 rounded-lg shadow-md">
      <CardHeader>
        <p className="text-lg font-semibold">
          こちらのレシピの生成条件は以下です
        </p>
      </CardHeader>

      <CardContent className="space-y-2">
        {conditions.mealTiming && (
          <p>食事タイミング: {conditions.mealTiming}</p>
        )}
        {conditions.cuisineGenre && (
          <p>料理ジャンル: {conditions.cuisineGenre}</p>
        )}
        {conditions.cookingThemes && (
          <p>料理テーマ: {conditions.cookingThemes}</p>
        )}
        {conditions.cookingDifficulties && (
          <p>料理難易度: {conditions.cookingDifficulties}</p>
        )}
        <p>レシピの作成日: {new Date(createdAt).toLocaleString()}</p>
      </CardContent>
    </Card>
  );
}
