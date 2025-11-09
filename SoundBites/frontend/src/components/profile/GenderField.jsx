import React from "react";
import Checkbox from "../ui/Checkbox";

export default function GenderField({ gender, onChange }) {
    return (
        <div className="space-y-2">
            <label data-slot="label" className="flex items-center gap-2 text-sm leading-none font-medium select-none text-white/90">Gender</label>
            <div role="radiogroup" aria-required="false" dir="ltr" data-slot="radio-group" className="flex gap-6 h-12 items-center" tabIndex={0} style={{ outline: 'none' }}>
                <div className="flex items-center space-x-2">
                    <button
                        type="button"
                        role="radio"
                        aria-checked={gender === "male"}
                        data-state={gender === "male" ? "checked" : "unchecked"}
                        value="male"
                        data-slot="radio-group-item"
                        className={
                            `text-primary focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:bg-input/30 aspect-square size-4 shrink-0 rounded-full border shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 border-white/20 ` +
                            (gender === "male" ? "ring-2 ring-white/80" : "")
                        }
                        id="male"
                        tabIndex={-1}
                        onClick={() => onChange("male")}
                    >
                        {gender === "male" && (
                            <span data-state="checked" data-slot="radio-group-indicator" className="relative flex items-center justify-center">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" stroke="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-circle fill-primary absolute top-1/2 left-1/2 size-2 -translate-x-1/2 -translate-y-1/2"><circle cx="12" cy="12" r="10"></circle></svg>
                            </span>
                        )}
                    </button>
                    <label data-slot="label" htmlFor="male" className="flex items-center gap-2 text-sm leading-none font-medium select-none text-white/70 cursor-pointer">Male</label>
                </div>
                <div className="flex items-center space-x-2">
                    <button
                        type="button"
                        role="radio"
                        aria-checked={gender === "female"}
                        data-state={gender === "female" ? "checked" : "unchecked"}
                        value="female"
                        data-slot="radio-group-item"
                        className={
                            `text-primary focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:bg-input/30 aspect-square size-4 shrink-0 rounded-full border shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 border-white/20 ` +
                            (gender === "female" ? "ring-2 ring-white/80" : "")
                        }
                        id="female"
                        tabIndex={-1}
                        onClick={() => onChange("female")}
                    >
                        {gender === "female" && (
                            <span data-state="checked" data-slot="radio-group-indicator" className="relative flex items-center justify-center">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" stroke="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-circle fill-primary absolute top-1/2 left-1/2 size-2 -translate-x-1/2 -translate-y-1/2"><circle cx="12" cy="12" r="10"></circle></svg>
                            </span>
                        )}
                    </button>
                    <label data-slot="label" htmlFor="female" className="flex items-center gap-2 text-sm leading-none font-medium select-none text-white/70 cursor-pointer">Female</label>
                </div>
            </div>
        </div>
    );
}
