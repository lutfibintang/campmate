import React, { useEffect, useState } from 'react';

export default function StatCard({ value = 0, label, detail, icon = '•' }) {
    const [display, setDisplay] = useState(0);
    useEffect(() => {
        const target = Number(value) || 0;
        const duration = 500;
        const start = performance.now();
        const tick = (now) => {
            const p = Math.min(1, (now - start) / duration);
            setDisplay(Math.round(target * p));
            if (p < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
    }, [value]);

    return (
        <div className="cm-card-compact cm-spotlight p-5" onMouseMove={(e) => {
            const r = e.currentTarget.getBoundingClientRect();
            e.currentTarget.style.setProperty('--mx', `${e.clientX - r.left}px`);
            e.currentTarget.style.setProperty('--my', `${e.clientY - r.top}px`);
        }}>
            <div className="relative z-10 flex items-start justify-between gap-4">
                <div>
                    <p className="text-4xl font-black tracking-tight text-[var(--cm-primary)]">{display}</p>
                    <h3 className="mt-1 font-black text-[var(--cm-text)]">{label}</h3>
                    {detail && <p className="mt-1 text-sm leading-snug text-[var(--cm-muted)]">{detail}</p>}
                </div>
                <span className="grid h-10 w-10 place-items-center rounded-2xl bg-[var(--cm-primary-soft)] text-[var(--cm-primary)]">{icon}</span>
            </div>
        </div>
    );
}
