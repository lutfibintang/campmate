import React from 'react';
import { Link } from '@inertiajs/react';

export default function SessionCard({ session }) {
    return (
        <Link href={`/study-sessions/${session.id}`} className="cm-card-compact cm-spotlight block p-5 transition hover:-translate-y-1 hover:border-[var(--cm-primary)]" onMouseMove={(e) => {
            const r = e.currentTarget.getBoundingClientRect();
            e.currentTarget.style.setProperty('--mx', `${e.clientX - r.left}px`);
            e.currentTarget.style.setProperty('--my', `${e.clientY - r.top}px`);
        }}>
            <div className="relative z-10 flex items-start justify-between gap-4">
                <div>
                    <span className={`cm-badge cm-status-${session.status_label?.toLowerCase()}`}>{session.status_label}</span>
                    <h3 className="mt-4 text-xl font-black text-[var(--cm-text)]">{session.title}</h3>
                    <p className="mt-2 text-sm leading-6 text-[var(--cm-muted)]">{session.description || 'Belajar bareng tanpa drama deadline.'}</p>
                    <div className="mt-4 flex flex-wrap gap-2">
                        <span className="cm-badge">{session.subject?.name || 'Subject'}</span>
                        <span className="cm-badge">{session.session_type}</span>
                    </div>
                </div>
                <div className="text-right text-sm font-bold text-[var(--cm-muted)]">
                    <p>{session.session_date}</p>
                    <p>{session.start_time} - {session.end_time}</p>
                    <p>{session.joined_count}/{session.max_participants} peserta</p>
                </div>
            </div>
        </Link>
    );
}
