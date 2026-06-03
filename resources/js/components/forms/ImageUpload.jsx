import React, { useId, useMemo, useRef, useState } from 'react';

function fileNames(files) {
    if (!files.length) return '';
    if (files.length === 1) return files[0].name;
    return `${files.length} file dipilih`;
}

export default function ImageUpload({
    name = 'photo',
    id,
    label = 'Upload Foto',
    placeholder = 'Klik untuk pilih foto',
    accept = 'image/*',
    required = false,
    multiple = false,
    onChange,
}) {
    const reactId = useId();
    const inputId = id || `cm-image-${reactId}`;
    const inputRef = useRef(null);
    const [files, setFiles] = useState([]);
    const [previewUrl, setPreviewUrl] = useState('');

    const labelText = useMemo(() => fileNames(files), [files]);

    const handleChange = (event) => {
        const nextFiles = Array.from(event.target.files || []);
        setFiles(nextFiles);

        const firstImage = nextFiles.find((file) => file.type?.startsWith('image/'));
        if (previewUrl) URL.revokeObjectURL(previewUrl);
        setPreviewUrl(firstImage ? URL.createObjectURL(firstImage) : '');

        onChange?.(multiple ? nextFiles : nextFiles[0] || null, event);
    };

    return (
        <label htmlFor={inputId} className="cm-react-field cursor-pointer">
            <span className="cm-label">{label}</span>
            <span className="cm-upload-shell cm-fancy-input" onClick={() => inputRef.current?.click()}>
                <span className="cm-upload-preview" aria-hidden="true">
                    {previewUrl ? <img src={previewUrl} alt="" /> : '🖼️'}
                </span>
                <span className="min-w-0 flex-1 text-left">
                    <span className={`block truncate font-black ${labelText ? 'text-[var(--cm-text)]' : 'text-[var(--cm-muted)]'}`}>
                        {labelText || placeholder}
                    </span>
                    <span className="mt-1 block text-xs font-bold text-[var(--cm-subtle)]">PNG, JPG, WEBP. Seluruh kotak ini bisa diklik.</span>
                </span>
                <span className="cm-btn cm-btn-soft px-3 py-2 text-xs">Browse</span>
                <input
                    ref={inputRef}
                    id={inputId}
                    name={name}
                    type="file"
                    accept={accept}
                    required={required}
                    multiple={multiple}
                    onChange={handleChange}
                    className="sr-only"
                />
            </span>
        </label>
    );
}
