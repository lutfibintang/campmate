import React from 'react';
import { Link } from '@inertiajs/react';
import CampusLayout from '../layouts/CampusLayout';
import StatCard from '../components/StatCard';

function SessionMeta({ label, value }) {
    return (
        <div className="rounded-2xl border border-[var(--cm-border)] bg-[var(--cm-surface)]/55 px-4 py-3">
            <p className="text-[10px] font-black uppercase tracking-[0.22em] text-[var(--cm-subtle)]">{label}</p>
            <p className="mt-1 text-sm font-black text-[var(--cm-text)]">{value || '-'}</p>
        </div>
    );
}

function StudySessionCard({ session, featured = false }) {
    if (!session) return null;

    return (
        <article className={`group rounded-[2rem] border p-5 transition duration-300 ${featured ? 'border-[var(--cm-primary)] bg-[linear-gradient(135deg,var(--cm-primary-soft),var(--cm-panel))] shadow-[0_24px_70px_rgba(160,184,89,0.22)]' : 'border-[var(--cm-border)] bg-[var(--cm-surface)]/70 hover:-translate-y-1 hover:border-[var(--cm-primary)]'}`}>
            <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                    <span className="inline-flex rounded-full border border-[var(--cm-border)] bg-[var(--cm-bg)]/45 px-3 py-1 text-[10px] font-black uppercase tracking-[0.22em] text-[var(--cm-primary)]">
                        {featured ? 'Pinned Session' : session.status_label || 'Open'}
                    </span>
                    <h3 className={`${featured ? 'mt-4 text-3xl' : 'mt-3 text-xl'} font-black tracking-[-0.05em] text-[var(--cm-text)]`}>
                        {session.title}
                    </h3>
                    <p className="mt-2 max-w-2xl text-sm font-semibold leading-6 text-[var(--cm-muted)]">
                        {session.description || `${session.subject?.name || 'General Study'} bareng ${session.creator?.name || 'teman kampus'}.`}
                    </p>
                </div>
                <Link href={`/study-sessions/${session.id}`} className="cm-btn cm-btn-primary shrink-0">
                    Detail
                </Link>
            </div>

            <div className={`mt-5 grid gap-3 ${featured ? 'md:grid-cols-4' : 'sm:grid-cols-2'}`}>
                <SessionMeta label="Subject" value={session.subject?.name} />
                <SessionMeta label="Tanggal" value={session.date_label || session.session_date} />
                <SessionMeta label="Jam" value={`${session.start_time || '-'} - ${session.end_time || '-'}`} />
                <SessionMeta label="Peserta" value={`${session.joined_count ?? 0}/${session.max_participants ?? '-'} joined`} />
            </div>
        </article>
    );
}

