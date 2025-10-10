import React from "react";
import { Input } from "../ui/Input";
import GenderField from "./GenderField";

export default function ProfileForm({ form, onChange, onGenderChange }) {
  return (
    <div className="flex-1">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm text-white mb-1 font-bold">Họ và tên</label>
          <Input name="fullName" value={form.fullName} onChange={onChange} placeholder="Nhập họ và tên" />
        </div>

        <GenderField gender={form.gender} onChange={onGenderChange} />

        <div>
          <label className="block text-sm text-white mb-1 font-bold">Tên đăng nhập</label>
          <Input name="username" value={form.username} onChange={onChange} placeholder="Nhập tên đăng nhập" />
        </div>

        <div>
          <label className="block text-sm text-white mb-1 font-bold">Mật khẩu</label>
          <Input type="password" name="password" value={form.password} onChange={onChange} placeholder="Nhập mật khẩu" />
        </div>

        <div>
          <label className="block text-sm text-white mb-1 font-bold">Email</label>
          <Input name="email" value={form.email} onChange={onChange} placeholder="Nhập email" />
        </div>

        <div>
          <label className="block text-sm text-white mb-1 font-bold">Số điện thoại</label>
          <Input name="phone" value={form.phone} onChange={onChange} placeholder="Nhập số điện thoại" />
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm text-white mb-1 font-bold">Địa chỉ</label>
          <textarea
            name="address"
            value={form.address}
            onChange={onChange}
            placeholder="Nhập địa chỉ"
            className="w-full bg-gray-900 border border-gray-700 rounded px-3 py-2 text-white placeholder-gray-400"
          />
        </div>
      </div>
    </div>
  );
}
