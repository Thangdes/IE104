import React from "react";

export default function ActionButtons({ onDelete, onLogout }) {
  return (
    <div className="flex items-center justify-between mb-6">
      <h1 className="text-3xl font-extrabold text-orange-400">Thông tin người dùng</h1>
      <div className="flex gap-4">
        <button onClick={onDelete} className="px-4 py-2 bg-orange-200 text-orange-800 rounded hover:opacity-90">Xóa tài khoản</button>
      </div>
    </div>
  );
}
