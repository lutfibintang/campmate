import React, { forwardRef, useEffect, useRef } from 'react';

export function Field({ label, error, children, hint, className = '' }) {
    return (
        <label className={`block space-y-2 ${className}`}>
            {label && <span className="cm-label">{label}</span>}
            {children}
            {hint && <p className="text-xs text-[var(--cm-muted)]">{hint}</p>}
            {error && <p className="text-sm font-semibold text-[var(--cm-danger)]">{error}</p>}
        </label>
    );
}

export const TextInput = forwardRef(function TextInput(
    { className = '', isFocused = false, type = 'text', ...props },
    ref
) {
    const localRef = useRef(null);
    const inputRef = ref || localRef;

    useEffect(() => {
        if (isFocused && inputRef.current) {
            inputRef.current.focus();
        }
    }, [isFocused, inputRef]);

    return (
        <input
            {...props}
            type={type}
            ref={inputRef}
            className={`cm-input cm-focus-ring ${className}`}
        />
    );
});

export function SelectInput({ className = '', children, ...props }) {
    return (
        <select {...props} className={`cm-input cm-focus-ring ${className}`}>
            {children}
        </select>
    );
}

export function TextArea({ className = '', rows = 4, ...props }) {
    return (
        <textarea
            {...props}
            rows={rows}
            className={`cm-input cm-focus-ring min-h-36 ${className}`}
        />
    );
}

export default TextInput;
