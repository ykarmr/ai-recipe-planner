import { db } from "@/lib/firebase";
import { AIRecipe } from "@/type/recipe";
import { getDoc, doc } from "firebase/firestore";
import useSWR from "swr";

const fetcher = async (aiRecipeId: string) => {
  const aiRecipeDoc = await getDoc(doc(db, "aiRecipes", aiRecipeId));
  const data = aiRecipeDoc.data() as AIRecipe;
  return data;
};

const key = (aiRecipeId: string) => `aiRecipe/${aiRecipeId}/plan-detail`;

export const useGetPlanDetail = (aiRecipeId?: string) => {
  const { data } = useSWR<AIRecipe | null>(
    aiRecipeId ? key(aiRecipeId) : null,
    () => {
      if (!aiRecipeId) {
        return null;
      }
      return fetcher(aiRecipeId);
    }
  );
  return data;
};
