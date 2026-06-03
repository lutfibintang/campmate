import React from 'react';
import { router } from '@inertiajs/react';

export default function BackButton({ fallback = '/dashboard', label = 'Back' }) {
    const goBack = () => {
        if (window.history.length > 1) window.history.back();
        else router.visit(fallback);
    };

    return (
        <button type="button" onClick={goBack} className="cm-btn cm-btn-ghost px-4 py-2 text-sm">
            ← {label}
        </button>
    );
}
