import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export function RootPage() {
  return (
    <div className="flex flex-col items-center gap-9">
      <h1>
        <img
          src="/logo.svg"
          alt="Logo"
          className="mx-auto w-96"
          width="384"
          height="96"
        />
      </h1>
      <p className="px-4 text-center text-xl text-gray-800">
        こちらのアプリは提示した条件から
        <br />
        今日の献立をAIが提案するアプリです
        <br />
        <span className="text-sm text-gray-400">
          ※ AIが生成しているので正しくない情報も含まれています
        </span>
      </p>
      <Link to="/plan-recipe">
        <Button className="transform rounded-lg bg-blue-500 px-4 py-2 text-white shadow-lg transition hover:scale-105 hover:bg-blue-600">
          今日の献立を決める
        </Button>
      </Link>
    </div>
  );
}
