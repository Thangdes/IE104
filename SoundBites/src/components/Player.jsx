function Player() {
  return (
    <div className="bg-gray-800 p-4 flex items-center justify-between">
      <p className="text-sm">▶️ Player Component</p>
      <div className="flex gap-4">
        <button className="px-3 py-1 bg-blue-500 rounded hover:bg-blue-600">Prev</button>
        <button className="px-3 py-1 bg-green-500 rounded hover:bg-green-600">Play</button>
        <button className="px-3 py-1 bg-blue-500 rounded hover:bg-blue-600">Next</button>
      </div>
    </div>
  );
}

export default Player;
