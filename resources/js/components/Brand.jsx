import React from 'react';
import { Link } from '@inertiajs/react';

export default function Brand({ href = '/', compact = false }) {
    return (
        <Link href={href} className="flex items-center gap-3">
            <span className="grid h-11 w-11 place-items-center rounded-2xl bg-[var(--cm-primary)] text-xl font-black text-[#11140c] shadow-lg shadow-black/20">
                ✦
            </span>
            <span className="leading-tight">
                <b className="block text-lg font-black tracking-[-0.04em] text-[var(--cm-text)]">CampusMate</b>
                {!compact && <small className="font-bold text-[var(--cm-muted)]">Study smarter. Schedule cleaner.</small>}
            </span>
        </Link>
    );
}
