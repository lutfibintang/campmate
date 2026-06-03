import React, { useState } from 'react';
import { router, useForm } from '@inertiajs/react';
import CampusLayout from '../../layouts/CampusLayout';
import { TextArea } from '../../components/TextInput';

export default function Show({ session, comments = [], conflict = null }) {
    const [showConflict, setShowConflict] = useState(Boolean(conflict));
    const { data, setData, post, processing, reset } = useForm({ body: '' });
    const submit = (e) => { e.preventDefault(); post(`/study-sessions/${session.id}/comments`, { onSuccess: () => reset('body') }); };
    const join = (force = false) => router.post(`/study-sessions/${session.id}/join`, { force });
    return (
        <CampusLayout title={session.title} subtitle={`${session.subject?.name || 'General'} · ${session.session_date} · ${session.start_time} - ${session.end_time}`}>
            {showConflict && (
                <div className="fixed inset-0 z-[90] grid place-items-center bg-black/60 p-4 backdrop-blur-sm">
                    <div className="cm-card cm-panel max-w-md"><div className="text-5xl">⚠️</div><h2 className="mt-4 text-3xl font-black">Jadwal Bentrok!</h2><p className="mt-2 text-[var(--cm-muted)]">Sesi ini bentrok dengan {conflict?.course || 'jadwal kuliah'} {conflict?.start_time} - {conflict?.end_time}.</p><div className="mt-6 flex gap-3"><button className="cm-btn cm-btn-ghost flex-1" onClick={() => setShowConflict(false)}>Batal</button><button className="cm-btn cm-btn-primary flex-1" onClick={() => join(true)}>Tetap Join</button></div></div>
                </div>
            )}
            <div className="grid gap-6 lg:grid-cols-[1fr_330px]">
                <section className="cm-card cm-panel"><span className="cm-badge">{session.session_type}</span><h2 className="mt-5 text-3xl font-black tracking-[-0.06em]">{session.title}</h2><p className="mt-3 text-[var(--cm-muted)]">{session.description || 'Belum ada deskripsi.'}</p><div className="mt-6 grid gap-3 sm:grid-cols-2"><div className="cm-card-compact p-4"><b>Lokasi</b><p className="text-sm text-[var(--cm-muted)]">{session.location || '-'}</p></div><div className="cm-card-compact p-4"><b>Meeting</b><p className="text-sm text-[var(--cm-muted)]">{session.meeting_platform || '-'}</p></div></div></section>
                <aside className="cm-card cm-panel"><h3 className="text-xl font-black">Join Session</h3><p className="mt-2 text-sm text-[var(--cm-muted)]">Status: {session.status_label || session.status}</p>{session.status === 'open' ? <button className="cm-btn cm-btn-primary mt-5 w-full" onClick={() => conflict ? setShowConflict(true) : join(false)}>Join</button> : <button disabled className="cm-btn cm-btn-ghost mt-5 w-full opacity-60">Closed</button>}</aside>
            </div>
            <section className="cm-card cm-panel mt-6"><h2 className="text-2xl font-black">Discussion</h2><form onSubmit={submit} className="mt-4 grid gap-3"><TextArea value={data.body} onChange={(e) => setData('body', e.target.value)} placeholder="Tulis komentar..." /><button disabled={processing} className="cm-btn cm-btn-primary justify-self-end">Send Comment</button></form><div className="mt-6 grid gap-3">{comments.map((c) => <div key={c.id} className="cm-card-compact p-4"><b>{c.user?.name || 'User'}</b><p className="mt-1 text-[var(--cm-muted)]">{c.body}</p></div>)}</div></section>
        </CampusLayout>
    );
}
