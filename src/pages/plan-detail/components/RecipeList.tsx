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
          <CardContent className="p-4">
            <p className="mb-2 text-lg">この料理にかかるお金: {recipe.price}</p>
            <p className="mb-2 text-lg">この料理の調理時間: {recipe.time}</p>
            <p className="mb-2 text-lg">この料理に必要な食材:</p>
            <ul className="mt-4 list-disc list-inside space-y-1">
              {recipe.ingredients.map((item) => {
                return (
                  <li key={item.name}>
                    {item.name} {item.quantity} ({item.price})
                  </li>
                );
              })}
            </ul>

            <div className="mt-4">
              <p className="mb-2 text-lg">調理方法:</p>
              <ul className="list-decimal list-inside mt-2 space-y-1">
                {recipe.steps.map((item, index) => (
                  <li key={index}>
                    {item.detail} ({item.time})
                  </li>
                ))}
              </ul>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
