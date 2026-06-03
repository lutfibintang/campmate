import React, { useState } from 'react';
import { Link, router, useForm, usePage } from '@inertiajs/react';
import CampusLayout from '../../layouts/CampusLayout';
import { TextArea } from '../../components/TextInput';

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

export default function Show({ session, comments = [], isJoined = false, conflict = null }) {
    const { auth } = usePage().props;
    const user = auth?.user;
    const manageable = canManageSession(user, session);
    const [showConflict, setShowConflict] = useState(Boolean(conflict?.has_conflict) && !isJoined);
    const sessionComments = comments?.length ? comments : (session.comments || []);

    const { data, setData, post, processing, reset, errors } = useForm({ comment: '' });

    const submit = (event) => {
        event.preventDefault();

        post(`/study-sessions/${session.id}/comments`, {
            preserveScroll: true,
            onSuccess: () => reset('comment'),
        });
    };

    const join = (forceJoin = false) => {
        router.post(
            `/study-sessions/${session.id}/join`,
            { force_join: forceJoin },
            {
                preserveScroll: true,
                onSuccess: () => setShowConflict(false),
            },
        );
    };

    const leave = () => {
        router.delete(`/study-sessions/${session.id}/leave`, {
            preserveScroll: true,
        });
    };

    const deleteSession = () => {
        if (!confirm(`Hapus study session "${session.title}"?`)) return;

        router.delete(`/study-sessions/${session.id}`);
    };

    const handleJoinClick = () => {
        if (conflict?.has_conflict) {
            setShowConflict(true);
            return;
        }

        join(false);
    };

    const conflictCourse = conflict?.course;

    return (
        <CampusLayout title={session.title} subtitle="Detail study session dan diskusi peserta.">
            {showConflict && conflict?.has_conflict && (
                <section className="cm-card cm-panel mb-6 border-[var(--cm-warning)]/40 bg-[var(--cm-warning)]/10">
                    <div className="flex flex-wrap items-start justify-between gap-4">
                        <div>
                            <p className="text-3xl">⚠️</p>
                            <h2 className="mt-2 text-3xl font-black tracking-[-.06em] text-[var(--cm-text)]">
                                Jadwal Bentrok!
                            </h2>
                            <p className="mt-3 max-w-3xl text-[var(--cm-muted)]">
                                Sesi ini bentrok dengan{' '}
                                <b className="text-[var(--cm-text)]">{conflictCourse?.name || 'jadwal kuliah lu'}</b>{' '}
                                {conflictCourse?.start_time && conflictCourse?.end_time
                                    ? `(${conflictCourse.start_time} - ${conflictCourse.end_time})`
                                    : ''}
                                {conflictCourse?.room ? ` di ${conflictCourse.room}` : ''}.
                            </p>
                            <p className="mt-2 text-sm font-bold text-[var(--cm-muted)]">
                                Kalau tetap mau join, klik Tetap Join. Ini bakal memaksa join walau bentrok.
                            </p>
                        </div>

                        <div className="flex gap-2">
                            <button type="button" onClick={() => setShowConflict(false)} className="cm-btn cm-btn-ghost">
                                Batal
                            </button>
                            <button type="button" onClick={() => join(true)} className="cm-btn cm-btn-primary">
                                Tetap Join
                            </button>
                        </div>
                    </div>
                </section>
            )}

            <section className="grid gap-6 lg:grid-cols-[1.2fr_.8fr]">
                <article className="cm-card cm-panel cm-spotlight">
                    <div className="flex flex-wrap items-center justify-between gap-3">
                        <div className="flex flex-wrap gap-2">
                            <span className="cm-badge">{session.session_type}</span>
                            <span className="cm-badge">{session.status_label || session.status}</span>
                            {manageable && (
                                <span className="cm-badge">{user?.is_admin ? 'Admin Manage' : 'Owner'}</span>
                            )}
                        </div>

                        {manageable && (
                            <div className="flex gap-2">
                                <Link href={`/study-sessions/${session.id}/edit`} className="cm-btn cm-btn-ghost">
                                    Edit
                                </Link>
                                <button type="button" onClick={deleteSession} className="cm-btn text-[var(--cm-danger)]">
                                    Delete
                                </button>
                            </div>
                        )}
                    </div>

                    <h1 className="mt-6 text-5xl font-black tracking-[-.08em] text-[var(--cm-text)]">
                        {session.title}
                    </h1>

                    <p className="mt-4 text-lg leading-8 text-[var(--cm-muted)]">
                        {session.description || 'Belum ada deskripsi.'}
                    </p>

                    <div className="mt-7 grid gap-3 sm:grid-cols-2">
                        <InfoCard label="Subject" value={session.subject?.name || session.subject || 'General'} />
                        <InfoCard label="Tanggal" value={formatDate(session.session_date)} />
                        <InfoCard label="Jam" value={`${formatTime(session.start_time)} - ${formatTime(session.end_time)}`} />
                        <InfoCard label="Lokasi / Platform" value={session.location || session.meeting_platform || '-'} />
                    </div>
                </article>

                <aside className="cm-card cm-panel">
                    <h2 className="text-2xl font-black tracking-[-.05em] text-[var(--cm-text)]">Join Session</h2>
                    <p className="mt-2 text-sm font-bold text-[var(--cm-muted)]">
                        Status: {session.status_label || session.status}
                    </p>

                    <div className="mt-6 grid gap-3">
                        {isJoined ? (
                            <button type="button" onClick={leave} className="cm-btn cm-btn-ghost">
                                Leave Session
                            </button>
                        ) : session.can_join || session.status === 'open' ? (
                            <button type="button" onClick={handleJoinClick} className="cm-btn cm-btn-primary">
                                Join
                            </button>
                        ) : (
                            <button type="button" disabled className="cm-btn cm-btn-ghost opacity-60">
                                Closed
                            </button>
                        )}
                    </div>
                </aside>
            </section>

            <section className="cm-card cm-panel mt-6">
                <h2 className="text-2xl font-black tracking-[-.05em] text-[var(--cm-text)]">Discussion</h2>

                <form onSubmit={submit} className="mt-5 grid gap-3">
                    <TextArea
                        value={data.comment}
                        onChange={(event) => setData('comment', event.target.value)}
                        placeholder="Tulis komentar..."
                    />
                    {errors.comment && <p className="text-sm font-bold text-[var(--cm-danger)]">{errors.comment}</p>}
                    <button disabled={processing} className="cm-btn cm-btn-primary justify-self-end">
                        Send Comment
                    </button>
                </form>

                <div className="mt-6 grid gap-3">
                    {sessionComments.map((comment) => (
                        <div key={comment.id} className="cm-card-compact p-4">
                            <b>{comment.user?.name || 'User'}</b>
                            <p className="mt-1 text-[var(--cm-muted)]">{comment.comment}</p>
                        </div>
                    ))}
                </div>
            </section>
        </CampusLayout>
    );
}

function InfoCard({ label, value }) {
    return (
        <div className="rounded-3xl border border-[var(--cm-border)] bg-[var(--cm-elevated)] p-4">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-[var(--cm-subtle)]">{label}</p>
            <p className="mt-2 font-black text-[var(--cm-text)]">{value}</p>
        </div>
    );
}
