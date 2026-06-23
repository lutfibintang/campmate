import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Link, router } from '@inertiajs/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { faArrowRightLong } from '@fortawesome/free-solid-svg-icons';
import { faUser } from '@fortawesome/free-solid-svg-icons';

function getInitials(name = 'User') {
    return String(name)
        .trim()
        .split(/\s+/)
        .slice(0, 2)
        .map((part) => part.charAt(0).toUpperCase())
        .join('') || 'U';
}

export default function UserDropdown({ user = null, profileUrl = '/profile', logoutUrl = '/logout' }) {
    const [open, setOpen] = useState(false);
    const rootRef = useRef(null);

    const displayName = user?.name || user?.username || user?.email || 'Guest';
    const avatarUrl = user?.avatar_url || user?.avatar || user?.profile_photo_url || user?.photo_url || null;
    const roleLabel = user?.role || user?.role_name || user?.type || 'Student';
    const initials = useMemo(() => getInitials(displayName), [displayName]);

    useEffect(() => {
        const handlePointerDown = (event) => {
            if (!rootRef.current?.contains(event.target)) setOpen(false);
        };

        const handleKeyDown = (event) => {
            if (event.key === 'Escape') setOpen(false);
        };

        document.addEventListener('pointerdown', handlePointerDown);
        document.addEventListener('keydown', handleKeyDown);

        return () => {
            document.removeEventListener('pointerdown', handlePointerDown);
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, []);

    const logout = () => {
        setOpen(false);
        router.post(logoutUrl);
    };

    return (
        <div ref={rootRef} className="relative flex items-center">
            <button
                type="button"
                onClick={() => setOpen((value) => !value)}
                className={`cm-profile-trigger ${open ? 'cm-profile-trigger-open' : ''}`}
                aria-expanded={open}
                aria-haspopup="menu"
                aria-label="Open user menu"
            >
                <span className="cm-avatar-button" aria-hidden="true">
                    {avatarUrl ? (
                        <img src={avatarUrl} alt={displayName} className="h-full w-full rounded-full object-cover" />
                    ) : (
                        <span className="cm-avatar-initials">{initials}</span>
                    )}
                </span>
                <span className="hidden min-w-0 text-left lg:block">
                    <span className="block max-w-[120px] truncate text-sm font-black text-[var(--cm-text)]">{displayName}</span>
                    <span className="block text-[11px] font-bold uppercase tracking-[0.2em] text-[var(--cm-muted)]">{roleLabel}</span>
                </span>
                <span className="cm-dropdown-chev" aria-hidden="true">
                    <svg viewBox="0 0 20 20" fill="none">
                        <path d="M5.5 7.5L10 12l4.5-4.5" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </span>
            </button>

            <div className={`cm-user-dropdown ${open ? 'cm-user-dropdown-open' : ''}`} role="menu">
                <div className="cm-user-dropdown-hero">
                    <span className="cm-user-dropdown-avatar" aria-hidden="true">
                        {avatarUrl ? (
                            <img src={avatarUrl} alt="" className="h-full w-full rounded-full object-cover" />
                        ) : (
                            initials
                        )}
                    </span>
                    <div className="min-w-0">
                        <p className="truncate text-sm font-black text-[var(--cm-text)]">{displayName}</p>
                        {user?.email && <p className="mt-0.5 truncate text-xs text-[var(--cm-muted)]">{user.email}</p>}
                    </div>
                </div>

                <div className="p-2">
                    <Link href={profileUrl} onClick={() => setOpen(false)} className="cm-dropdown-item" role="menuitem">
                        <span className="cm-menu-icon"><FontAwesomeIcon icon={faUser} /></span>
                        <span className="flex-1">Profile</span>
                        <span className="text-[var(--cm-subtle)]"><FontAwesomeIcon icon={faArrowRightLong} /></span>
                    </Link>

                    <button type="button" onClick={logout} className="cm-dropdown-item cm-dropdown-item-danger" role="menuitem">
                        <span className="cm-menu-icon">↪</span>
                        <span className="flex-1">Logout</span>
                        <span className="text-[var(--cm-danger)]"><FontAwesomeIcon icon={faXmark} /></span>
                    </button>
                </div>
            </div>
        </div>
    );
}
