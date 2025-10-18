import React from "react";

const albums = [
  {
    id: 1,
    name: "Chill Vibes",
    artist: "Various Artists",
    cover: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=400&q=80",
    description: "Những bản nhạc chill thư giãn cho ngày dài."
  },
  {
    id: 2,
    name: "Top Hits 2025",
    artist: "Various Artists",
    cover: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80",
    description: "Tổng hợp các hit nổi bật năm 2025."
  },
  {
    id: 3,
    name: "Indie Love",
    artist: "Indie Band",
    cover: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80",
    description: "Nhạc indie nhẹ nhàng, sâu lắng."
  }
];

export default function Album() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-800 to-black text-white p-8">
      <h1 className="text-4xl font-bold mb-8">Albums</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {albums.map(album => (
          <div key={album.id} className="bg-gray-900 rounded-lg shadow-lg p-6 flex flex-col items-center">
            <img src={album.cover} alt={album.name} className="w-40 h-40 object-cover rounded mb-4" />
            <h2 className="text-2xl font-semibold mb-2">{album.name}</h2>
            <div className="text-gray-400 mb-2">{album.artist}</div>
            <p className="text-gray-300 text-center mb-4">{album.description}</p>
            <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-full">Xem chi tiết</button>
          </div>
        ))}
      </div>
    </div>
  );
}
