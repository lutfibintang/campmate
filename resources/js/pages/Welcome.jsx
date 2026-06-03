import React from 'react';
import { Link } from '@inertiajs/react';
import Brand from '../Components/Brand';
import StatCard from '../Components/StatCard';

export default function Welcome({ stats = {} }) {
    return (
        <div className="min-h-screen overflow-hidden bg-[var(--cm-bg)] text-[var(--cm-text)]">
            <header className="cm-shell flex items-center justify-between py-6">
                <Brand href="/" />
                <div className="flex gap-3">
                    <Link href="/login" className="cm-btn cm-btn-ghost">Login</Link>
                    <Link href="/register" className="cm-btn cm-btn-primary">Register</Link>
                </div>
            </header>
            <main className="cm-shell grid min-h-[76vh] items-center gap-12 py-12 lg:grid-cols-[1.05fr_.95fr]">
                <section>
                    <span className="cm-badge">Academic companion platform</span>
                    <h1 className="mt-7 text-6xl font-black leading-[.93] tracking-[-.075em] md:text-8xl">
                        CampusMate bikin belajar kampus lebih rapi.
                    </h1>
                    <p className="mt-7 max-w-2xl text-lg leading-8 text-[var(--cm-muted)]">
                        Kelola jadwal kuliah semester ini, bikin study session, cek bentrok jadwal, lihat calendar, dan kumpulin badge belajar. Bukan CRUD polos yang cuma dikasih logo terus ngaku sistem informasi.
                    </p>
                    <div className="mt-8 flex flex-wrap gap-3">
                        <Link href="/dashboard" className="cm-btn cm-btn-primary">Masuk Dashboard</Link>
                        <Link href="/study-sessions" className="cm-btn cm-btn-soft">Lihat Study Session</Link>
                    </div>
                    <div className="mt-8 grid gap-4 sm:grid-cols-3">
                        <StatCard value={1} label="Module" detail="Study Together" icon="01" />
                        <StatCard value={stats.sessions ?? 0} label="Sessions" detail="Active study groups" icon="02" />
                        <StatCard value={stats.classes ?? 0} label="Classes" detail="Semester schedule" icon="03" />
                    </div>
                </section>
                <section className="cm-card cm-grid-lines p-6">
                    <div className="cm-card-compact p-6">
                        <div className="flex items-center justify-between">
                            <span className="cm-badge">Today</span>
                            <span className="font-black text-[var(--cm-success)]">● Live</span>
                        </div>
                        <h2 className="mt-5 text-3xl font-black">Belajar Laravel Bareng</h2>
                        <p className="mt-2 text-[var(--cm-muted)]">Hybrid · Perpustakaan FMIPA · Google Meet available</p>
                        <div className="mt-7 h-2 overflow-hidden rounded-full bg-[var(--cm-card-soft)]">
                            <div className="h-full w-3/5 rounded-full bg-[var(--cm-primary)]" />
                        </div>
                        <div className="mt-4 flex items-center justify-between font-black"><span>3/5 peserta</span><span>Join →</span></div>
                    </div>
                    <div className="mt-5 grid gap-5 sm:grid-cols-2">
                        <div className="cm-card-compact p-5"><span className="cm-badge">Schedule</span><h3 className="mt-4 font-black">Basis Data</h3><p className="mt-2 text-sm leading-6 text-[var(--cm-muted)]">Senin · 08:00–09:40 · Ruang A2.3</p></div>
                        <div className="cm-card-compact p-5"><span className="cm-badge">Warning</span><h3 className="mt-4 font-black">Jadwal Bentrok</h3><p className="mt-2 text-sm leading-6 text-[var(--cm-muted)]">Modal muncul kalau session nabrak mata kuliah.</p></div>
                    </div>
                </section>
            </main>
        </div>
    );
}
