import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export function RootPage() {
  return (
    <div className="flex flex-col items-center gap-9">
      <h1>
        <img src="/logo.svg" alt="Logo" className="w-96 mx-auto" />
      </h1>
      <p className="text-xl text-center text-gray-800 px-4">
        こちらのアプリは提示した条件から
        <br />
        今日の献立をAIが提案するアプリです
        <br />
        <span className="text-sm text-gray-400">
          ※ AIが生成しているので正しくない情報も含まれています
        </span>
      </p>
      <Link to="/plan-recipe">
        <Button className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg shadow-lg transform transition hover:scale-105">
          今日の献立を決める
        </Button>
      </Link>
    </div>
  );
}
