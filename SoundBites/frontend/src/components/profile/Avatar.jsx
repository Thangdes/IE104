import React, { useRef } from "react";

export default function Avatar({ imageUrl = "/name.png", onSelectFile, loading = false }) {
  const inputRef = useRef(null);
  const openPicker = (e) => {
    e.preventDefault();
    if (!loading) inputRef.current?.click();
  };
  const onChange = (e) => {
    const file = e.target.files?.[0];
    if (file && onSelectFile) onSelectFile(file);
  };
  return (
    <div className="flex-shrink-0 flex flex-col items-center md:items-start w-full md:w-60">
      <img src={imageUrl} alt="avatar" className="w-28 h-28 rounded-full object-cover mb-4 border-4 border-gray-700" />
      <button
        onClick={openPicker}
        disabled={loading}
        aria-busy={loading}
        className={`inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-400/40 border ${
          loading
            ? 'bg-gray-700 text-gray-300 border-gray-700 cursor-not-allowed'
            : 'bg-gray-800 hover:bg-gray-700 text-gray-100 border-gray-700'
        }`}
      >
        {loading ? 'Đang tải...' : 'Tải ảnh lên'}
      </button>
      <input ref={inputRef} type="file" accept="image/*" className="hidden" onChange={onChange} />
    </div>
  );
}
