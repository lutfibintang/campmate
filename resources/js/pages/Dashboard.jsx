import React from 'react';
import { Link } from '@inertiajs/react';
import CampusLayout from '../Layouts/CampusLayout';
import StatCard from '../Components/StatCard';

export default function Dashboard({ stats = {}, todayClasses = [], upcomingSessions = [], badges = [] }) {
    return (
        <CampusLayout title={`Welcome back${stats.name ? `, ${stats.name}` : ''} 👋`} subtitle="Ringkasan jadwal kuliah dan study session lu hari ini.">
            <div className="grid gap-5 md:grid-cols-4">
                <StatCard value={stats.upcomingSessions ?? 0} label="Upcoming Sessions" detail="Study group aktif" icon="S" />
                <StatCard value={stats.todayClasses ?? 0} label="Today's Classes" detail="Jadwal kuliah hari ini" icon="C" />
                <StatCard value={stats.studyHours ?? 0} label="Study Hours" detail="Total estimasi minggu ini" icon="H" />
                <StatCard value={badges.length ?? 0} label="Badges" detail="Achievement belajar" icon="B" />
            </div>
            <div className="mt-7 grid gap-6 lg:grid-cols-[.95fr_1.05fr]">
                <section className="cm-card p-6">
                    <div className="flex items-center justify-between"><h2 className="text-xl font-black">Today's Schedule</h2><Link href="/schedule" className="text-sm font-black text-[var(--cm-primary)]">Manage</Link></div>
                    <div className="mt-5 grid gap-3">
                        {todayClasses.length ? todayClasses.map((item) => (
                            <div key={item.id} className="cm-card-compact flex items-center justify-between gap-4 p-4">
                                <div><b>{item.course.name}</b><p className="text-sm text-[var(--cm-muted)]">{item.room || 'Room TBD'}</p></div>
                                <span className="font-black text-[var(--cm-primary)]">{item.start_time} - {item.end_time}</span>
                            </div>
                        )) : <p className="text-[var(--cm-muted)]">Ga ada kelas hari ini. Jangan langsung buka game, Pi.</p>}
                    </div>
                </section>
                <section className="cm-card p-6">
                    <div className="flex items-center justify-between"><h2 className="text-xl font-black">Upcoming Study Sessions</h2><Link href="/study-sessions" className="text-sm font-black text-[var(--cm-primary)]">View all</Link></div>
                    <div className="mt-5 grid gap-3">
                        {upcomingSessions.map((s) => (
                            <Link href={`/study-sessions/${s.id}`} key={s.id} className="cm-card-compact flex items-center justify-between gap-5 p-4 hover:border-[var(--cm-primary)]">
                                <div><b>{s.title}</b><p className="text-sm text-[var(--cm-muted)]">{s.subject?.name} · {s.session_date} · {s.start_time}</p></div>
                                <span className="cm-badge cm-status-open">{s.status_label}</span>
                            </Link>
                        ))}
                    </div>
                </section>
            </div>
            <section className="cm-card mt-7 p-6">
                <h2 className="text-xl font-black">My Badges</h2>
                <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    {badges.map((badge) => <div key={badge.name} className="cm-card-compact p-5"><div className="text-3xl">{badge.icon}</div><b className="mt-4 block">{badge.name}</b><p className="mt-2 text-sm text-[var(--cm-muted)]">{badge.description}</p></div>)}
                </div>
            </section>
        </CampusLayout>
    );
}
