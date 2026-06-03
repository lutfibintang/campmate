import React, { useState } from 'react';
import { Link, router, useForm } from '@inertiajs/react';
import CampusLayout from '../../layouts/CampusLayout';
import { TextArea } from '../../components/TextInput';

export default function Show({ session, comments = [], isJoined = false, conflict = null, can = {} }) {
    const [showConflict, setShowConflict] = useState(Boolean(conflict?.has_conflict) && !isJoined);
    const sessionComments = comments?.length ? comments : (session.comments || []);

    const {
        data,
        setData,
        post,
        processing,
        reset,
        errors,
    } = useForm({
        comment: '',
    });

    const submit = (e) => {
        e.preventDefault();

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


    const destroy = () => {
        if (!window.confirm(`Hapus study session "${session.title}"?`)) return;

        router.delete(`/study-sessions/${session.id}`, {
            preserveScroll: true,
        });
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
        <CampusLayout title={session.title} subtitle={session.subject?.name || 'Study Session'}>
            {showConflict && conflict?.has_conflict && (
                <section className="cm-card cm-panel mb-6 border border-amber-400/40 bg-amber-500/10">
                    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                        <div>
                            <div className="text-3xl">⚠️</div>
                            <h2 className="mt-2 text-2xl font-black tracking-[-0.04em] text-amber-300">
                                Jadwal Bentrok!
                            </h2>
                            <p className="mt-2 text-sm font-semibold text-[var(--cm-muted)]">
                                Sesi ini bentrok dengan{' '}
                                <span className="font-black text-[var(--cm-text)]">
                                    {conflictCourse?.name || 'jadwal kuliah lu'}
                                </span>{' '}
                                {conflictCourse?.start_time && conflictCourse?.end_time
                                    ? `(${conflictCourse.start_time} - ${conflictCourse.end_time})`
                                    : ''}
                                {conflictCourse?.room ? ` di ${conflictCourse.room}` : ''}.
                            </p>
                            <p className="mt-1 text-xs font-bold text-[var(--cm-subtle)]">
                                Kalau tetap mau join, klik Tetap Join. Ini bakal memaksa join walau bentrok.
                            </p>
                        </div>

                        <div className="flex flex-wrap gap-2">
                            <button
                                type="button"
                                onClick={() => setShowConflict(false)}
                                className="cm-btn cm-btn-ghost"
                            >
                                Batal
                            </button>
                            <button
                                type="button"
                                onClick={() => join(true)}
                                className="cm-btn cm-btn-primary"
                            >
                                Tetap Join
                            </button>
                        </div>
                    </div>
                </section>
            )}

            <section className="cm-card cm-panel grid gap-5 lg:grid-cols-[1.4fr_.6fr]">
                <div>
                    <div className="inline-flex rounded-full border border-[var(--cm-border)] px-3 py-1 text-xs font-black uppercase tracking-[0.25em] text-[var(--cm-muted)]">
                        {session.session_type}
                    </div>

                    <div className="mt-4 flex flex-wrap items-start justify-between gap-4">
                        <h1 className="text-4xl font-black tracking-[-0.06em]">
                            {session.title}
                        </h1>

                        {(can.edit || can.delete) && (
                            <div className="flex flex-wrap gap-2">
                                {can.edit && (
                                    <Link href={`/study-sessions/${session.id}/edit`} className="cm-btn cm-btn-ghost">
                                        Edit
                                    </Link>
                                )}
                                {can.delete && (
                                    <button type="button" onClick={destroy} className="cm-btn cm-btn-ghost text-[var(--cm-danger)]">
                                        Delete
                                    </button>
                                )}
                            </div>
                        )}
                    </div>

                    <p className="mt-4 text-[var(--cm-muted)]">
                        {session.description || 'Belum ada deskripsi.'}
                    </p>

                    <div className="mt-6 grid gap-3 sm:grid-cols-2">
                        <InfoCard label="Subject" value={session.subject?.name || '-'} />
                        <InfoCard label="Tanggal" value={new Date(session.session_date).toLocaleDateString('id-ID', {day: '2-digit', month: 'long', year: 'numeric',})} />
                        <InfoCard label="Jam" value={`${session.start_time.slice(0, 5)} - ${session.end_time.slice(0, 5)}`} />
                        <InfoCard label="Meeting" value={session.meeting_platform || '-'} />
                        <InfoCard label="Peserta" value={`${session.joined_count || 0}/${session.max_participants}`} />
                    </div>
                </div>

                <aside className="cm-card-compact flex flex-col justify-between p-5">
                    <div>
                        <h3 className="text-lg font-black tracking-[-0.04em]">Join Session</h3>
                        <p className="mt-2 text-sm font-semibold text-[var(--cm-muted)]">
                            Status: {session.status_label || session.status}
                        </p>
                    </div>

                    <div className="mt-6 grid gap-2">
                        {isJoined ? (
                            <button type="button" onClick={leave} className="cm-btn cm-btn-ghost w-full">
                                Leave Session
                            </button>
                        ) : session.can_join || session.status === 'open' ? (
                            <button type="button" onClick={handleJoinClick} className="cm-btn cm-btn-primary w-full">
                                Join
                            </button>
                        ) : (
                            <button type="button" disabled className="cm-btn cm-btn-ghost w-full opacity-60">
                                Closed
                            </button>
                        )}
                    </div>
                </aside>
            </section>

            <section className="cm-card cm-panel mt-6">
                <h2 className="text-2xl font-black tracking-[-0.05em]">Discussion</h2>

                <form onSubmit={submit} className="mt-4 grid gap-3">
                    <TextArea
                        value={data.comment}
                        onChange={(e) => setData('comment', e.target.value)}
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
