import React, { useEffect, useState } from 'react';

export default function DebouncedSearch({ value = '', onChange, placeholder = 'Search...' }) {
    const [local, setLocal] = useState(value);
    useEffect(() => setLocal(value), [value]);
    useEffect(() => {
        const t = setTimeout(() => onChange?.(local), 350);
        return () => clearTimeout(t);
    }, [local]);

    return (
        <input
            value={local}
            onChange={(e) => setLocal(e.target.value)}
            placeholder={placeholder}
            className="cm-input cm-focus-ring"
        />
    );
}
