import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export function RootPage() {
  return (
    <div className="flex flex-col items-center gap-9">
      <h1 className="mt-16">
        <img src="/logo.svg" alt="" className="w-96 text-center" />
      </h1>
      <p className="text-xl text-center">
        こちらのアプリは提示した条件から
        <br />
        今日の献立をAIが提案するアプリです
        <br />
        <span className="text-sm text-gray-400">
          ※ AIが生成しているので正しくない情報も含まれています
        </span>
      </p>
      <Link to={"/plan-recipe"}>
        <Button>今日の献立を決める</Button>
      </Link>
    </div>
  );
}
