import React, { useRef } from "react";

export default function Avatar({ imageUrl = "/name.png", onSelectFile, loading = false }) {
  const inputRef = useRef(null);
  const openPicker = (e) => {
    e.preventDefault();
    if (!loading) inputRef.current?.click();
  };
  const onChange = (e) => {
    const file = e.target.files?.[0];
    if (file && onSelectFile) onSelectFile(file);
  };
  return (
    <div className="relative group mb-4">
      <span data-slot="avatar" className="flex size-10 shrink-0 overflow-hidden rounded-full w-32 h-32 relative border-2 border-white/20 shadow-2xl ">
        <img data-slot="avatar-image" className="aspect-square size-full" alt="Profile" src={imageUrl} />
      </span>
      <button
        data-slot="button"
        onClick={openPicker}
        disabled={loading}
        aria-busy={loading}
        className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium disabled:pointer-events-none disabled:opacity-50 shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive border text-foreground hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50 h-9 px-4 py-2 has-[>svg]:px-3 bg-white/5 border-white/20 hover:bg-white/10 hover:border-white/30 transition-all mt-4"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-upload w-4 h-4 mr-2" aria-hidden="true"><path d="M12 3v12"></path><path d="m17 8-5-5-5 5"></path><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path></svg>
        {loading ? 'Đang tải...' : 'Tải ảnh lên'}
      </button>
      <input ref={inputRef} type="file" accept="image/*" className="hidden" onChange={onChange} />
    </div>
  );
}
