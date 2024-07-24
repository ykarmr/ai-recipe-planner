import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Recipe } from "@/type/recipe";

type Props = {
  recipes: Recipe[];
};

export function RecipeList({ recipes }: Props) {
  return (
    <div className="grid grid-cols-1 gap-8">
      {recipes.map((recipe) => (
        <Card
          key={recipe.name}
          className="rounded-lg bg-white shadow-lg sm:transform sm:transition-transform sm:hover:scale-105"
        >
          <CardHeader className="rounded-t-lg bg-gradient-to-r from-blue-500 to-indigo-600 p-4 text-white">
            <h3 className="mb-2 text-2xl font-bold">{recipe.name}</h3>
            <p className="text-base font-medium">
              {recipe.total_price} - {recipe.total_time}
            </p>
          </CardHeader>
          <CardContent className="p-4">
            <div className="space-y-4">
              <div>
                <p className="mb-1 text-base font-semibold">
                  この料理に必要な食材:
                </p>
                <ul className="list-inside list-none space-y-1">
                  {recipe.ingredients.map((item) => (
                    <li
                      key={item.name}
                      className="rounded-lg border border-gray-300 bg-gray-50 p-4 pl-5 shadow-sm"
                    >
                      <p className="text-lg font-semibold">{item.name}</p>
                      <p className="mt-1 text-sm text-gray-600">
                        ※ {item.quantity} ({item.price})
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="mb-2 text-base font-semibold">調理方法:</p>
                {recipe.steps.map((step) => (
                  <div key={step.group} className="mb-4">
                    <p className="mb-2 text-lg font-semibold">{step.group}</p>
                    <ul className="list-inside list-none space-y-3 pl-5">
                      {step.details.map((detail) => (
                        <li
                          key={`${step.group}-${detail.detail}`}
                          className="list-none rounded-lg border border-gray-300 bg-gray-50 p-4 shadow-sm"
                        >
                          <p className="mt-1 font-medium text-gray-800">
                            {detail.detail}
                          </p>
                          {detail.temperature && (
                            <p className="mt-1 text-sm text-gray-600">
                              ※ {detail.temperature}
                            </p>
                          )}
                          {detail.important_points && (
                            <p className="mt-1 text-sm text-gray-600">
                              ※ {detail.important_points}
                            </p>
                          )}
                          <span className="mt-1 text-sm text-gray-500">
                            ({detail.time})
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
