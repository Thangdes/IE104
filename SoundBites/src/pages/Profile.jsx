import React, { useState } from "react";
import AvatarUpload from "../components/profile/AvatarUpload";
import ProfileForm from "../components/profile/ProfileForm";
import ActionButtons from "../components/profile/ActionButtons";

function Profile() {
  const [form, setForm] = useState({
    fullName: "",
    username: "",
    email: "",
    phone: "",
    address: "",
    gender: "male",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleGenderChange = (value) => {
    if (value) setForm((prev) => ({ ...prev, gender: value }));
  };

  const handleUpload = () => {
    alert("Tải ảnh lên chưa được triển khai trong demo");
  };

  const handleDeleteAccount = () => {
    alert("Xóa tài khoản chưa được triển khai");
  };

  const handleLogout = () => {
    alert("Đăng xuất (demo)");
  };

  return (
    <div className="max-w-4xl mx-auto">
      <ActionButtons onDelete={handleDeleteAccount} onLogout={handleLogout} />

      <div className="bg-white/5 p-6 rounded-lg shadow-md">
        <div className="flex flex-col md:flex-row gap-6">
          <AvatarUpload onUpload={handleUpload} />
          <ProfileForm form={form} onChange={handleChange} onGenderChange={handleGenderChange} />
        </div>
        <div className="mt-6 flex justify-center md:justify-start">
          <button onClick={handleLogout} className="px-6 py-2 bg-orange-200 text-orange-800 rounded font-semibold">Đăng xuất</button>
        </div>
      </div>
    </div>
  );
}

export default Profile;
