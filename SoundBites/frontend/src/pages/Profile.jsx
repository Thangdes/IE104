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
        alert("Image upload not implemented in demo");
    };

    const handleDeleteAccount = () => { };
    const handleLogout = () => { };

    const handleSave = () => {
        try {
            localStorage.setItem("userProfile", JSON.stringify(form));
            alert("Changes saved successfully (demo)");
        } catch (e) {
            console.error(e);
            alert("Save failed");
        }
    };

    return (
        <div className="flex justify-center items-center min-h-[640px] px-6 py-10">
            <div
                className="form-container bg-[#1e1e23]/80 rounded-xl p-10 shadow-lg w-full max-w-4xl"
            >
                <ActionButtons onDelete={handleDeleteAccount} onLogout={handleLogout} />

                <div className="mt-8">

                    {/* Form Section */}
                    <div className="bg-white/5 p-8 rounded-lg shadow-md">
                        <ProfileForm
                            form={form}
                            onChange={handleChange}
                            onGenderChange={handleGenderChange}
                        />

                        {/* Save Button */}
                        <div className="flex justify-end mt-10">
                            <button
                                onClick={handleSave}
                                className="bg-white text-[#1b1b1f] font-semibold text-lg leading-[22px] px-10 py-3 rounded-[12px] transition-all duration-300 hover:bg-[#626267] hover:text-[#FEFEFE] hover:scale-[1.05]"
                            >
                                Save changes
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Profile;
