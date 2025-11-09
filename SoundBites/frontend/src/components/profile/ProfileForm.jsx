import React from "react";
import { Input } from "../ui/Input";
import GenderField from "./GenderField";

export default function ProfileForm({ form, onChange, onGenderChange, onSave }) {
    // Get actual user data from localStorage
    let user = null;
    try {
        user = JSON.parse(localStorage.getItem("user"));
    } catch {}

    return (
        <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                    <label data-slot="label" htmlFor="fullname" className="flex items-center gap-2 text-sm leading-none font-medium select-none text-white/90">Full Name</label>
                    <Input
                        id="fullname"
                        name="fullName"
                        value={form.fullName}
                        onChange={onChange}
                        placeholder={user?.fullName || "No full name provided"}
                        className="bg-white/5 border-white/10 focus:border-white/30 focus:bg-white/10 placeholder:text-white/30 h-12"
                    />
                </div>
                <div className="space-y-2">
                    <GenderField gender={form.gender} onChange={onGenderChange} />
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                    <label data-slot="label" htmlFor="username" className="flex items-center gap-2 text-sm leading-none font-medium select-none text-white/90">Username</label>
                    <Input
                        id="username"
                        name="username"
                        value={form.username}
                        onChange={onChange}
                        placeholder={user?.username || "No username provided"}
                        className="bg-white/5 border-white/10 focus:border-white/30 focus:bg-white/10 h-12"
                    />
                </div>
                <div className="space-y-2">
                    <label data-slot="label" htmlFor="password" className="flex items-center gap-2 text-sm leading-none font-medium select-none text-white/90">Password</label>
                    <Input
                        id="password"
                        type="password"
                        name="password"
                        value={form.password}
                        onChange={onChange}
                        placeholder="********"
                        className="bg-white/5 border-white/10 focus:border-white/30 focus:bg-white/10 h-12"
                    />
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                    <label data-slot="label" htmlFor="email" className="flex items-center gap-2 text-sm leading-none font-medium select-none text-white/90">Email</label>
                    <Input
                        id="email"
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={onChange}
                        placeholder={user?.email || "No email provided"}
                        className="bg-white/5 border-white/10 focus:border-white/30 focus:bg-white/10 h-12"
                    />
                </div>
                <div className="space-y-2">
                    <label data-slot="label" htmlFor="phone" className="flex items-center gap-2 text-sm leading-none font-medium select-none text-white/90">Phone Number</label>
                    <Input
                        id="phone"
                        name="phone"
                        value={form.phone}
                        onChange={onChange}
                        placeholder="No phone number provided"
                        className="bg-white/5 border-white/10 focus:border-white/30 focus:bg-white/10 placeholder:text-white/30 h-12"
                    />
                </div>
            </div>
            <div className="space-y-2">
                <label data-slot="label" htmlFor="address" className="flex items-center gap-2 text-sm leading-none font-medium select-none text-white/90">Address</label>
                <textarea
                    id="address"
                    name="address"
                    value={form.address}
                    onChange={onChange}
                    placeholder="No address provided"
                    rows={3}
                    className="focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:bg-input/30 flex field-sizing-content min-h-16 w-full rounded-md border px-3 py-2 text-base outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 md:text-sm bg-white/5 border-white/10 focus:border-white/30 focus:bg-white/10 placeholder:text-white/30 resize-none transition-all"
                />
            </div>
            <div className="flex justify-end pt-4">
                <button
                    data-slot="button"
                    onClick={onSave}
                    className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive py-2 has-[>svg]:px-3 bg-white text-black hover:bg-white/90 px-8 h-12 shadow-lg shadow-white/20 transition-all"
                >
                    Save changes
                </button>
            </div>
        </div>
    );
}
