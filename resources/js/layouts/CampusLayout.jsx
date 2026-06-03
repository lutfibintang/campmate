import React, { useState } from 'react';
import { Link, router, usePage } from '@inertiajs/react';

export default function CampusLayout({ children, title = 'CampusMate' }) {
    const { auth } = usePage().props;
    const user = auth?.user;
    const [open, setOpen] = useState(false);

    const logout = () => router.post('/logout');

    const navItems = user
        ? [
              ['Dashboard', '/dashboard'],
              ['Study', '/study-sessions'],
              ['Schedule', '/schedule'],
              ['Calendar', '/calendar'],
              ['Leaderboard', '/leaderboard'],
              ['Profile', '/profile'],
          ]
        : [
              ['Home', '/'],
              ['Login', '/login'],
              ['Register', '/register'],
          ];

    if (user?.role === 'admin') {
        navItems.splice(1, 0, ['Admin', '/admin/dashboard']);
    }

    return (
        <div className="min-h-screen bg-[var(--bg)] text-[var(--text)]">
            <header className="sticky top-0 z-50 border-b border-[var(--border)] bg-[var(--bg)]/90 backdrop-blur">
                <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
                    <Link href={user ? '/dashboard' : '/'} className="text-xl font-black tracking-tight">
                        CampusMate
                    </Link>

                    <nav className="hidden items-center gap-2 md:flex">
                        {navItems.map(([label, href]) => (
                            <Link
                                key={href}
                                href={href}
                                className="rounded-full px-4 py-2 text-sm font-bold text-[var(--muted)] transition hover:bg-[var(--surface)] hover:text-[var(--text)]"
                            >
                                {label}
                            </Link>
                        ))}

                        {user && (
                            <button
                                type="button"
                                onClick={logout}
                                className="rounded-full border border-[var(--border)] px-4 py-2 text-sm font-bold text-[var(--text)] hover:bg-[var(--surface)]"
                            >
                                Logout
                            </button>
                        )}
                    </nav>

                    <button
                        type="button"
                        onClick={() => setOpen(!open)}
                        className="rounded-full border border-[var(--border)] px-4 py-2 text-sm font-bold md:hidden"
                    >
                        Menu
                    </button>
                </div>

                {open && (
                    <div className="border-t border-[var(--border)] px-4 pb-4 md:hidden">
                        <div className="grid gap-2">
                            {navItems.map(([label, href]) => (
                                <Link
                                    key={href}
                                    href={href}
                                    className="rounded-2xl px-4 py-3 text-sm font-bold hover:bg-[var(--surface)]"
                                    onClick={() => setOpen(false)}
                                >
                                    {label}
                                </Link>
                            ))}
                            {user && (
                                <button
                                    type="button"
                                    onClick={logout}
                                    className="rounded-2xl px-4 py-3 text-left text-sm font-bold hover:bg-[var(--surface)]"
                                >
                                    Logout
                                </button>
                            )}
                        </div>
                    </div>
                )}
            </header>

            <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
                {title && <h1 className="mb-6 text-3xl font-black tracking-tight">{title}</h1>}
                {children}
            </main>
        </div>
    );
}
