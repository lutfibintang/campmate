import React from 'react';
import { Link, usePage } from '@inertiajs/react';
import CampusLayout from '../../layouts/CampusLayout';

function StatCard({ label, value, icon, caption }) {
    return (
        <article className="cm-card cm-panel">
            <div className="flex items-start justify-between gap-4">
                <div>
                    <p className="text-xs font-black uppercase tracking-[.28em] text-[var(--cm-subtle)]">{label}</p>
                    <h3 className="mt-3 text-5xl font-black tracking-[-0.07em] text-[var(--cm-primary)]">{value}</h3>
                    {caption && <p className="mt-2 text-sm font-bold text-[var(--cm-muted)]">{caption}</p>}
                </div>
                <div className="grid h-14 w-14 place-items-center rounded-2xl border border-[var(--cm-border)] bg-[var(--cm-primary)]/15 text-2xl">
                    {icon}
                </div>
            </div>
        </article>
    );
}

export default function Dashboard({ stats = {}, latestUsers = [], latestSessions = [] }) {
    const { auth } = usePage().props;
    const user = auth?.user;

    return (
        <CampusLayout
            title="Admin Dashboard"
            subtitle={`Welcome back, ${user?.name ?? 'Admin'}. Panel ini buat mantau CampusMate tanpa harus ngintip database manual kayak arkeolog.`}
        >
            <section className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
                <StatCard label="Total Users" value={stats.totalUsers ?? 0} icon="👥" caption="Semua akun terdaftar" />
                <StatCard label="Admins" value={stats.totalAdmins ?? 0} icon="🛡️" caption="Akun role admin" />
                <StatCard label="Study Sessions" value={stats.totalStudySessions ?? 0} icon="📚" caption="Total sesi belajar" />
                <StatCard label="Active Sessions" value={stats.activeStudySessions ?? 0} icon="⚡" caption="Open atau full" />
            </section>

            <section className="mt-6 grid gap-6 xl:grid-cols-[.8fr_1.2fr]">
                <article className="cm-card cm-panel">
                    <div className="flex items-center justify-between gap-3">
                        <div>
                            <p className="text-xs font-black uppercase tracking-[.32em] text-[var(--cm-subtle)]">Users</p>
                            <h2 className="mt-2 text-3xl font-black tracking-[-0.06em]">Latest Users</h2>
                        </div>
                        <span className="cm-badge">{stats.totalUsers ?? 0} total</span>
                    </div>

                    <div className="mt-5 grid gap-3">
                        {latestUsers.length ? latestUsers.map((item) => (
                            <div key={item.id} className="rounded-[1.5rem] border border-[var(--cm-border)] bg-[var(--cm-card-soft)] p-4">
                                <div className="flex items-center justify-between gap-3">
                                    <div>
                                        <b>{item.name}</b>
                                        <p className="mt-1 text-sm font-semibold text-[var(--cm-muted)]">{item.email}</p>
                                    </div>
                                    <span className="rounded-full border border-[var(--cm-border)] px-3 py-1 text-xs font-black uppercase tracking-[.18em] text-[var(--cm-primary)]">
                                        {item.role ?? 'user'}
                                    </span>
                                </div>
                                <p className="mt-2 text-xs font-bold text-[var(--cm-subtle)]">Joined {item.created_at}</p>
                            </div>
                        )) : (
                            <p className="text-sm font-semibold text-[var(--cm-muted)]">Belum ada user.</p>
                        )}
                    </div>
                </article>

                <article className="cm-card cm-panel">
                    <div className="flex flex-wrap items-center justify-between gap-3">
                        <div>
                            <p className="text-xs font-black uppercase tracking-[.32em] text-[var(--cm-subtle)]">Study Sessions</p>
                            <h2 className="mt-2 text-3xl font-black tracking-[-0.06em]">Latest Sessions</h2>
                        </div>
                        <Link href="/study-sessions" className="cm-btn cm-btn-primary">Manage Sessions</Link>
                    </div>

                    <div className="mt-5 overflow-x-auto">
                        <table className="w-full min-w-[760px] text-left text-sm">
                            <thead className="text-xs uppercase tracking-[.22em] text-[var(--cm-subtle)]">
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
                                            <b>{session.title}</b>
                                            <p className="mt-1 text-xs font-bold text-[var(--cm-muted)]">{session.subject}</p>
                                        </td>
                                        <td className="p-3 text-[var(--cm-muted)]">{session.creator}</td>
                                        <td className="p-3 text-[var(--cm-muted)]">{session.date} · {session.time}</td>
                                        <td className="p-3">
                                            <span className="rounded-full border border-[var(--cm-border)] px-3 py-1 text-xs font-black uppercase tracking-[.18em] text-[var(--cm-primary)]">
                                                {session.status}
                                            </span>
                                        </td>
                                        <td className="p-3 text-right">
                                            <Link href={`/study-sessions/${session.id}`} className="font-black text-[var(--cm-primary)]">
                                                Detail →
                                            </Link>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </article>
            </section>
        </CampusLayout>
    );
}
