import React, { useState } from 'react';
import { Link, router, usePage } from '@inertiajs/react';
import CampusLayout from '../../layouts/CampusLayout';
import DebouncedSearch from '../../components/DebouncedSearch';

function isAdminUser(user) {
    return Boolean(user?.is_admin || String(user?.role || '').toLowerCase() === 'admin');
}

function canManageSession(user, session) {
    return Boolean(
        session?.can_edit ||
        session?.can_delete ||
        isAdminUser(user) ||
        Number(session?.user_id) === Number(user?.id) ||
        Number(session?.creator?.id) === Number(user?.id),
    );
}

function formatDate(value) {
    if (!value) return '-';
    return new Date(value).toLocaleDateString('id-ID', { day: '2-digit', month: 'long', year: 'numeric' });
}

function formatTime(value) {
    return value ? String(value).slice(0, 5) : '--:--';
}

function SessionCard({ session, user }) {
    const canManage = canManageSession(user, session);

    const destroy = () => {
        if (!window.confirm(`Hapus study session "${session.title}"?`)) return;

        router.delete(`/study-sessions/${session.id}`, {
            preserveScroll: true,
        });
    };

    return (
        <article className="cm-card cm-panel flex flex-col justify-between gap-5">
            <div>
                <div className="flex flex-wrap items-center justify-between gap-3">
                    <span className="cm-badge">{session.session_type || 'session'}</span>
                    <span className="rounded-full border border-[var(--cm-border)] bg-[var(--cm-card-soft)] px-4 py-2 text-xs font-black uppercase tracking-[.2em] text-[var(--cm-primary)]">
                        {session.status}
                    </span>
                </div>

                <h2 className="mt-5 text-3xl font-black tracking-[-0.06em] text-[var(--cm-text)]">
                    {session.title}
                </h2>

                <p className="mt-2 text-sm font-bold text-[var(--cm-muted)]">
                    {session.subject?.name ?? session.subject ?? '-'} · {formatDate(session.session_date)} · {formatTime(session.start_time)} - {formatTime(session.end_time)}
                </p>

                <p className="mt-4 line-clamp-3 text-sm leading-6 text-[var(--cm-muted)]">
                    {session.description || 'Belum ada deskripsi.'}
                </p>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-3 border-t border-[var(--cm-border)] pt-4">
                <Link href={`/study-sessions/${session.id}`} className="cm-btn cm-btn-primary">
                    Detail
                </Link>

                {canManage && (
                    <div className="flex flex-wrap gap-2">
                        <Link href={`/study-sessions/${session.id}/edit`} className="cm-btn cm-btn-ghost">
                            Edit
                        </Link>
                        <button type="button" onClick={destroy} className="cm-btn cm-btn-ghost text-[var(--cm-danger)]">
                            Delete
                        </button>
                    </div>
                )}
            </div>
        </article>
    );
}

export default function Index({ sessions = [], filters = {} }) {
    const { auth } = usePage().props;
    const user = auth?.user;
    const [type, setType] = useState(filters.session_type || 'all');

    const update = (payload) => router.get('/study-sessions', { ...filters, ...payload }, {
        preserveState: true,
        replace: true,
    });

    return (
        <CampusLayout title="Study Sessions" subtitle="Cari sesi belajar, join, atau manage sesi lu. Admin bisa override edit/hapus semua sesi.">
            <section className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                <div className="w-full lg:max-w-md">
                    <DebouncedSearch
                        initialValue={filters.search || ''}
                        placeholder="Cari session / subject..."
                        onChange={(search) => update({ search })}
                    />
                </div>

                <Link href="/study-sessions/create" className="cm-btn cm-btn-primary">
                    + New Session
                </Link>
            </section>

            <div className="mb-6 flex flex-wrap gap-2">
                {['all', 'offline', 'online', 'hybrid', 'archive'].map((item) => (
                    <button
                        key={item}
                        type="button"
                        onClick={() => {
                            setType(item);
                            update({ session_type: item === 'all' ? '' : item });
                        }}
                        className={`cm-btn px-4 py-2 text-sm ${type === item ? 'cm-btn-primary' : 'cm-btn-ghost'}`}
                    >
                        {item}
                    </button>
                ))}
            </div>

            {isAdminUser(user) && (
                <div className="cm-card cm-panel mb-6 border border-[var(--cm-primary)]/40 bg-[var(--cm-primary)]/10">
                    <b className="text-[var(--cm-primary)]">Admin mode aktif.</b>
                    <p className="mt-1 text-sm font-semibold text-[var(--cm-muted)]">
                        Tombol Edit/Delete muncul untuk semua study session. Power besar, bug juga besar, jangan asal klik kayak spam captcha.
                    </p>
                </div>
            )}

            <section className="grid gap-5 lg:grid-cols-2">
                {sessions.length ? sessions.map((session) => (
                    <SessionCard key={session.id} session={session} user={user} />
                )) : (
                    <div className="cm-card cm-panel lg:col-span-2 text-center">
                        <h2 className="text-3xl font-black tracking-[-0.06em]">Ga ada session yang cocok.</h2>
                        <p className="mt-2 text-[var(--cm-muted)]">Buat sendiri, jangan nunggu yang ga pasti.</p>
                    </div>
                )}
            </section>
        </CampusLayout>
    );
}
