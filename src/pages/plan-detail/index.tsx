import { db } from "@/lib/firebase";
import { AIRecipe } from "@/type/recipe";
import { getDoc, doc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import { ConditionsCard } from "./components/ConditionsCard";
import { RecipeList } from "./components/RecipeList";

export function PlanDetailPage() {
  const params = useParams();
  const [aiRecipe, setAIRecipe] = useState<AIRecipe | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      if (!params.id) {
        navigate("/not-found");
        return;
      }

      try {
        const aiRecipeDoc = await getDoc(doc(db, "aiRecipes", params.id));
        if (!aiRecipeDoc.exists()) {
          navigate("/not-found");
          return;
        }

        const data = aiRecipeDoc.data();
        setAIRecipe(data as AIRecipe);
      } catch {
        toast("エラーが発生しました");
      }
    })();
  }, [navigate, params.id]);

  return (
    <div className="p-5 sm:p-10 ">
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
