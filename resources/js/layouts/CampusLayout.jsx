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

    const links = useMemo(() => [
        ['Dashboard', dashboardHrefFor(user), isAdminUser(user) ? 'Panel admin' : 'Ringkasan belajar lu'],
        ...(isAdminUser(user) ? [['Admin Dashboard', '/admin/dashboard', 'Statistik & kontrol admin']] : []),
        ['Study', '/study-sessions', 'Cari atau bikin sesi'],
        ['Schedule', '/schedule', 'Jadwal kuliah semester ini'],
        ['Calendar', '/calendar', 'Kuliah + study session'],
        ['Leaderboard', '/leaderboard', 'XP & badges'],
        ['Develop By', '/develop-by', 'Info developer project'],
    ], [user]);

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
            >
                <aside
                    onClick={(event) => event.stopPropagation()}
                    className={`cm-drawer-panel cm-scrollbar-hidden absolute right-4 top-4 max-h-[calc(100vh-2rem)] w-[min(410px,calc(100vw-2rem))] overflow-y-auto transition duration-300 ${open ? 'translate-x-0' : 'translate-x-[110%]'}`}
                    id="campusmate-drawer" aria-label="CampusMate navigation drawer"
                >
                    <div className="mb-5 flex items-start justify-between gap-4">
                        <div>
                            <span className="cm-badge">Navigation</span>
                            <h2 className="mt-3 text-3xl font-black tracking-[-0.06em]">Where to, Pi?</h2>
                        </div>

                        <button type="button" onClick={() => setOpen(false)} className="cm-btn cm-btn-ghost h-11 w-11 shrink-0 p-0">
                            ×
                        </button>
                    </div>

                    <div className="grid gap-2.5">
                        {links.map(([label, href, caption], index) => (
                            <Link
                                key={label}
                                href={href}
                                onClick={() => setOpen(false)}
                                className="group rounded-[22px] border border-[var(--cm-border)] bg-[var(--cm-card)] p-3.5 transition hover:-translate-y-0.5 hover:border-[var(--cm-primary)]"
                                style={{ transitionDelay: `${open ? index * 30 : 0}ms` }}
                            >
                                <div className="flex items-center justify-between gap-4">
                                    <b>{label}</b>
                                    <span className="text-right text-sm text-[var(--cm-muted)]">{caption}</span>
                                </div>
                                <span className="mt-1.5 block text-[var(--cm-primary)]">→</span>
                            </Link>
                        ))}
                    </div>

                    <div className="mt-5 flex flex-wrap gap-3 border-t border-[var(--cm-border)] pt-4">
                        <ThemeToggle />
                        {user ? (
                            <button type="button" onClick={logout} className="cm-btn cm-btn-primary">
                                Logout
                            </button>
                        ) : (
                            <Link href="/login" className="cm-btn cm-btn-primary" onClick={() => setOpen(false)}>
                                Login
                            </Link>
                        )}
                    </div>
                </aside>
            </div>
        </>
    );
}

export default function CampusLayout({ children, title, subtitle }) {
    const { auth } = usePage().props;
    const user = auth?.user || null;
    const [open, setOpen] = useState(false);
    const dashboardHref = dashboardHrefFor(user);

    return (
        <div className="cm-page">
            <div className="cm-app-content">
                <nav className="cm-nav">
                    <div className="cm-shell flex items-center justify-between gap-4 py-4">
                        <Brand href={user ? dashboardHref : '/'} />

                        <div className="flex items-center gap-3">
                            {user ? (
                                <UserDropdown user={user} profileUrl="/profile" logoutUrl="/logout" />
                            ) : (
                                <Link href="/login" className="cm-btn cm-btn-primary text-sm">
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
                                <span className="cm-menu-trigger-lines" aria-hidden="true"><i></i><i></i><i></i></span>
                                <span>Menu</span>
                            </button>
                        </div>
                    </div>
                </nav>

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
                        <div>
                            <Brand href={dashboardHref} compact />
                            <p className="mt-3 text-sm">Platform akademik buat jadwal, sesi belajar, calendar, dan progress belajar.</p>
                        </div>
                        <div>
                            <b className="text-[var(--cm-text)]">Stack</b>
                            <p className="mt-2 text-sm">Laravel · Inertia React · Vite · Tailwind</p>
                        </div>
                        <div className="md:text-right">
                            <b className="text-[var(--cm-text)]">Copyright</b>
                            <p className="mt-2 text-sm">© {new Date().getFullYear()} CampusMate. Developed by Pi.</p>
                        </div>
                    </div>
                </footer>
            </div>

            <StaggeredMenu open={open} setOpen={setOpen} user={user} />
        </div>
    );
}
