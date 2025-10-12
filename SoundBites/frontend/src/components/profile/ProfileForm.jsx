import React from "react";
import { Input } from "../ui/Input";
import GenderField from "./GenderField";

export default function ProfileForm({ form, onChange, onGenderChange }) {
    return (
        <div className="flex-1">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label className="block text-lg text-white mb-1 font-bold">Họ và tên</label>
                    <Input
                        name="fullName"
                        value={form.fullName}
                        onChange={onChange}
                        placeholder="Wade Warren"
                    />
                </div>

                <GenderField gender={form.gender} onChange={onGenderChange} />

                <div>
                    <label className="block text-lg text-white mb-1 font-bold">Tên đăng nhập</label>
                    <Input
                        name="username"
                        value={form.username}
                        onChange={onChange}
                        placeholder="WadeWarren1235"
                    />
                </div>

                <div>
                    <label className="block text-lg text-white mb-1 font-bold">Mật khẩu</label>
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
                        placeholder="WWWadeWarren@gmail.com"
                    />
                </div>

                <div>
                    <label className="block text-lg text-white mb-1 font-bold">Số điện thoại</label>
                    <Input
                        name="phone"
                        value={form.phone}
                        onChange={onChange}
                        placeholder="0944512356"
                    />
                </div>

                <div className="md:col-span-2">
                    <label className="block text-lg text-white mb-1 font-bold">Địa chỉ</label>
                    <textarea
                        name="address"
                        value={form.address}
                        onChange={onChange}
                        placeholder="Nhập địa chỉ"
                        className="w-full border border-gray-700 rounded px-6 py-3 text-[16px] text-white placeholder-gray-400 leading-snug transition-colors duration-300 hover:border-[#FFFFFF] focus:border-[#FFFFFF] focus:outline-none"
                    />
                </div>
            </div>
        </div>
    );
}
