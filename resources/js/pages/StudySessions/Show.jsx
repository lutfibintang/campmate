import React, { useEffect, useState } from 'react';
import { router, useForm } from '@inertiajs/react';
import CampusLayout from '../../Layouts/CampusLayout';
import BackButton from '../../Components/BackButton';
import { TextArea } from '../../Components/TextInput';

export default function Show({ session, isJoined = false, conflict = null }) {
    const [modal, setModal] = useState(conflict?.has_conflict ? conflict : null);
    const { data, setData, post, processing, reset } = useForm({ comment: '' });

    useEffect(() => {
        const clearOnPageShow = (e) => { if (e.persisted) reset('comment'); };
        window.addEventListener('pageshow', clearOnPageShow);
        return () => window.removeEventListener('pageshow', clearOnPageShow);
    }, []);

    const join = async () => {
        const response = await fetch(`/study-sessions/${session.id}/conflict`);
        const result = await response.json();
        if (result.has_conflict) return setModal(result);
        router.post(`/study-sessions/${session.id}/join`);
    };

    const forceJoin = () => router.post(`/study-sessions/${session.id}/join`, { force_join: true }, { onFinish: () => setModal(null) });
    const sendComment = (e) => {
        e.preventDefault();
        post(`/study-sessions/${session.id}/comments`, { preserveScroll: true, onSuccess: () => reset('comment') });
    };

    return (
        <CampusLayout title={session.title} subtitle={`${session.subject?.name || 'Subject'} · ${session.session_type} · ${session.session_date}`}>
            <BackButton fallback="/study-sessions" />
            <div className="mt-5 grid gap-6 lg:grid-cols-[1fr_360px]">
                <section className="cm-card p-6">
                    <div className="flex flex-wrap items-center gap-3">
                        <span className={`cm-badge cm-status-${session.status_label?.toLowerCase()}`}>{session.status_label}</span>
                        <span className="cm-badge">{session.start_time} - {session.end_time}</span>
                        <span className="cm-badge">{session.joined_count}/{session.max_participants} peserta</span>
                    </div>
                    <p className="mt-6 whitespace-pre-line leading-8 text-[var(--cm-muted)]">{session.description || 'Belum ada deskripsi.'}</p>
                    <div className="mt-6 grid gap-4 md:grid-cols-2">
                        <div className="cm-card-compact p-4"><b>Lokasi</b><p className="mt-1 text-[var(--cm-muted)]">{session.location || '-'}</p></div>
                        <div className="cm-card-compact p-4"><b>Meeting</b><p className="mt-1 break-all text-[var(--cm-muted)]">{isJoined ? (session.meeting_link || '-') : 'Join dulu buat lihat full link.'}</p></div>
                    </div>
                </section>
                <aside className="cm-card p-6">
                    <h2 className="text-xl font-black">Participants</h2>
                    <div className="mt-4 grid gap-2">
                        {session.participants?.map((p) => <div className="cm-card-compact p-3" key={p.id}>{p.user?.name}</div>)}
                    </div>
                    {session.can_join ? (
                        isJoined ? <button onClick={() => router.delete(`/study-sessions/${session.id}/leave`)} className="cm-btn cm-btn-ghost mt-5 w-full">Leave Session</button> : <button onClick={join} className="cm-btn cm-btn-primary mt-5 w-full">Join Session</button>
                    ) : <button disabled className="cm-btn cm-btn-ghost mt-5 w-full opacity-60">Join Disabled</button>}
                </aside>
            </div>
            <section className="cm-card mt-6 p-6">
                <h2 className="text-xl font-black">Discussion</h2>
                <form onSubmit={sendComment} className="mt-4 grid gap-3">
                    <TextArea value={data.comment} onChange={(e) => setData('comment', e.target.value)} placeholder="Tanya materi, lokasi, atau link meeting..." />
                    <button disabled={processing} className="cm-btn cm-btn-primary w-fit">Send Comment</button>
                </form>
                <div className="mt-6 grid gap-3">
                    {session.comments?.map((c) => <div key={c.id} className="cm-card-compact p-4"><b>{c.user?.name}</b><p className="mt-2 text-[var(--cm-muted)]">{c.comment}</p></div>)}
                </div>
            </section>
            {modal && (
                <div className="fixed inset-0 z-50 grid place-items-center bg-black/60 p-4 backdrop-blur-sm">
                    <div className="cm-card max-w-md p-7 text-center">
                        <div className="text-5xl">⚠️</div>
                        <h2 className="mt-4 text-2xl font-black">Jadwal Bentrok!</h2>
                        <p className="mt-2 text-[var(--cm-muted)]">Sesi ini bentrok dengan jadwal mata kuliah lu.</p>
                        <div className="cm-card-compact mt-5 p-4 text-left">
                            <b>{modal.course?.name}</b>
                            <p className="text-sm text-[var(--cm-muted)]">{modal.course?.day_label} · {modal.course?.start_time} - {modal.course?.end_time} · {modal.course?.room || 'Room TBD'}</p>
                        </div>
                        <div className="mt-6 grid grid-cols-2 gap-3">
                            <button className="cm-btn cm-btn-ghost" onClick={() => setModal(null)}>Batal</button>
                            <button className="cm-btn cm-btn-primary" onClick={forceJoin}>Tetap Join</button>
                        </div>
                    </div>
                </div>
            )}
        </CampusLayout>
    );
}
