import React from 'react';
import { Link, router, usePage } from '@inertiajs/react';
import CampusLayout from '../../layouts/CampusLayout';

function StatCard({ label, value, caption, icon }) {
    return (
        <article className="cm-card cm-panel relative overflow-hidden">
            <div className="absolute -right-6 -top-6 grid h-24 w-24 place-items-center rounded-full bg-[var(--cm-primary)]/10 text-4xl">
                {icon}
            </div>
            <p className="text-xs font-black uppercase tracking-[.28em] text-[var(--cm-subtle)]">{label}</p>
            <h3 className="mt-4 text-5xl font-black tracking-[-.08em] text-[var(--cm-text)]">{value}</h3>
            <p className="mt-2 text-sm font-bold text-[var(--cm-muted)]">{caption}</p>
        </article>
    );
}

function EmptyState({ children }) {
    return (
        <div className="rounded-[1.5rem] border border-dashed border-[var(--cm-border)] bg-[var(--cm-card-soft)] p-5 text-center text-sm font-bold text-[var(--cm-muted)]">
            {children}
        </div>
    );
}

export default function Dashboard({ stats = {}, latestUsers = [], latestSessions = [] }) {
    const { auth } = usePage().props;
    const user = auth?.user;

    const deleteSession = (session) => {
        if (!confirm(`Hapus study session "${session.title}"?`)) return;

        router.delete(`/study-sessions/${session.id}`, {
            preserveScroll: true,
        });
    };

    return (
        <CampusLayout
            title="Admin Dashboard"
            subtitle={`Control panel CampusMate. Login sebagai ${user?.name || 'Admin'}, bukan dashboard user yang menyamar pake jas.`}
        >
            <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                <StatCard
                    label="Total Users"
                    value={stats.totalUsers ?? 0}
                    caption={`${stats.totalAdmins ?? 0} admin terdaftar`}
                    icon="👥"
                />
                <StatCard
                    label="Study Sessions"
                    value={stats.totalStudySessions ?? 0}
                    caption={`${stats.activeStudySessions ?? 0} session aktif`}
                    icon="📚"
                />
                <StatCard
                    label="Courses"
                    value={stats.totalCourses ?? 0}
                    caption="Data mata kuliah user"
                    icon="🎓"
                />
                <StatCard
                    label="Schedules"
                    value={stats.totalSchedules ?? 0}
                    caption="Total jadwal kuliah"
                    icon="🗓️"
                />
            </section>

            <section className="mt-6 grid gap-6 xl:grid-cols-[.9fr_1.1fr]">
                <article className="cm-card cm-panel">
                    <div className="flex items-center justify-between gap-4">
                        <div>
                            <p className="text-xs font-black uppercase tracking-[.28em] text-[var(--cm-subtle)]">Users</p>
                            <h2 className="mt-2 text-3xl font-black tracking-[-.06em] text-[var(--cm-text)]">Latest Users</h2>
                        </div>
                        <span className="cm-badge">{stats.totalUsers ?? 0} total</span>
                    </div>

                    <div className="mt-5 grid gap-3">
                        {latestUsers.length ? latestUsers.map((item) => (
                            <div
                                key={item.id}
                                className="flex items-center justify-between gap-4 rounded-[1.4rem] border border-[var(--cm-border)] bg-[var(--cm-card-soft)] p-4"
                            >
                                <div className="min-w-0">
                                    <p className="truncate font-black text-[var(--cm-text)]">{item.name}</p>
                                    <p className="truncate text-sm font-bold text-[var(--cm-muted)]">{item.email}</p>
                                </div>
                                <div className="text-right">
                                    <span className="rounded-full border border-[var(--cm-border)] px-3 py-1 text-xs font-black uppercase text-[var(--cm-primary)]">
                                        {item.role ?? 'user'}
                                    </span>
                                    <p className="mt-2 text-xs font-bold text-[var(--cm-subtle)]">{item.created_at}</p>
                                </div>
                            </div>
                        )) : (
                            <EmptyState>Belum ada user.</EmptyState>
                        )}
                    </div>
                </article>

                <article className="cm-card cm-panel">
                    <div className="flex flex-wrap items-center justify-between gap-4">
                        <div>
                            <p className="text-xs font-black uppercase tracking-[.28em] text-[var(--cm-subtle)]">Study Sessions</p>
                            <h2 className="mt-2 text-3xl font-black tracking-[-.06em] text-[var(--cm-text)]">Latest Sessions</h2>
                        </div>
                        <Link href="/study-sessions" className="cm-btn cm-btn-ghost">Manage Sessions</Link>
                    </div>

                    <div className="mt-5 overflow-x-auto">
                        {latestSessions.length ? (
                            <table className="w-full min-w-[760px] text-left text-sm">
                                <thead className="text-[var(--cm-muted)]">
                                    <tr>
                                        <th className="p-3">Title</th>
                                        <th className="p-3">Creator</th>
                                        <th className="p-3">Date</th>
                                        <th className="p-3">Status</th>
                                        <th className="p-3 text-right">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {latestSessions.map((session) => (
                                        <tr key={session.id} className="border-t border-[var(--cm-border)]">
                                            <td className="p-3">
                                                <b className="text-[var(--cm-text)]">{session.title}</b>
                                                <p className="text-xs font-bold text-[var(--cm-muted)]">{session.subject}</p>
                                            </td>
                                            <td className="p-3 text-[var(--cm-muted)]">{session.creator}</td>
                                            <td className="p-3 text-[var(--cm-muted)]">{session.date} · {session.time}</td>
                                            <td className="p-3">
                                                <span className="rounded-full bg-[var(--cm-primary)]/15 px-3 py-1 text-xs font-black uppercase text-[var(--cm-primary)]">
                                                    {session.status_label || session.status}
                                                </span>
                                            </td>
                                            <td className="p-3 text-right">
                                                <div className="flex justify-end gap-2">
                                                    <Link href={`/study-sessions/${session.id}`} className="cm-btn cm-btn-ghost px-4 py-2 text-xs">
                                                        Detail
                                                    </Link>
                                                    <Link href={`/study-sessions/${session.id}/edit`} className="cm-btn cm-btn-ghost px-4 py-2 text-xs">
                                                        Edit
                                                    </Link>
                                                    <button
                                                        type="button"
                                                        onClick={() => deleteSession(session)}
                                                        className="cm-btn px-4 py-2 text-xs text-[var(--cm-danger)]"
                                                    >
                                                        Delete
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        ) : (
                            <EmptyState>Belum ada study session.</EmptyState>
                        )}
                    </div>
                </article>
            </section>
        </CampusLayout>
    );
}
