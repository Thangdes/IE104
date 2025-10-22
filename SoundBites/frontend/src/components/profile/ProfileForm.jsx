import React from "react";
import { Input } from "../ui/Input";
import GenderField from "./GenderField";

export default function ProfileForm({ form, onChange, onGenderChange }) {
    // Get actual user data from localStorage
    let user = null;
    try {
        user = JSON.parse(localStorage.getItem("user"));
    } catch {}

    return (
        <div className="flex-1">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label className="block text-lg text-white mb-1 font-bold">Full Name</label>
                    <Input
                        name="fullName"
                        value={form.fullName}
                        onChange={onChange}
                        placeholder={user?.fullName || "No full name provided"}
                    />
                </div>

                <GenderField gender={form.gender} onChange={onGenderChange} />

                <div>
                    <label className="block text-lg text-white mb-1 font-bold">Username</label>
                    <Input
                        name="username"
                        value={form.username}
                        onChange={onChange}
                        placeholder={user?.username || "No username provided"}
                    />
                </div>

                <div>
                    <label className="block text-lg text-white mb-1 font-bold">Password</label>
                    <Input
                        type="password"
                        name="password"
                        value={form.password}
                        onChange={onChange}
                        placeholder="********"
                    />
                </div>

                <div>
                    <label className="block text-lg text-white mb-1 font-bold">Email</label>
                    <Input
                        name="email"
                        value={form.email}
                        onChange={onChange}
                        placeholder={user?.email || "No email provided"}
                    />
                </div>

                <div>
                    <label className="block text-lg text-white mb-1 font-bold">Phone Number</label>
                    <Input
                        name="phone"
                        value={form.phone}
                        onChange={onChange}
                        placeholder="No phone number provided"
                    />
                </div>

                <div className="md:col-span-2">
                    <label className="block text-lg text-white mb-1 font-bold">Address</label>
                    <textarea
                        name="address"
                        value={form.address}
                        onChange={onChange}
                        placeholder="No address provided"
                        className="w-full border border-gray-700 rounded px-6 py-3 text-[16px] text-white placeholder-gray-400 leading-snug transition-colors duration-300 hover:border-[#FFFFFF] focus:border-[#FFFFFF] focus:outline-none"
                    />
                </div>
            </div>
        </div>
    );
}
