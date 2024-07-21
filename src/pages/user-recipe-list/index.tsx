import { RecipeCardList } from "@/components/custom/RecipeCardList";
import { db } from "@/lib/firebase";
import { AIRecipe } from "@/type/recipe";
import { query, where, collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";

export function UserRecipeList() {
  const params = useParams();
  const navigate = useNavigate();
  const [list, setList] = useState<AIRecipe[] | null>(null);

  useEffect(() => {
    (async () => {
      if (!params.uid) {
        navigate("/not-found");
        return;
      }
      try {
        const aiRecipesDoc = await collection(db, "aiRecipes");
        const q = query(aiRecipesDoc, where("uid", "==", params.uid));
        const filterAiRecipesDoc = await getDocs(q);

        const newList: AIRecipe[] = [];
        filterAiRecipesDoc.forEach((item) => {
          newList.push(item.data() as AIRecipe);
        });
        setList(newList);
      } catch {
        toast("エラーが発生しました");
      }
    })();
  }, [navigate, params.uid]);

  return <div className="p-8">{list && <RecipeCardList list={list} />}</div>;
}
