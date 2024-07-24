import { useParams } from "react-router-dom";
import { ConditionsCard } from "./components/ConditionsCard";
import { RecipeList } from "./components/RecipeList";
import { useGetPlanDetail } from "./hooks/useGetPlanDetail";

export function PlanDetailPage() {
  const params = useParams();
  const aiRecipe = useGetPlanDetail(params.id);

  return (
    <div className="w-full p-5 sm:p-10">
      {aiRecipe && (
        <div className="space-y-8">
          <ConditionsCard
            conditions={aiRecipe.conditions}
            createdAt={aiRecipe.createdAt}
          />
          <RecipeList recipes={aiRecipe.recipe} />
        </div>
      )}
    </div>
  );
}
