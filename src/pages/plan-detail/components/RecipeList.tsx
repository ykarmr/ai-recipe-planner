import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Recipe } from "@/type/recipe";

type Props = {
  recipes: Recipe[];
};

export function RecipeList({ recipes }: Props) {
  return (
    <div className="grid gap-8 grid-cols-1">
      {recipes.map((recipe) => (
        <Card
          key={recipe.name}
          className="bg-white rounded-lg shadow-lg sm:transition-transform sm:transform sm:hover:scale-105"
        >
          <CardHeader className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white p-4 rounded-t-lg">
            <h3 className="text-2xl font-medium">{recipe.name}</h3>
          </CardHeader>
          <CardContent className="p-6">
            <div className="mb-4">
              <p className="text-lg font-semibold">この料理にかかるお金:</p>
              <p className="text-lg">{recipe.price}</p>
            </div>
            <div className="mb-4">
              <p className="text-lg font-semibold">この料理の調理時間:</p>
              <p className="text-lg">{recipe.time}</p>
            </div>
            <div className="mb-4">
              <p className="text-lg font-semibold">この料理に必要な食材:</p>
              <ul className="mt-2 list-disc list-inside space-y-1">
                {recipe.ingredients.map((item) => (
                  <li key={item.name}>
                    {item.name} {item.quantity} ({item.price})
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-lg font-semibold mb-2">調理方法:</p>
              {recipe.steps.map((step) => (
                <div key={step.group} className="mb-4">
                  <p className="font-semibold">{step.group}</p>
                  <ul className="list-decimal list-inside mt-2 space-y-1 pl-4">
                    {step.details.map((detail) => (
                      <li key={detail.detail}>
                        {detail.detail} ({detail.time})
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
