
import React from "react";

function QueueList({ queue, currentQueueIndex, onClose }) {
    return (
        <div className="fixed inset-0 z-50 pointer-events-none">
            {/* Click outside to close */}
            <div
                className="fixed inset-0 z-40"
                style={{ background: "transparent" }}
                onClick={onClose}
            />
            {/* Bottom-right floating panel */}
            <div
                className="fixed bottom-4 right-4 w-full max-w-md h-[75vh] bg-[#23232a] shadow-2xl p-4 overflow-y-auto pointer-events-auto border border-gray-800 rounded-xl z-50"
                onClick={e => e.stopPropagation()}
            >
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg font-bold text-white">Current queue ({queue.length})</h2>
                    <button onClick={onClose} className="text-gray-400 hover:text-white text-xl px-2">&times;</button>
                </div>
                {queue.length === 0 ? (
                    <div className="text-gray-400 text-center py-8">No songs in the queue.</div>
                ) : (
                    <ul>
                        {queue.map((song, idx) => (
                            <li
                                key={song.song_id || idx}
                                className={`flex items-center gap-3 px-2 py-2 rounded cursor-pointer transition ${idx === currentQueueIndex ? "bg-gray-700/60 text-white" : "hover:bg-gray-700/60"}`}
                            >
                                <img
                                    src={song.album?.cover_image || "https://i.scdn.co/image/ab67616d00004851d7812467811a7da6e6a44902"}
                                    alt="cover"
                                    className="w-10 h-10 rounded"
                                />
                                <div className="flex-1 min-w-0">
                                    <div className="truncate font-medium">{song.title}</div>
                                    <div className="truncate text-xs text-gray-400">{song.artist?.name}</div>
                                </div>
                                {idx === currentQueueIndex && (
                                    <i className="fa-solid fa-volume-high text-white ml-2"></i>
                                )}
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
}

export default QueueList;
