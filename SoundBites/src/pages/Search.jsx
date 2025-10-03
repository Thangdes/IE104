function Search() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">🔎 Search</h1>
      <input
        type="text"
        placeholder="Tìm kiếm bài hát..."
        className="w-full px-4 py-2 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
}
export default Search;
