import React, { forwardRef, useEffect, useRef } from 'react';

export function Field({ label, error, children, hint }) {
    return (
        <label className="block">
            {label && <span className="cm-label">{label}</span>}
            {children}
            {hint && <p className="mt-1 text-xs text-[var(--cm-muted)]">{hint}</p>}
            {error && <p className="mt-1 text-xs font-bold text-[var(--cm-danger)]">{error}</p>}
        </label>
    );
}

export const TextInput = forwardRef(function TextInput({ className = '', isFocused = false, type = 'text', ...props }, ref) {
    const localRef = useRef(null);
    const inputRef = ref || localRef;

    useEffect(() => {
        if (isFocused && inputRef.current) inputRef.current.focus();
    }, [isFocused]);

    return <input ref={inputRef} type={type} className={`cm-input ${className}`} {...props} />;
});

export function SelectInput({ className = '', children, ...props }) {
    return <select className={`cm-input ${className}`} {...props}>{children}</select>;
}

export function TextArea({ className = '', rows = 4, ...props }) {
    return <textarea rows={rows} className={`cm-input min-h-[132px] ${className}`} {...props} />;
}

export default TextInput;
