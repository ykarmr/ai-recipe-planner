import { Link } from "react-router-dom";

export function NotFoundPage() {
  return (
    <div className="bg-white p-8 rounded-lg shadow-lg text-center">
      <h1 className="text-3xl font-bold text-gray-800 mb-4">404 - Not Found</h1>
      <p className="text-lg text-gray-700">こちらのページは存在しないです</p>
      <div className="mt-6">
        <Link to="/" className="text-blue-500 hover:underline">
          ホームに戻る
        </Link>
      </div>
    </div>
  );
}
