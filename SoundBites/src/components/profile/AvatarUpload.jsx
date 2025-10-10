import React from "react";

export default function AvatarUpload({ imageUrl = "/name.png", onUpload }) {
  return (
    <div className="flex-shrink-0 flex flex-col items-center md:items-start w-full md:w-60">
      <img src={imageUrl} alt="avatar" className="w-28 h-28 rounded-full object-cover mb-4 border-4 border-white/10" />
      <button onClick={onUpload} className="px-4 py-2 bg-orange-200 text-orange-800 rounded">Tải ảnh lên</button>
    </div>
  );
}
