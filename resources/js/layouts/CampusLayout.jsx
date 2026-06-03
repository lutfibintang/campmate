import React, { useEffect, useState } from 'react';
import { Link, router, usePage } from '@inertiajs/react';
import Brand from '../components/Brand';

function ThemeToggle() {
    const [theme, setTheme] = useState(() => localStorage.getItem('cm-theme') || 'dark');
    useEffect(() => {
        document.documentElement.dataset.theme = theme === 'light' ? 'light' : 'dark';
        localStorage.setItem('cm-theme', theme);
    }, [theme]);
    return <button type="button" onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')} className="cm-btn cm-btn-ghost text-sm">{theme === 'dark' ? 'Light' : 'Dark'}</button>;
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
        ['Study', '/study-sessions', 'Cari atau bikin sesi'],
        ['Schedule', '/schedule', 'Jadwal kuliah semester ini'],
        ['Calendar', '/calendar', 'Kuliah + study session'],
        ['Leaderboard', '/leaderboard', 'XP & badges'],
        ['Profile', '/profile', 'Nama, foto, password'],
    ];

    return (
        <>
            {!open && <button type="button" onClick={() => setOpen(true)} className="fixed right-6 top-6 z-[70] cm-btn cm-btn-ghost bg-[var(--cm-surface)]">•• Menu</button>}
            <div onClick={() => setOpen(false)} className={`fixed inset-0 z-[80] bg-black/50 backdrop-blur-sm transition ${open ? 'opacity-100' : 'pointer-events-none opacity-0'}`}>
                <aside onClick={(e) => e.stopPropagation()} className={`cm-scrollbar-hidden absolute right-4 top-4 h-[calc(100vh-2rem)] w-[min(430px,calc(100vw-2rem))] overflow-y-auto rounded-[32px] border border-[var(--cm-border)] bg-[var(--cm-surface)] p-6 shadow-2xl transition duration-300 ${open ? 'translate-x-0' : 'translate-x-[110%]'}`}>
                    <div className="mb-6 flex items-start justify-between gap-4">
                        <div><span className="cm-badge">Navigation</span><h2 className="mt-3 text-3xl font-black tracking-[-0.06em]">Where to, Pi?</h2></div>
                        <button type="button" onClick={() => setOpen(false)} className="cm-btn cm-btn-ghost h-11 w-11 p-0">×</button>
                    </div>
                    <div className="grid gap-3">
                        {links.map(([label, href, caption], i) => (
                            <Link key={label} href={href} onClick={() => setOpen(false)} className="group rounded-3xl border border-[var(--cm-border)] bg-[var(--cm-card)] p-4 transition hover:border-[var(--cm-primary)]" style={{ transitionDelay: `${open ? i * 35 : 0}ms` }}>
                                <div className="flex items-center justify-between gap-4">
                                    <b>{label}</b><span className="text-sm text-[var(--cm-muted)]">{caption}</span>
                                </div>
                                <span className="mt-2 block text-[var(--cm-primary)]">→</span>
                            </Link>
                        ))}
                    </div>
                    <div className="mt-6 flex flex-wrap gap-3">
                        <ThemeToggle />
                        {user ? <button type="button" onClick={() => router.post('/logout')} className="cm-btn cm-btn-primary">Logout</button> : <Link href="/login" className="cm-btn cm-btn-primary">Login</Link>}
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
        <div className="cm-page">
            <nav className="cm-nav">
                <div className="cm-shell flex items-center justify-between gap-4 py-4">
                    <Brand href={auth?.user ? '/dashboard' : '/'} />
                    <div className="hidden items-center gap-2 md:flex">
                        <Link href="/dashboard" className="cm-btn cm-btn-ghost text-sm">Dashboard</Link>
                        <Link href="/study-sessions" className="cm-btn cm-btn-ghost text-sm">Study</Link>
                        <Link href="/schedule" className="cm-btn cm-btn-ghost text-sm">Schedule</Link>
                        <Link href="/calendar" className="cm-btn cm-btn-ghost text-sm">Calendar</Link>
                    </div>
                </div>
            </nav>
            <StaggeredMenu open={open} setOpen={setOpen} user={auth?.user} />
            <main className="cm-shell py-10">
                {(title || subtitle) && (
                    <header className="mb-8">
                        {title && <h1 className="text-4xl font-black tracking-[-0.07em] text-[var(--cm-text)] md:text-5xl">{title}</h1>}
                        {subtitle && <p className="mt-2 max-w-2xl text-[var(--cm-muted)]">{subtitle}</p>}
                    </header>
                )}
                {children}
            </main>
            <footer className="cm-footer">
                <div className="cm-shell grid gap-6 md:grid-cols-3">
                    <div><Brand href="/dashboard" compact /><p className="mt-3 text-sm">Platform akademik buat jadwal, sesi belajar, calendar, dan progress belajar.</p></div>
                    <div><b className="text-[var(--cm-text)]">Stack</b><p className="mt-2 text-sm">Laravel · Inertia React · Vite · Tailwind</p></div>
                    <div className="md:text-right"><b className="text-[var(--cm-text)]">Copyright</b><p className="mt-2 text-sm">© {new Date().getFullYear()} CampusMate. Developed by Pi.</p></div>
                </div>
            </footer>
        </div>
    );
}
