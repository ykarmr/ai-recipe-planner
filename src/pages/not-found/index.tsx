import { Link } from "react-router-dom";

export function NotFoundPage() {
  return (
    <div className="rounded-lg bg-white p-8 text-center shadow-lg">
      <h1 className="mb-4 text-3xl font-bold text-gray-800">404 - Not Found</h1>
      <p className="text-lg text-gray-700">こちらのページは存在しないです</p>
      <div className="mt-6">
        <Link to="/" className="text-blue-500 hover:underline">
          ホームに戻る
        </Link>
      </div>
    </div>
  );
}
