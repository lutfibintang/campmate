import React from 'react';
import { Link, router, usePage } from '@inertiajs/react';

function formatDate(value) {
    if (!value) return '-';

    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return String(value);

    return date.toLocaleDateString('id-ID', {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
    });
}

function formatTime(value) {
    return value ? String(value).slice(0, 5) : '-';
}

function canManageSession(user, session) {
    if (!user || !session) return false;
    return Boolean(user.is_admin || Number(session.user_id) === Number(user.id));
}

export default function SessionCard({ session }) {
    const { auth } = usePage().props;
    const user = auth?.user;
    const status = session.status_label || session.status || 'open';
    const full = Number(session.joined_count || session.participants_count || session.joined_participants_count || 0);
    const max = Number(session.max_participants || 1);
    const percent = Math.min(100, Math.round((full / max) * 100));
    const manageable = canManageSession(user, session);

    const deleteSession = () => {
        if (!confirm(`Hapus study session "${session.title}"?`)) return;

        router.delete(`/study-sessions/${session.id}`, {
            preserveScroll: true,
        });
    };

    return (
        <article className="cm-card cm-panel cm-spotlight flex flex-col gap-5">
            <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex flex-wrap gap-2">
                    <span className="cm-badge">{session.session_type || 'offline'}</span>
                    <span className="cm-badge">{status}</span>
                </div>

                {manageable && (
                    <span className="rounded-full border border-[var(--cm-primary)]/30 bg-[var(--cm-primary)]/10 px-3 py-1 text-xs font-black uppercase tracking-[.18em] text-[var(--cm-primary)]">
                        {user?.is_admin ? 'Admin Manage' : 'Owner'}
                    </span>
                )}
            </div>

            <div>
                <h3 className="text-3xl font-black tracking-[-0.06em] text-[var(--cm-text)]">{session.title}</h3>
                <p className="mt-2 text-sm font-bold text-[var(--cm-muted)]">
                    {session.subject?.name || session.subject || 'General'} · {formatDate(session.session_date)} · {formatTime(session.start_time)} - {formatTime(session.end_time)}
                </p>
                <p className="mt-2 text-[var(--cm-muted)]">
                    {session.location || session.meeting_platform || 'Location TBD'}
                </p>
            </div>

            <div>
                <div className="flex justify-between text-sm font-black text-[var(--cm-muted)]">
                    <span>{full}/{max} peserta</span>
                    <span>{percent}%</span>
                </div>
                <div className="mt-2 h-3 overflow-hidden rounded-full bg-[var(--cm-card-soft)]">
                    <div className="h-full rounded-full bg-[var(--cm-primary)] transition-all" style={{ width: `${percent}%` }} />
                </div>
            </div>

            <div className="mt-auto flex flex-wrap gap-2">
                <Link href={`/study-sessions/${session.id}`} className="cm-btn cm-btn-ghost flex-1 text-sm">
                    Detail
                </Link>

                {status === 'open' && (
                    <button
                        type="button"
                        onClick={() => router.post(`/study-sessions/${session.id}/join`)}
                        className="cm-btn cm-btn-primary flex-1 text-sm"
                    >
                        Join
                    </button>
                )}

                {manageable && (
                    <>
                        <Link href={`/study-sessions/${session.id}/edit`} className="cm-btn cm-btn-ghost flex-1 text-sm">
                            Edit
                        </Link>
                        <button
                            type="button"
                            onClick={deleteSession}
                            className="cm-btn flex-1 text-sm text-[var(--cm-danger)]"
                        >
                            Delete
                        </button>
                    </>
                )}
            </div>
        </article>
    );
}
