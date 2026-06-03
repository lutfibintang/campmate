import React from 'react';
import { Link, usePage } from '@inertiajs/react';
import CampusLayout from '../Layouts/CampusLayout';

export default function Dashboard({ stats = {}, todayClasses = [], upcomingSessions = [], badges = [] }) {
    const { auth } = usePage().props;

    return (
        <CampusLayout title={`Halo, ${stats.name || auth?.user?.name || 'Pi'}`}>
            <div className="grid gap-5 md:grid-cols-3">
                <Stat title="Kelas Hari Ini" value={stats.todayClasses ?? 0} />
                <Stat title="Upcoming Sessions" value={stats.upcomingSessions ?? 0} />
                <Stat title="Study Hours" value={stats.studyHours ?? 0} />
            </div>

            <div className="mt-8 grid gap-6 lg:grid-cols-2">
                <section className="rounded-[2rem] border border-[var(--border)] bg-[var(--card)] p-6">
                    <div className="mb-5 flex items-center justify-between">
                        <h2 className="text-xl font-black">Today's Schedule</h2>
                        <Link href="/schedule" className="text-sm font-black text-[var(--primary)]">Manage</Link>
                    </div>

                    <div className="grid gap-3">
                        {todayClasses.length ? todayClasses.map((item) => (
                            <div key={item.id} className="rounded-2xl bg-[var(--surface)] p-4">
                                <div className="font-black">{item.course?.name || item.course_name}</div>
                                <div className="text-sm text-[var(--muted)]">{item.room || 'Room TBD'} • {item.start_time} - {item.end_time}</div>
                            </div>
                        )) : (
                            <p className="rounded-2xl bg-[var(--surface)] p-4 text-sm text-[var(--muted)]">
                                Ga ada kelas hari ini. Jangan langsung buka game, Pi.
                            </p>
                        )}
                    </div>
                </section>

                <section className="rounded-[2rem] border border-[var(--border)] bg-[var(--card)] p-6">
                    <div className="mb-5 flex items-center justify-between">
                        <h2 className="text-xl font-black">Upcoming Study Sessions</h2>
                        <Link href="/study-sessions" className="text-sm font-black text-[var(--primary)]">View all</Link>
                    </div>

                    <div className="grid gap-3">
                        {upcomingSessions.length ? upcomingSessions.map((session) => (
                            <Link key={session.id} href={`/study-sessions/${session.id}`} className="rounded-2xl bg-[var(--surface)] p-4 transition hover:translate-y-[-2px]">
                                <div className="font-black">{session.title}</div>
                                <div className="text-sm text-[var(--muted)]">
                                    {session.subject?.name || 'General Study'} • {session.session_date} • {session.start_time}
                                </div>
                            </Link>
                        )) : (
                            <p className="rounded-2xl bg-[var(--surface)] p-4 text-sm text-[var(--muted)]">
                                Belum ada sesi aktif.
                            </p>
                        )}
                    </div>
                </section>
            </div>

            <section className="mt-8 rounded-[2rem] border border-[var(--border)] bg-[var(--card)] p-6">
                <h2 className="mb-5 text-xl font-black">My Badges</h2>
                <div className="grid gap-4 md:grid-cols-3">
                    {badges.map((badge) => (
                        <div key={badge.name} className="rounded-2xl bg-[var(--surface)] p-5">
                            <div className="text-3xl">{badge.icon}</div>
                            <div className="mt-3 font-black">{badge.name}</div>
                            <p className="mt-1 text-sm text-[var(--muted)]">{badge.description}</p>
                        </div>
                    ))}
                </div>
            </section>
        </CampusLayout>
    );
}

function Stat({ title, value }) {
    return (
        <div className="rounded-[2rem] border border-[var(--border)] bg-[var(--card)] p-6">
            <div className="text-4xl font-black text-[var(--primary)]">{value}</div>
            <div className="mt-2 text-sm font-black text-[var(--muted)]">{title}</div>
        </div>
    );
}
