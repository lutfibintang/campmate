import React from 'react';
import { Link } from '@inertiajs/react';
import CampusLayout from '../layouts/CampusLayout';
import StatCard from '../components/StatCard';

export default function Dashboard({ stats = {}, todayClasses = [], upcomingSessions = [], badges = [] }) {
    return (
        <CampusLayout title={`Halo, ${stats?.name || 'User Demo'}`} subtitle="Ringkasan jadwal, sesi belajar, dan progress lu hari ini.">
            <div className="grid gap-5 md:grid-cols-3">
                <StatCard value={stats.todayClasses ?? todayClasses.length ?? 0} label="Kelas Hari Ini" detail="Jadwal aktif" icon="📚" />
                <StatCard value={stats.upcomingSessions ?? upcomingSessions.length ?? 0} label="Upcoming Sessions" detail="Sesi terbuka" icon="☕" />
                <StatCard value={stats.studyHours ?? 0} label="Study Hours" detail="Minggu ini" icon="⏱" />
            </div>
            <div className="mt-7 grid gap-6 lg:grid-cols-2">
                <section className="cm-card cm-panel">
                    <div className="flex items-center justify-between"><h2 className="text-2xl font-black tracking-[-0.05em]">Today’s Schedule</h2><Link href="/schedule" className="font-bold text-[var(--cm-primary)]">Manage</Link></div>
                    <div className="mt-5 grid gap-3">
                        {todayClasses.length ? todayClasses.map((item) => (
                            <div key={item.id} className="cm-card-compact flex items-center justify-between p-4">
                                <div><b>{item.course?.name || item.title}</b><p className="text-sm text-[var(--cm-muted)]">{item.room || 'Room TBD'}</p></div>
                                <span className="text-sm font-bold text-[var(--cm-muted)]">{item.start_time} - {item.end_time}</span>
                            </div>
                        )) : <p className="text-[var(--cm-muted)]">Ga ada kelas hari ini. Jangan langsung buka game, Pi.</p>}
                    </div>
                </section>
                <section className="cm-card cm-panel">
                    <div className="flex items-center justify-between"><h2 className="text-2xl font-black tracking-[-0.05em]">Upcoming Study Sessions</h2><Link href="/study-sessions" className="font-bold text-[var(--cm-primary)]">View all</Link></div>
                    <div className="mt-5 grid gap-3">
                        {upcomingSessions.length ? upcomingSessions.map((s) => (
                            <Link key={s.id} href={`/study-sessions/${s.id}`} className="cm-card-compact block p-4 transition hover:border-[var(--cm-primary)]">
                                <b>{s.title}</b><p className="text-sm text-[var(--cm-muted)]">{s.subject?.name || 'General'} · {s.session_date} · {s.start_time}</p>
                            </Link>
                        )) : <p className="text-[var(--cm-muted)]">Belum ada sesi aktif.</p>}
                    </div>
                </section>
            </div>
            <section className="cm-card cm-panel mt-7">
                <h2 className="text-2xl font-black tracking-[-0.05em]">My Badges</h2>
                <div className="mt-5 grid gap-4 md:grid-cols-3">
                    {(badges.length ? badges : [{ icon: '🌱', name: 'Fresh Learner', description: 'Akun aktif dan siap ikut sesi belajar.' }]).map((badge) => (
                        <div key={badge.name} className="cm-card-compact p-5"><div className="text-3xl">{badge.icon}</div><b className="mt-3 block">{badge.name}</b><p className="mt-1 text-sm text-[var(--cm-muted)]">{badge.description}</p></div>
                    ))}
                </div>
            </section>
        </CampusLayout>
    );
}
