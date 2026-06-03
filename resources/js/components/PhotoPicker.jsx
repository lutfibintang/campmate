import React, { useRef, useState } from 'react';

export default function PhotoPicker({ label = 'Insert Photo', onChange, error }) {
    const inputRef = useRef(null);
    const [preview, setPreview] = useState(null);

    const pick = (file) => {
        onChange?.(file);
        if (file) setPreview(URL.createObjectURL(file));
    };

    return (
        <div>
            <span className="cm-label">{label}</span>
            <button
                type="button"
                onClick={() => inputRef.current?.click()}
                className="flex min-h-[150px] w-full items-center justify-center rounded-3xl border border-dashed border-[var(--cm-border)] bg-[var(--cm-primary-soft)] p-4 text-center text-[var(--cm-muted)]"
            >
                {preview ? <img src={preview} alt="Preview" className="h-32 w-full rounded-2xl object-cover" /> : <span>Click to upload image</span>}
            </button>
            <input ref={inputRef} type="file" accept="image/*" className="hidden" onChange={(e) => pick(e.target.files?.[0])} />
            {error && <p className="mt-1 text-xs font-bold text-[var(--cm-danger)]">{error}</p>}
        </div>
    );
}
