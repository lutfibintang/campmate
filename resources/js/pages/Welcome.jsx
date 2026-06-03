import React from 'react';
import { Link } from '@inertiajs/react';
import Brand from '../components/Brand';
import StatCard from '../components/StatCard';

export default function Welcome({ stats = {} }) {
    return (
        <div className="cm-page">
            <nav className="cm-shell flex items-center justify-between py-6">
                <Brand />
                <div className="flex gap-2">
                    <Link href="/login" className="cm-btn cm-btn-ghost">Login</Link>
                    <Link href="/register" className="cm-btn cm-btn-primary">Register</Link>
                </div>
            </nav>
            <main className="cm-shell grid min-h-[calc(100vh-110px)] items-center gap-10 py-10 lg:grid-cols-[1fr_.9fr]">
                <section>
                    <span className="cm-badge">Academic Companion Platform</span>
                    <h1 className="cm-hero-title mt-6 font-black"><span className="cm-gradient">CampusMate</span><br/>bikin belajar kampus lebih rapi.</h1>
                    <p className="mt-7 max-w-2xl text-xl leading-8 text-[var(--cm-muted)]">Kelola jadwal kuliah semester ini, bikin study session, cek bentrok jadwal, lihat calendar, dan kumpulin badge belajar. Bukan CRUD polos yang cuma dikasih logo terus ngaku sistem informasi.</p>
                    <div className="mt-8 flex flex-wrap gap-3">
                        <Link href="/dashboard" className="cm-btn cm-btn-primary">Masuk Dashboard</Link>
                        <Link href="/study-sessions" className="cm-btn cm-btn-ghost">Lihat Study Session</Link>
                    </div>
                    <div className="mt-8 grid gap-4 sm:grid-cols-3">
                        <StatCard value={1} label="Module" detail="Study Platform" icon="✦" />
                        <StatCard value={stats?.activeSessions ?? 0} label="Sessions" detail="Active groups" icon="☕" />
                        <StatCard value={stats?.courses ?? 0} label="Courses" detail="Semester schedule" icon="📚" />
                    </div>
                </section>
                <section className="grid gap-5">
                    <div className="cm-card cm-panel cm-spotlight">
                        <div className="flex items-center justify-between"><span className="cm-badge">Today</span><b className="text-[var(--cm-success)]">● Live</b></div>
                        <h2 className="mt-5 text-4xl font-black tracking-[-0.06em]">Belajar Laravel Bareng</h2>
                        <p className="mt-2 text-[var(--cm-muted)]">Hybrid · Perpustakaan FMIPA · Google Meet available</p>
                        <div className="mt-7 h-2 rounded-full bg-[var(--cm-card-soft)]"><div className="h-2 w-3/5 rounded-full bg-[var(--cm-primary)]" /></div>
                        <div className="mt-4 flex items-center justify-between"><b>3/5 peserta</b><span>Join →</span></div>
                    </div>
                    <div className="grid gap-5 md:grid-cols-2">
                        <div className="cm-card-compact p-6"><span className="cm-badge">Schedule</span><h3 className="mt-4 text-xl font-black">Basis Data</h3><p className="mt-2 text-[var(--cm-muted)]">Senin · 08:00–09:40 · Ruang A2.3</p></div>
                        <div className="cm-card-compact p-6"><span className="cm-badge">Warning</span><h3 className="mt-4 text-xl font-black">Jadwal Bentrok</h3><p className="mt-2 text-[var(--cm-muted)]">Modal muncul kalau session nabrak mata kuliah.</p></div>
                    </div>
                </section>
            </main>
        </div>
    );
}
