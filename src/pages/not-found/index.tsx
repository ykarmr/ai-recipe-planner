export function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg sm:px-10 md:px-32 lg:px-56 xl:px-72 text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          404 - Not Found
        </h1>
        <p className="text-lg text-gray-700">こちらのページは存在しないです</p>
        <div className="mt-6">
          <a href="/" className="text-blue-500 hover:underline">
            ホームに戻る
          </a>
        </div>
      </div>
    </div>
  );
}
