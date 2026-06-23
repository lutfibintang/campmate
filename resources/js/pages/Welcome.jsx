import React from 'react';
import { Link } from '@inertiajs/react';
import Brand from '../components/Brand';

function CountBadge({ value = 0 }) {
    return (
        <div className="flex w-full items-center justify-between gap-4 rounded-[1.8rem] border border-[var(--cm-border)] bg-[var(--cm-card)]/75 px-5 py-4 shadow-[0_20px_70px_rgba(0,0,0,.16)] backdrop-blur">
            <div>
                <p className="text-xs font-black uppercase tracking-[.28em] text-[var(--cm-subtle)]">Live Counter</p>
                <p className="mt-1 text-base font-black text-[var(--cm-text)]">Active Study Sessions</p>
                <p className="mt-1 text-sm font-bold text-[var(--cm-muted)]">Update dari database real-time.</p>
            </div>

            <div className="grid h-16 min-w-16 place-items-center rounded-3xl border border-[var(--cm-border)] bg-[var(--cm-primary)]/15 px-5 text-4xl font-black text-[var(--cm-primary)]">
                {value}
            </div>
        </div>
    );
}

function LiveSessionCard({ session, loggedIn }) {
    if (!session) {
        return (
            <section className="cm-card cm-panel cm-spotlight min-h-[300px] content-center text-center">
                <span className="cm-badge">Today • Live</span>
                <h2 className="mt-6 text-4xl font-black tracking-[-0.06em]">Belum ada session aktif</h2>
                <p className="mx-auto mt-3 max-w-md text-[var(--cm-muted)]">
                    Begitu ada study session open, kartu kanan ini bakal otomatis nampilin data terdekat.
                </p>
                <Link href="/study-sessions" className="cm-btn cm-btn-primary mt-7">
                    Lihat Study Session
                </Link>
            </section>
        );
    }

    const joinMethod = session.join_method === 'post' ? 'post' : 'get';
    const joinLabel = loggedIn ? 'Join sekarang →' : 'Login buat join →';

    return (
        <section className="cm-card cm-panel cm-spotlight overflow-visible">
            <div className="flex flex-wrap items-center justify-between gap-3">
                <span className="cm-badge">Today • Live</span>
                <span className="rounded-full border border-[var(--cm-border)] bg-[var(--cm-card-soft)] px-4 py-2 text-xs font-black uppercase tracking-[.22em] text-[var(--cm-primary)]">
                    {session.subject}
                </span>
            </div>

            <div className="mt-6 rounded-[2rem] border border-[var(--cm-border)] bg-[var(--cm-card-soft)]/70 p-5">
                <p className="text-xs font-black uppercase tracking-[.32em] text-[var(--cm-subtle)]">
                    Next Study Session
                </p>
                <h2 className="mt-4 text-4xl font-black tracking-[-0.06em] text-[var(--cm-text)]">
                    {session.title}
                </h2>
                <p className="mt-3 text-[var(--cm-muted)]">
                    {session.type} · {session.location}{session.meeting ? ` · ${session.meeting}` : ''}
                </p>
                <p className="mt-2 text-sm font-bold text-[var(--cm-subtle)]">
                    {session.date} · {session.time}
                </p>
            </div>

            <div className="mt-6 rounded-full bg-[var(--cm-card-soft)] p-1">
                <div
                    className="h-3 rounded-full bg-[var(--cm-primary)] transition-all duration-500"
                    style={{ width: `${session.progress ?? 0}%` }}
                />
            </div>

            <div className="mt-5 flex flex-wrap items-center justify-between gap-4 rounded-[1.7rem] border border-[var(--cm-border)] px-5 py-4">
                <b className="text-xl">
                    {session.joined_count}/{session.max_participants} peserta
                </b>

                <div className="flex gap-2">
                    <Link href={session.show_url ?? '/login'} className="cm-btn cm-btn-ghost">
                        Detail
                    </Link>
                    <Link
                        href={session.join_url ?? '/login'}
                        method={joinMethod}
                        as={joinMethod === 'post' ? 'button' : 'a'}
                        data={joinMethod === 'post' ? { force_join: false } : {}}
                        preserveScroll
                        className="cm-btn cm-btn-primary"
                    >
                        {joinLabel}
                    </Link>
                </div>
            </div>
        </section>
    );
}

export default function Welcome({ stats = {}, liveSession = null, authState = {} }) {
    const activeSessions = stats?.activeSessions ?? stats?.sessions ?? 0;
    const loggedIn = Boolean(authState?.loggedIn);

    return (
        <div className="cm-page overflow-x-visible">
            <nav className="cm-shell flex items-center justify-between py-6">
                <Brand />

                <div className="flex gap-2">
                    <Link href="/login" className="cm-btn cm-btn-ghost">Login</Link>
                    <Link href="/register" className="cm-btn cm-btn-primary">Register</Link>
                </div>
            </nav>

            <main className="cm-shell grid min-h-[calc(100vh-110px)] items-start gap-10 py-6 lg:grid-cols-[minmax(0,1.12fr)_minmax(420px,.88fr)] lg:gap-14 lg:py-8 xl:grid-cols-[minmax(0,1.2fr)_minmax(460px,.8fr)]">
                <section className="pt-8 text-center lg:pt-10">
                    <span className="cm-badge">Academic Companion Platform</span>

                    <h1 className="mx-auto mt-6 w-full max-w-[980px] overflow-visible px-4 text-center text-[clamp(3.4rem,6vw,6.8rem)] font-black leading-[.92] tracking-[-0.065em] sm:px-6 lg:max-w-[1080px]">
                            <div className="block bg-gradient-to-r from-[var(--cm-primary)] via-[#f4f7d8] to-[var(--cm-text)] bg-clip-text text-transparent">
                                CampMate
                            </div>
                            <span className="block text-[var(--cm-text)]">
                                bikin belajar kampus
                            </span>
                            <span className="block text-[var(--cm-text)]">
                                lebih rapi
                            </span>
                    </h1>

                    <p className="mx-auto mt-7 max-w-3xl text-xl leading-8 text-[var(--cm-muted)]">
                        Kelola jadwal kuliah semester ini, bikin study session, lihat calendar,
                        dan join sesi belajar bareng teman sehobi bukan sehati.
                    </p>

                    <div className="mt-8 flex flex-wrap justify-center gap-3">
                        <Link href="/dashboard" className="cm-btn cm-btn-primary">Masuk Dashboard</Link>
                        <Link href="/study-sessions" className="cm-btn cm-btn-ghost">Lihat Study Session</Link>
                    </div>
                </section>

                <aside className="flex flex-col gap-5 lg:pt-16 xl:pt-14">
                    <LiveSessionCard session={liveSession} loggedIn={loggedIn} />
                    <CountBadge value={activeSessions} />
                </aside>
            </main>
        </div>
    );
}
