import React, { useEffect, useMemo, useState } from 'react';
import { Link, router, usePage } from '@inertiajs/react';
import Brand from '../components/Brand';
import UserDropdown from '../components/UserDropdown';

const ADMIN_EMAILS = [
    'admin@campusmate.test',
    'admin@campusmate.local',
    'admin@example.com',
];

function isAdminUser(user) {
    if (!user) return false;

    const role = String(user.role || user.role_name || user.type || '').toLowerCase();
    const email = String(user.email || '').toLowerCase();

    return Boolean(
        user.is_admin ||
        user.admin ||
        role === 'admin' ||
        role === 'administrator' ||
        ADMIN_EMAILS.includes(email),
    );
}

function dashboardHrefFor(user) {
    return isAdminUser(user) ? '/admin/dashboard' : '/dashboard';
}

function ThemeToggle() {
    const [theme, setTheme] = useState(() => localStorage.getItem('cm-theme') || 'dark');

    useEffect(() => {
        document.documentElement.dataset.theme = theme === 'light' ? 'light' : 'dark';
        localStorage.setItem('cm-theme', theme);
    }, [theme]);

    return (
        <button
            type="button"
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="cm-btn cm-btn-ghost text-sm"
        >
            {theme === 'dark' ? 'Light' : 'Dark'}
        </button>
    );
}

function StaggeredMenu({ open, setOpen, user }) {
    useEffect(() => {
        document.body.classList.toggle('cm-no-scroll', open);
        document.body.classList.toggle('cm-drawer-open', open);

        const close = (event) => event.key === 'Escape' && setOpen(false);
        document.addEventListener('keydown', close);

        return () => {
            document.body.classList.remove('cm-no-scroll', 'cm-drawer-open');
            document.removeEventListener('keydown', close);
        };
    }, [open, setOpen]);

    const isAdmin = isAdminUser(user);

    const links = useMemo(() => [
        ['Dashboard', dashboardHrefFor(user), isAdmin ? 'Admin control panel' : 'Ringkasan belajar lu'],
        ['Study', '/study-sessions', isAdmin ? 'Manage semua sesi' : 'Cari atau bikin sesi'],
        ['Schedule', '/schedule', 'Jadwal kuliah semester ini'],
        ['Calendar', '/calendar', 'Kuliah + study session'],
        ['Leaderboard', '/leaderboard', 'XP & badges'],
        ['Develop By', '/develop-by', 'Info developer project'],
    ], [user, isAdmin]);

    const logout = () => {
        setOpen(false);
        router.post('/logout');
    };

    return (
        <>
            <div
                onClick={() => setOpen(false)}
                className={`fixed inset-0 z-[80] bg-black/45 backdrop-blur-sm transition duration-300 ${open ? 'opacity-100' : 'pointer-events-none opacity-0'}`}
                aria-hidden={!open}
            />

            <aside
                onClick={(event) => event.stopPropagation()}
                className={`cm-drawer-panel cm-scrollbar-hidden fixed right-4 top-4 z-[90] max-h-[calc(100vh-2rem)] w-[min(410px,calc(100vw-2rem))] overflow-y-auto transition duration-300 ${open ? 'translate-x-0' : 'translate-x-[110%]'}`}
                id="campusmate-drawer"
                aria-label="CampusMate navigation drawer"
            >
                <div className="flex items-start justify-between gap-4">
                    <div>
                        <p className="text-xs font-black uppercase tracking-[.32em] text-[var(--cm-subtle)]">
                            Navigation
                        </p>
                        <h2 className="mt-2 text-3xl font-black tracking-[-.06em] text-[var(--cm-text)]">
                            {isAdmin ? 'Admin Area' : 'Where to, Pi?'}
                        </h2>
                    </div>

                    <button
                        type="button"
                        onClick={() => setOpen(false)}
                        className="cm-btn cm-btn-ghost h-11 w-11 shrink-0 p-0"
                    >
                        ×
                    </button>
                </div>

                <div className="mt-5 grid gap-2.5">
                    {links.map(([label, href, caption], index) => (
                        <Link
                            key={label}
                            href={href}
                            onClick={() => setOpen(false)}
                            className="group rounded-[22px] border border-[var(--cm-border)] bg-[var(--cm-card)] p-3.5 transition hover:-translate-y-0.5 hover:border-[var(--cm-primary)]"
                            style={{ transitionDelay: `${open ? index * 30 : 0}ms` }}
                        >
                            <div className="flex items-center justify-between gap-4">
                                <div>
                                    <p className="font-black text-[var(--cm-text)]">{label}</p>
                                    <p className="mt-1 text-sm font-bold text-[var(--cm-muted)]">{caption}</p>
                                </div>
                                <span className="text-xl font-black text-[var(--cm-primary)] transition group-hover:translate-x-1">
                                    →
                                </span>
                            </div>
                        </Link>
                    ))}
                </div>

                <div className="mt-5 flex gap-2">
                    {user ? (
                        <button type="button" onClick={logout} className="cm-btn cm-btn-ghost w-full">
                            Logout
                        </button>
                    ) : (
                        <Link href="/login" onClick={() => setOpen(false)} className="cm-btn cm-btn-primary w-full">
                            Login
                        </Link>
                    )}
                </div>
            </aside>
        </>
    );
}

export default function CampusLayout({ children, title, subtitle }) {
    const { auth } = usePage().props;
    const user = auth?.user || null;
    const isAdmin = isAdminUser(user);
    const [open, setOpen] = useState(false);
    const dashboardHref = dashboardHrefFor(user);

    return (
        <div className="cm-page min-h-screen">
            <nav className="cm-shell flex items-center justify-between gap-4 py-5">
                <Brand href={dashboardHref} />

                <div className="flex items-center gap-2">
                    {isAdmin && (
                        <Link href="/admin/dashboard" className="cm-badge hidden sm:inline-flex">
                            Admin
                        </Link>
                    )}

                    <ThemeToggle />

                    {user ? (
                        <UserDropdown user={user} />
                    ) : (
                        <Link href="/login" className="cm-btn cm-btn-ghost">
                            Login
                        </Link>
                    )}

                    <button
                        type="button"
                        onClick={() => setOpen(true)}
                        className="cm-menu-trigger"
                        aria-expanded={open}
                        aria-controls="campusmate-drawer"
                    >
                        Menu
                    </button>
                </div>
            </nav>

            <StaggeredMenu open={open} setOpen={setOpen} user={user} />

            <main className="cm-shell cm-main-content pb-12 transition-transform duration-300">
                {(title || subtitle) && (
                    <header className="mb-7">
                        {title && (
                            <h1 className="text-4xl font-black tracking-[-0.07em] text-[var(--cm-text)] md:text-5xl">
                                {title}
                            </h1>
                        )}
                        {subtitle && (
                            <p className="mt-3 max-w-3xl text-[var(--cm-muted)]">
                                {subtitle}
                            </p>
                        )}
                    </header>
                )}

                {children}
            </main>

            <footer className="cm-shell grid gap-4 border-t border-[var(--cm-border)] py-8 text-sm text-[var(--cm-muted)] md:grid-cols-3">
                <p>Platform akademik buat jadwal, sesi belajar, calendar, dan progress belajar.</p>
                <p>Laravel · Inertia React · Vite · Tailwind</p>
                <p className="md:text-right">© {new Date().getFullYear()} CampusMate. Developed by Pi.</p>
            </footer>
        </div>
    );
}
