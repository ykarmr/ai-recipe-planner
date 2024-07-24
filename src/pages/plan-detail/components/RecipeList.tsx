import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Recipe } from "@/type/recipe";
import { Fragment } from "react/jsx-runtime";

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
            <h3 className="text-2xl font-bold mb-2">{recipe.name}</h3>
            <p className="text-base font-medium">
              {recipe.price} - {recipe.time}
            </p>
          </CardHeader>
          <CardContent className="p-4">
            <div className="space-y-4">
              <div>
                <p className="text-base font-semibold mb-1">
                  この料理にかかるお金:
                </p>
                <p className="text-lg text-gray-800">{recipe.price}</p>
              </div>
              <div>
                <p className="text-base font-semibold mb-1">
                  この料理の調理時間:
                </p>
                <p className="text-lg text-gray-800">{recipe.time}</p>
              </div>
              <div>
                <p className="text-base font-semibold mb-1">
                  この料理に必要な食材:
                </p>
                <ul className="list-disc list-inside space-y-1 pl-5 text-gray-700">
                  {recipe.ingredients.map((item) => (
                    <li key={item.name} className="text-base">
                      {item.name} {item.quantity} ({item.price})
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="text-base font-semibold mb-2">調理方法:</p>
                {recipe.steps.map((step) => (
                  <div key={step.group} className="mb-4">
                    <p className="font-semibold text-lg mb-2">{step.group}</p>
                    <ul className="list-decimal list-inside space-y-3 pl-5">
                      {step.details.map((detail) => (
                        <Fragment key={`${step.group}-${detail.detail}`}>
                          <li className="flex flex-col bg-gray-50 p-4 rounded-lg shadow-sm border border-gray-300">
                            <p className="font-medium text-gray-800">
                              {detail.detail}
                            </p>
                            {detail.temperature && (
                              <p className="text-sm text-gray-600 mb-1">
                                {detail.temperature}
                              </p>
                            )}
                            {detail.important_points && (
                              <p className="text-sm text-gray-600 mb-1">
                                {detail.important_points}
                              </p>
                            )}
                            <span className="text-sm text-gray-500">
                              {detail.time}
                            </span>
                          </li>
                        </Fragment>
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