export default function Dashboard({ stats = {}, pinnedSession = null, todayClasses = [], upcomingSessions = [], badges = [] }) {
    const safeBadges = badges.length ? badges : [
        { icon: '🌱', name: 'Fresh Learner', description: 'Akun aktif dan siap ikut sesi belajar.' },
    ];

    return (
        <CampusLayout
            title={`Halo, ${stats.name || 'Pi'}`}
            subtitle="Dashboard sekarang fokus ke Study Sessions dulu. Jadwal tetap ada, tapi bukan jadi tokoh utama yang nyolong spotlight."
        >
            <section className="grid gap-4 md:grid-cols-4">
                <StatCard label="Upcoming Sessions" value={stats.upcomingSessions ?? 0} icon="📚" />
                <StatCard label="Joined Sessions" value={stats.joinedSessions ?? 0} icon="🤝" />
                <StatCard label="Owned Sessions" value={stats.ownedSessions ?? 0} icon="🎯" />
                <StatCard label="Today Classes" value={stats.todayClasses ?? 0} icon="🗓️" />
            </section>

            <section className="mt-7">
                <div className="mb-4 flex flex-wrap items-end justify-between gap-3">
                    <div>
                        <p className="text-xs font-black uppercase tracking-[0.24em] text-[var(--cm-primary)]">Priority</p>
                        <h2 className="text-3xl font-black tracking-[-0.06em] text-[var(--cm-text)]">Study Session penting</h2>
                    </div>
                    <Link href="/study-sessions/create" className="cm-btn cm-btn-primary">
                        Buat Session
                    </Link>
                </div>

                {pinnedSession ? (
                    <StudySessionCard session={pinnedSession} featured />
                ) : (
                    <div className="cm-card cm-panel text-center">
                        <p className="text-lg font-black">Belum ada sesi aktif.</p>
                        <p className="mt-2 text-sm font-semibold text-[var(--cm-muted)]">Bikin satu sesi dulu, jangan nunggu ilham turun dari langit backend.</p>
                        <Link href="/study-sessions/create" className="cm-btn cm-btn-primary mt-5 inline-flex">Create Session</Link>
                    </div>
                )}
            </section>

            <section className="mt-7 grid gap-6 lg:grid-cols-[1.35fr_.65fr]">
                <div className="cm-card cm-panel">
                    <div className="mb-4 flex items-center justify-between gap-3">
                        <div>
                            <p className="text-xs font-black uppercase tracking-[0.22em] text-[var(--cm-subtle)]">Next Up</p>
                            <h2 className="text-2xl font-black tracking-[-0.05em]">Upcoming Study Sessions</h2>
                        </div>
                        <Link href="/study-sessions" className="font-black text-[var(--cm-primary)]">View all</Link>
                    </div>

                    <div className="grid gap-4">
                        {upcomingSessions.length ? upcomingSessions.map((session) => (
                            <StudySessionCard key={session.id} session={session} />
                        )) : (
                            <p className="rounded-2xl border border-dashed border-[var(--cm-border)] p-5 text-sm font-semibold text-[var(--cm-muted)]">
                                Belum ada sesi aktif.
                            </p>
                        )}
                    </div>
                </div>

                <aside className="space-y-6">
                    <div className="cm-card cm-panel">
                        <div className="flex items-center justify-between">
                            <h2 className="text-xl font-black tracking-[-0.04em]">Today’s Schedule</h2>
                            <Link href="/schedule" className="text-sm font-black text-[var(--cm-primary)]">Manage</Link>
                        </div>
                        <div className="mt-4 space-y-3">
                            {todayClasses.length ? todayClasses.map((item) => (
                                <div key={item.id} className="rounded-2xl border border-[var(--cm-border)] bg-[var(--cm-surface)]/70 p-4">
                                    <p className="font-black">{item.course?.name || item.title}</p>
                                    <p className="mt-1 text-xs font-bold text-[var(--cm-muted)]">{item.room || 'Room TBD'}</p>
                                    <p className="mt-2 text-sm font-black text-[var(--cm-primary)]">{item.start_time} - {item.end_time}</p>
                                </div>
                            )) : (
                                <p className="text-sm font-semibold text-[var(--cm-muted)]">Ga ada kelas hari ini. Jangan langsung buka game, Pi.</p>
                            )}
                        </div>
                    </div>

                    <div className="cm-card cm-panel">
                        <h2 className="text-xl font-black tracking-[-0.04em]">My Badges</h2>
                        <div className="mt-4 space-y-3">
                            {safeBadges.map((badge) => (
                                <div key={badge.name} className="flex gap-3 rounded-2xl border border-[var(--cm-border)] bg-[var(--cm-surface)]/70 p-4">
                                    <div className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-[var(--cm-primary-soft)] text-lg">{badge.icon}</div>
                                    <div>
                                        <p className="font-black">{badge.name}</p>
                                        <p className="mt-1 text-xs font-semibold text-[var(--cm-muted)]">{badge.description}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </aside>
            </section>
        </CampusLayout>
    );
}
