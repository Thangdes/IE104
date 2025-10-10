import React, { useState } from "react";
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
  // handlers kept for future use
  const handleDeleteAccount = () => {};
  const handleLogout = () => {};

  const handleSave = () => {
    // For demo: save to localStorage
    try {
      localStorage.setItem("userProfile", JSON.stringify(form));
      alert("Lưu thay đổi thành công (demo)");
    } catch (e) {
      console.error(e);
      alert("Lưu thất bại");
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <ActionButtons onDelete={handleDeleteAccount} onLogout={handleLogout} />

      <div className="bg-white/5 p-6 rounded-lg shadow-md">
        <div className="flex flex-col gap-6">
          <ProfileForm form={form} onChange={handleChange} onGenderChange={handleGenderChange} />
          {/* Nút lưu thay đổi ở cuối */}
          <div className="flex justify-end mt-8">
            <button onClick={handleSave} className="px-6 py-2 font-bold" style={{backgroundColor: '#1DB954', color: 'white', borderRadius: '0.5rem'}}>
              Lưu thay đổi
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
