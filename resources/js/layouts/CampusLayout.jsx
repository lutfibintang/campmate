import React, { useEffect, useState } from 'react';
import { Link, router, usePage } from '@inertiajs/react';
import Brand from '../Components/Brand';

function ThemeToggle() {
    const [theme, setTheme] = useState(() => localStorage.getItem('cm-theme') || 'dark');
    useEffect(() => {
        document.documentElement.dataset.theme = theme === 'light' ? 'light' : 'dark';
        localStorage.setItem('cm-theme', theme);
    }, [theme]);
    return (
        <button className="cm-btn cm-btn-ghost px-4 py-2 text-sm" onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
            {theme === 'dark' ? 'Light' : 'Dark'}
        </button>
    );
}

function StaggeredMenu({ open, setOpen, user }) {
    useEffect(() => {
        document.body.classList.toggle('cm-no-scroll', open);
        const close = (e) => e.key === 'Escape' && setOpen(false);
        document.addEventListener('keydown', close);
        return () => {
            document.body.classList.remove('cm-no-scroll');
            document.removeEventListener('keydown', close);
        };
    }, [open]);

    const links = [
        ['Dashboard', '/dashboard', 'Ringkasan belajar lu'],
        ['Study Sessions', '/study-sessions', 'Cari atau bikin sesi'],
        ['My Schedule', '/schedule', 'Jadwal mata kuliah semester ini'],
        ['Calendar', '/calendar', 'Kuliah + sesi belajar'],
        ['Leaderboard', '/leaderboard', 'XP & badges'],
        ['Profile', '/profile', 'Nama, foto, password'],
    ];

    return (
        <>
            {!open && (
                <button className="fixed right-6 top-6 z-40 cm-btn cm-btn-soft" onClick={() => setOpen(true)}>
                    • • Menu
                </button>
            )}
            <div className={`fixed inset-0 z-50 transition ${open ? 'pointer-events-auto bg-black/45 backdrop-blur-sm opacity-100' : 'pointer-events-none opacity-0'}`} onClick={() => setOpen(false)}>
                <aside onClick={(e) => e.stopPropagation()} className={`cm-scrollbar-hidden absolute right-4 top-4 h-[calc(100vh-2rem)] w-[min(430px,calc(100vw-2rem))] overflow-y-auto rounded-[32px] border border-[var(--cm-border)] bg-[var(--cm-surface)] p-6 shadow-2xl transition duration-300 ${open ? 'translate-x-0' : 'translate-x-[110%]'}`}>
                    <div className="flex items-start justify-between gap-4">
                        <div>
                            <span className="cm-badge">Navigation</span>
                            <h2 className="mt-4 text-3xl font-black text-[var(--cm-text)]">Where to, Pi?</h2>
                        </div>
                        <button className="cm-btn cm-btn-ghost h-11 w-11 p-0" onClick={() => setOpen(false)}>×</button>
                    </div>
                    <div className="mt-7 grid gap-3">
                        {links.map(([label, href, caption], i) => (
                            <Link key={href} href={href} style={{ transitionDelay: `${i * 35}ms` }} className={`cm-card-compact flex items-center justify-between gap-4 p-4 transition ${open ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
                                <div>
                                    <b className="text-[var(--cm-text)]">{label}</b>
                                    <p className="mt-1 text-sm text-[var(--cm-muted)]">{caption}</p>
                                </div>
                                <span>→</span>
                            </Link>
                        ))}
                    </div>
                    <div className="mt-6 flex flex-wrap gap-3">
                        <ThemeToggle />
                        {user ? (
                            <button className="cm-btn cm-btn-primary" onClick={() => router.post('/logout')}>Logout</button>
                        ) : (
                            <Link className="cm-btn cm-btn-primary" href="/login">Login</Link>
                        )}
                    </div>
                </aside>
            </div>
        </>
    );
}

export default function CampusLayout({ children, title, subtitle }) {
    const { auth } = usePage().props;
    const [open, setOpen] = useState(false);

    return (
        <div className="min-h-screen pb-12">
            <header className="sticky top-0 z-30 border-b border-[var(--cm-border)] bg-[var(--cm-bg)]/80 backdrop-blur-xl">
                <div className="cm-shell flex items-center justify-between py-4 pr-24">
                    <Brand href={auth?.user ? '/dashboard' : '/'} />
                    <nav className="hidden items-center gap-2 text-sm font-bold text-[var(--cm-muted)] lg:flex">
                        <Link className="rounded-full px-3 py-2 hover:text-[var(--cm-text)]" href="/study-sessions">Study Together</Link>
                        <Link className="rounded-full px-3 py-2 hover:text-[var(--cm-text)]" href="/schedule">Schedule</Link>
                        <Link className="rounded-full px-3 py-2 hover:text-[var(--cm-text)]" href="/calendar">Calendar</Link>
                    </nav>
                </div>
            </header>
            <StaggeredMenu open={open} setOpen={setOpen} user={auth?.user} />
            {(title || subtitle) && (
                <section className="cm-shell pt-9">
                    {title && <h1 className="text-4xl font-black tracking-tight text-[var(--cm-text)] md:text-5xl">{title}</h1>}
                    {subtitle && <p className="mt-3 max-w-2xl text-[var(--cm-muted)]">{subtitle}</p>}
                </section>
            )}
            <main className="cm-shell py-8">{children}</main>
            <footer className="cm-shell mt-10 border-t border-[var(--cm-border)] pt-8 text-sm text-[var(--cm-muted)]">
                <div className="grid gap-6 md:grid-cols-3">
                    <div><Brand href={auth?.user ? '/dashboard' : '/'} /><p className="mt-3">Platform akademik buat jadwal, sesi belajar, calendar, dan progress belajar.</p></div>
                    <div><b className="text-[var(--cm-text)]">Stack</b><p className="mt-3">Laravel · Inertia React · Vite · Tailwind</p></div>
                    <div className="md:text-right"><b className="text-[var(--cm-text)]">Copyright</b><p className="mt-3">© {new Date().getFullYear()} CampusMate. Developed by Pi.</p></div>
                </div>
            </footer>
        </div>
    );
}
