import { db } from "@/lib/firebase";
import { AIRecipe } from "@/type/recipe";
import { collection, query, where, getDocs } from "firebase/firestore";
import useSWR from "swr";

const fetcher = async (uid: string) => {
  const aiRecipesDoc = await collection(db, "aiRecipes");
  const q = query(aiRecipesDoc, where("uid", "==", uid));
  const filterAiRecipesDoc = await getDocs(q);
  const data = filterAiRecipesDoc.docs.map((item) => item.data() as AIRecipe);
  return data;
};

const key = (uid: string) => `user/${uid}/recipe-list`;

export const useGetRecipeList = (uid?: string) => {
  const { data } = useSWR<AIRecipe[] | null>(uid ? key(uid) : null, () => {
    if (!uid) {
      return null;
    }
    return fetcher(uid);
  });
  return data;
};
