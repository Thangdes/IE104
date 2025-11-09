import React, { useState } from "react";
import ProfileForm from "../components/profile/ProfileForm";
import ActionButtons from "../components/profile/ActionButtons";
import { updateUserProfile, fetchUserProfile, uploadUserAvatar } from "../services/api";
import Avatar from "../components/profile/Avatar";

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
    const [avatarUrl, setAvatarUrl] = useState("");
    const [uploadingAvatar, setUploadingAvatar] = useState(false);
    const [pendingAvatarFile, setPendingAvatarFile] = useState(null);

    // Load profile from backend + extras from localStorage
    React.useEffect(() => {
        const user = JSON.parse(localStorage.getItem("user") || "{}");
        const token = localStorage.getItem("token");
        if (!user || !user.id) return;

        const loadProfile = async () => {
            try {
                const data = await fetchUserProfile(user.id, token);
                if (data && (data.username || data.email)) {
                    setForm((prev) => ({
                        ...prev,
                        username: data.username || "",
                        email: data.email || "",
                    }));
                    if (data.avatar_url) setAvatarUrl(data.avatar_url);
                }
            } catch (e) { console.warn('fetchUserProfile failed', e); }
            // Load extra fields from localStorage
            try {
                const extras = JSON.parse(localStorage.getItem(`userProfileExtras_${user.id}`) || "{}");
                setForm((prev) => ({
                    ...prev,
                    fullName: extras.fullName || prev.fullName,
                    phone: extras.phone || prev.phone,
                    address: extras.address || prev.address,
                    gender: extras.gender || prev.gender,
                }));
            } catch { /* ignore extras parse error */ }
        };
        loadProfile();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleGenderChange = (value) => {
        if (value) setForm((prev) => ({ ...prev, gender: value }));
    };

    // Deprecated: legacy avatar upload handler removed (no longer used)

    const handleDeleteAccount = () => { };
    const handleLogout = () => { };

    const handleSave = async () => {
        try {
            const user = JSON.parse(localStorage.getItem("user"));
            const token = localStorage.getItem("token");
            if (!user || !user.id) {
                alert("Không tìm thấy thông tin người dùng");
                return;
            }

            // If there is a pending avatar file or the current preview is a blob URL, upload avatar first
            if (pendingAvatarFile || (avatarUrl && avatarUrl.startsWith('blob:'))) {
                try {
                    setUploadingAvatar(true);
                    const upRes = await uploadUserAvatar(user.id, pendingAvatarFile, token);
                    if (upRes && upRes.success && upRes.url) {
                        setAvatarUrl(upRes.url);
                        setPendingAvatarFile(null);
                        try {
                            const u = JSON.parse(localStorage.getItem("user") || "{}");
                            u.avatar_url = upRes.url;
                            localStorage.setItem("user", JSON.stringify(u));
                        } catch { /* ignore localStorage error */ }
                    } else if (pendingAvatarFile) {
                        alert("Tải ảnh thất bại trước khi lưu. Vui lòng thử lại.");
                        setUploadingAvatar(false);
                        return;
                    }
                } finally {
                    setUploadingAvatar(false);
                }
            }
            const payload = {
                username: form.username,
                email: form.email,
                ...(form.password ? { password: form.password } : {})
            };
            const res = await updateUserProfile(user.id, payload, token);
            if (res && res.success) {
                // Lưu extras local cho các trường chưa có trong DB
                const extras = {
                    fullName: form.fullName,
                    phone: form.phone,
                    address: form.address,
                    gender: form.gender,
                };
                localStorage.setItem(`userProfileExtras_${user.id}`, JSON.stringify(extras));

                // Fetch lại profile để cập nhật avatar_url mới nhất
                try {
                    const fresh = await fetchUserProfile(user.id, token);
                    if (fresh && fresh.avatar_url) {
                        setAvatarUrl(fresh.avatar_url);
                        // Update user object in localStorage
                        const u = JSON.parse(localStorage.getItem("user") || "{}");
                        u.avatar_url = fresh.avatar_url;
                        localStorage.setItem("user", JSON.stringify(u));
                    }
                } catch { void 0; }

                alert("Lưu thay đổi thành công");
            } else {
                alert("Lưu thất bại: " + (res?.error || ""));
            }
        } catch (e) {
            console.error(e);
            alert("Save failed");
        }
    };

    // Upload avatar file
    const handleAvatarFile = async (file) => {
        try {
            setUploadingAvatar(true);
            // show local preview immediately
            try {
                const preview = URL.createObjectURL(file);
                setAvatarUrl(preview);
            } catch { /* ignore preview errors */ }
            setPendingAvatarFile(file);
            const user = JSON.parse(localStorage.getItem("user"));
            const token = localStorage.getItem("token");
            if (!user || !user.id) {
                alert("Không tìm thấy thông tin người dùng");
                setUploadingAvatar(false);
                return;
            }
            const res = await uploadUserAvatar(user.id, file, token);
            if (res && res.success && res.url) {
                setAvatarUrl(res.url);
                setPendingAvatarFile(null);
                // Update user object in localStorage for future loads
                try {
                    const u = JSON.parse(localStorage.getItem("user") || "{}");
                    u.avatar_url = res.url;
                    localStorage.setItem("user", JSON.stringify(u));
                } catch { void 0; }
            } else {
                let msg = "Tải ảnh thất bại!";
                if (res?.error) msg += "\n" + res.error;
                if (res?.message) msg += "\n" + res.message;
                alert(msg);
            }
        } catch (e) {
            console.error(e);
            alert("Tải ảnh thất bại");
        } finally {
            setUploadingAvatar(false);
        }
    };

    return (
        <div className="flex justify-center items-center min-h-[640px] px-6 py-10">
            <div className="w-full max-w-4xl">
                <ActionButtons onDelete={handleDeleteAccount} onLogout={handleLogout} />
                <div className="bg-gradient-to-br from-white/5 to-white/0 rounded-2xl border border-white/10 p-8 backdrop-blur-sm">
                    <div className="flex flex-col items-center mb-10">
                        <Avatar imageUrl={avatarUrl || "/name.png"} onSelectFile={handleAvatarFile} loading={uploadingAvatar} />
                    </div>
                    <ProfileForm
                        form={form}
                        onChange={handleChange}
                        onGenderChange={handleGenderChange}
                        onSave={handleSave}
                    />
                </div>
            </div>
        </div>
    );
}

export default Profile;
