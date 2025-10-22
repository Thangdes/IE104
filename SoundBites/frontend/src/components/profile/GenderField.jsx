import React from "react";
import Checkbox from "../ui/Checkbox";

export default function GenderField({ gender, onChange }) {
    return (
        <div>
            <label className="block text-lg text-white mb-2 font-bold">Gender</label>
            <div className="flex items-center gap-6 text-white">
                <label className="flex items-center gap-2 text-white ">
                    <Checkbox checked={gender === "male"} onChange={(v) => v && onChange("male")} />
                    <span className="text-lg text-white mt-2 mb-1 font-semibold leading-none">Male</span>
                </label>
                <label className="flex items-center gap-2 text-white ">
                    <Checkbox checked={gender === "female"} onChange={(v) => v && onChange("female")} />
                    <span className="font text-lg text-white mt-2 mb-1 font-bold">Female</span>
                </label>
            </div>
        </div>
    );
}
