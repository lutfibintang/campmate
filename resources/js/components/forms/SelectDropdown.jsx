import React, { useEffect, useId, useMemo, useRef, useState } from 'react';

function normalizeOptions(options = []) {
    if (typeof options === 'string') {
        try {
            return normalizeOptions(JSON.parse(options));
        } catch (_error) {
            return options
                .split('|')
                .map((item) => item.trim())
                .filter(Boolean)
                .map((item) => ({ value: item, label: item }));
        }
    }

    if (!Array.isArray(options)) return [];

    return options.map((option) => {
        if (typeof option === 'string') return { value: option, label: option };
        return {
            value: String(option.value ?? option.id ?? option.label ?? ''),
            label: String(option.label ?? option.name ?? option.value ?? option.id ?? ''),
            caption: option.caption || option.description || '',
            icon: option.icon || '',
        };
    }).filter((option) => option.value !== '' && option.label !== '');
}

export default function SelectDropdown({
    name = 'mode',
    id,
    label = 'Mode',
    placeholder = 'Pilih mode',
    value,
    defaultValue = '',
    required = false,
    options = [
        { value: 'offline', label: 'Offline', caption: 'Ketemu langsung di kampus', icon: '📍' },
        { value: 'online', label: 'Online', caption: 'Pakai link meeting', icon: '💻' },
        { value: 'hybrid', label: 'Hybrid', caption: 'Bisa online atau offline', icon: '🔁' },
    ],
    onChange,
}) {
    const reactId = useId();
    const inputId = id || `cm-select-${reactId}`;
    const rootRef = useRef(null);
    const [open, setOpen] = useState(false);
    const [internalValue, setInternalValue] = useState(defaultValue || value || '');
    const selectedValue = value ?? internalValue;
    const normalizedOptions = useMemo(() => normalizeOptions(options), [options]);
    const selectedOption = normalizedOptions.find((option) => option.value === selectedValue);

    useEffect(() => {
        const handlePointerDown = (event) => {
            if (!rootRef.current?.contains(event.target)) setOpen(false);
        };

        const handleKeyDown = (event) => {
            if (event.key === 'Escape') setOpen(false);
        };

        document.addEventListener('pointerdown', handlePointerDown);
        document.addEventListener('keydown', handleKeyDown);

        return () => {
            document.removeEventListener('pointerdown', handlePointerDown);
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, []);

    const selectOption = (option) => {
        setInternalValue(option.value);
        setOpen(false);
        onChange?.(option.value, option);
    };

    return (
        <div ref={rootRef} className="cm-react-field cm-field-dropdown">
            <label htmlFor={inputId} className="cm-label">{label}</label>

            <button
                id={inputId}
                type="button"
                onClick={() => setOpen((value) => !value)}
                className={`cm-fancy-input ${open ? 'cm-fancy-input-open' : ''}`}
                aria-haspopup="listbox"
                aria-expanded={open}
            >
                <span className="cm-picker-icon" aria-hidden="true">{selectedOption?.icon || '⌁'}</span>
                <span className="min-w-0 flex-1 text-left">
                    <span className={`block truncate font-black ${selectedOption ? 'text-[var(--cm-text)]' : 'text-[var(--cm-muted)]'}`}>
                        {selectedOption?.label || placeholder}
                    </span>
                    <span className="mt-0.5 block truncate text-xs font-bold text-[var(--cm-subtle)]">
                        {selectedOption?.caption || 'Pilih dari dropdown custom CampusMate'}
                    </span>
                </span>
                <span className="cm-dropdown-chev" aria-hidden="true">
                    <svg viewBox="0 0 20 20" fill="none">
                        <path d="M5.5 7.5L10 12l4.5-4.5" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </span>
            </button>

            <input type="hidden" name={name} value={selectedValue} />
            {required && (
                <input
                    tabIndex={-1}
                    aria-hidden="true"
                    required
                    value={selectedValue}
                    onChange={() => {}}
                    className="cm-validation-proxy"
                />
            )}

            <div className={`cm-select-popover ${open ? 'cm-select-popover-open' : ''}`} role="listbox">
                {normalizedOptions.map((option) => (
                    <button
                        key={option.value}
                        type="button"
                        onClick={() => selectOption(option)}
                        className={`cm-select-option ${selectedValue === option.value ? 'cm-select-option-active' : ''}`}
                        role="option"
                        aria-selected={selectedValue === option.value}
                    >
                        <span className="cm-menu-icon">{option.icon || '•'}</span>
                        <span className="min-w-0 flex-1 text-left">
                            <span className="block truncate font-black">{option.label}</span>
                            {option.caption && <span className="mt-0.5 block truncate text-xs text-[var(--cm-subtle)]">{option.caption}</span>}
                        </span>
                        {selectedValue === option.value && <span className="text-[var(--cm-primary-strong)]">✓</span>}
                    </button>
                ))}
            </div>
        </div>
    );
}
