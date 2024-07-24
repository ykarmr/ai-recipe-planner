import { useParams } from "react-router-dom";
import { RecipeCardList } from "./components/RecipeCardList";
import { useGetRecipeList } from "./hooks/useGetRecipeList";

export function UserRecipeListPage() {
  const params = useParams();
  const list = useGetRecipeList(params.uid);

  return (
    <div className="w-full p-4 sm:p-8">
      {list && <RecipeCardList list={list} />}
    </div>
  );
}
