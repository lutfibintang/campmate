import React from 'react';
import { Link } from '@inertiajs/react';

export default function Brand({ href = '/', compact = false }) {
    return (
        <Link href={href} className="group flex items-center gap-3">
            <div className="grid h-11 w-11 place-items-center rounded-2xl bg-[var(--cm-primary)] text-[#15170f] shadow-lg shadow-black/20 transition group-hover:scale-105">
                ✦
            </div>
            {!compact && (
                <div className="leading-tight">
                    <b className="text-lg text-[var(--cm-text)]">CampusMate</b>
                    <p className="text-xs font-semibold text-[var(--cm-muted)]">Study smarter. Not louder.</p>
                </div>
            )}
        </Link>
    );
}
