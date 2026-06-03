import React, { useEffect, useState } from 'react';

export default function StatCard({ value = 0, label, detail, icon = '•' }) {
    const [display, setDisplay] = useState(0);

    useEffect(() => {
        const target = Number(value) || 0;
        const duration = 520;
        const start = performance.now();
        const tick = (now) => {
            const progress = Math.min(1, (now - start) / duration);
            setDisplay(Math.round(target * progress));
            if (progress < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
    }, [value]);

    return (
        <div
            className="cm-card cm-spotlight cm-panel min-h-[132px]"
            onMouseMove={(e) => {
                const r = e.currentTarget.getBoundingClientRect();
                e.currentTarget.style.setProperty('--mx', `${e.clientX - r.left}px`);
                e.currentTarget.style.setProperty('--my', `${e.clientY - r.top}px`);
            }}
        >
            <div className="flex items-start justify-between gap-4">
                <div>
                    <div className="text-4xl font-black tracking-[-0.08em] text-[var(--cm-primary)]">{display}</div>
                    <h3 className="mt-2 text-sm font-black text-[var(--cm-text)]">{label}</h3>
                    {detail && <p className="mt-1 text-sm text-[var(--cm-muted)]">{detail}</p>}
                </div>
                <span className="grid h-11 w-11 place-items-center rounded-2xl bg-[var(--cm-primary-soft)] text-xl">{icon}</span>
            </div>
        </div>
    );
}
