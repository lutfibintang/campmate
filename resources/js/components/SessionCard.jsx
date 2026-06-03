import React from 'react';
import { Link, router } from '@inertiajs/react';

export default function SessionCard({ session }) {
    const status = session.status_label || session.status || 'open';
    const full = Number(session.participants_count || session.joined_participants_count || 0);
    const max = Number(session.max_participants || 1);
    const percent = Math.min(100, Math.round((full / max) * 100));

    return (
        <div className="cm-card-compact cm-spotlight p-5">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                        <span className="cm-badge">{session.session_type || 'offline'}</span>
                        <span className={`cm-badge cm-status-${String(status).toLowerCase()}`}>{status}</span>
                    </div>
                    <h3 className="mt-3 text-xl font-black tracking-[-0.04em] text-[var(--cm-text)]">{session.title}</h3>
                    <p className="mt-1 text-sm text-[var(--cm-muted)]">
                        {session.subject?.name || 'General'} · {session.session_date || '-'} · {session.start_time || '-'} - {session.end_time || '-'}
                    </p>
                    <p className="mt-1 text-sm text-[var(--cm-muted)]">{session.location || session.meeting_platform || 'Location TBD'}</p>
                </div>
                <div className="w-full sm:w-52">
                    <div className="h-2 rounded-full bg-[var(--cm-card-soft)]">
                        <div className="h-2 rounded-full bg-[var(--cm-primary)]" style={{ width: `${percent}%` }} />
                    </div>
                    <p className="mt-2 text-right text-sm font-bold text-[var(--cm-muted)]">{full}/{max} peserta</p>
                    <div className="mt-3 flex gap-2">
                        <Link href={`/study-sessions/${session.id}`} className="cm-btn cm-btn-soft flex-1 text-sm">Detail</Link>
                        {status === 'open' && (
                            <button type="button" onClick={() => router.post(`/study-sessions/${session.id}/join`)} className="cm-btn cm-btn-primary flex-1 text-sm">Join</button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
