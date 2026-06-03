import React, { useEffect, useState } from 'react';

export default function DebouncedSearch({ initial = '', onSearch, placeholder = 'Search anything...' }) {
    const [value, setValue] = useState(initial || '');

    useEffect(() => {
        const timer = setTimeout(() => onSearch?.(value), 350);
        return () => clearTimeout(timer);
    }, [value]);

    return (
        <div className="relative">
            <input
                value={value}
                onChange={(e) => setValue(e.target.value)}
                placeholder={placeholder}
                className="cm-input pr-11"
            />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[var(--cm-subtle)]">⌕</span>
        </div>
    );
}
