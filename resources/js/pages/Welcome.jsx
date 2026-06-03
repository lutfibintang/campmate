import React from 'react';
import { Link, usePage } from '@inertiajs/react';

export default function Welcome({ stats = {} }) {
    const { auth } = usePage().props;
    const user = auth?.user;

    return (
        <div className="min-h-screen bg-[var(--bg)] text-[var(--text)]">
            <header className="mx-auto flex max-w-7xl items-center justify-between px-4 py-6 sm:px-6 lg:px-8">
                <Link href={user ? '/dashboard' : '/'} className="text-xl font-black tracking-tight">
                    CampusMate
                </Link>

                <div className="flex items-center gap-3">
                    {user ? (
                        <Link href="/dashboard" className="rounded-full bg-[var(--primary)] px-5 py-2 text-sm font-black text-white">
                            Dashboard
                        </Link>
                    ) : (
                        <>
                            <Link href="/login" className="rounded-full border border-[var(--border)] px-5 py-2 text-sm font-black">
                                Login
                            </Link>
                            <Link href="/register" className="rounded-full bg-[var(--primary)] px-5 py-2 text-sm font-black text-white">
                                Register
                            </Link>
                        </>
                    )}
                </div>
            </header>

            <main className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[1.05fr_.95fr] lg:px-8">
                <section className="space-y-8">
                    <div className="inline-flex rounded-full border border-[var(--border)] bg-[var(--surface)] px-4 py-2 text-sm font-bold text-[var(--muted)]">
                        Study platform buat mahasiswa yang jadwalnya suka tabrakan.
                    </div>
                    <div className="space-y-5">
                        <h1 className="max-w-4xl text-5xl font-black leading-tight tracking-tight md:text-7xl">
                            Cari teman belajar tanpa ngacak-ngacak grup kelas.
                        </h1>
                        <p className="max-w-2xl text-lg leading-8 text-[var(--muted)]">
                            CampusMate bantu lu bikin sesi belajar, join study group, ngatur jadwal kuliah, sampai ngecek bentrok jadwal sebelum join sesi.
                        </p>
                    </div>

                    <div className="flex flex-wrap gap-3">
                        <Link href={user ? '/study-sessions' : '/register'} className="rounded-2xl bg-[var(--primary)] px-6 py-3 font-black text-white">
                            Mulai Study Together
                        </Link>
                        <Link href={user ? '/schedule' : '/login'} className="rounded-2xl border border-[var(--border)] px-6 py-3 font-black">
                            {user ? 'Atur Jadwal' : 'Login Dulu'}
                        </Link>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-3">
                        <Metric value={stats.modules ?? 1} label="Module" detail="Study Together" />
                        <Metric value={stats.sessions ?? 0} label="Sessions" detail="Active study groups" />
                        <Metric value={stats.classes ?? 0} label="Classes" detail="Semester schedule" />
                    </div>
                </section>

                <section className="rounded-[2rem] border border-[var(--border)] bg-[var(--surface)] p-6 shadow-xl shadow-black/10">
                    <div className="space-y-4">
                        <PreviewCard title="Belajar Laravel Bareng" meta="Hybrid • 19:30 - 21:00" badge="Open" />
                        <PreviewCard title="Basis Data Crash Course" meta="Offline • Lab Komputer" badge="3/6 joined" />
                        <PreviewCard title="Warning Jadwal" meta="Bentrok dengan PBO 13:00 - 14:40" badge="Heads up" />
                    </div>
                </section>
            </main>
        </div>
    );
}

function Metric({ value, label, detail }) {
    return (
        <div className="rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-5">
            <div className="text-4xl font-black text-[var(--primary)]">{value}</div>
            <div className="mt-2 font-black">{label}</div>
            <div className="text-sm text-[var(--muted)]">{detail}</div>
        </div>
    );
}

function PreviewCard({ title, meta, badge }) {
    return (
        <div className="rounded-3xl border border-[var(--border)] bg-[var(--card)] p-5">
            <div className="mb-3 inline-flex rounded-full bg-[var(--primary-soft)] px-3 py-1 text-xs font-black text-[var(--primary)]">
                {badge}
            </div>
            <h3 className="text-xl font-black">{title}</h3>
            <p className="mt-2 text-sm text-[var(--muted)]">{meta}</p>
        </div>
    );
}
