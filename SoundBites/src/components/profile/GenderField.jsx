import React from "react";
import Checkbox from "../ui/Checkbox";

export default function GenderField({ gender, onChange }) {
  return (
    <div>
  <label className="block text-sm text-white mb-1 font-bold">Giới tính</label>
      <div className="flex items-center gap-6 text-white">
        <label className="flex items-center gap-2 text-white ">
          <Checkbox checked={gender === "male"} onChange={(v) => v && onChange("male")} />
          <span className="font">Nam</span>
        </label>
        <label className="flex items-center gap-2 text-white ">
          <Checkbox checked={gender === "female"} onChange={(v) => v && onChange("female")} />
          <span className="font">Nữ</span>
        </label>
      </div>
    </div>
  );
}
