import React, { useState } from 'react';
import { Link, router } from '@inertiajs/react';
import CampusLayout from '../../layouts/CampusLayout';
import DebouncedSearch from '../../components/DebouncedSearch';
import SessionCard from '../../components/SessionCard';

export default function Index({ sessions = [], filters = {} }) {
    const [type, setType] = useState(filters.session_type || 'all');
    const update = (payload) => router.get('/study-sessions', { ...filters, ...payload }, { preserveState: true, replace: true });
    return (
        <CampusLayout title="Study Sessions" subtitle="Cari sesi belajar yang cocok sama jadwal dan topik lu.">
            <div className="cm-card cm-panel mb-6 grid gap-4 lg:grid-cols-[1fr_auto] lg:items-center">
                <DebouncedSearch initial={filters.search || ''} placeholder="Cari sesi, subject, atau topik..." onSearch={(search) => update({ search })} />
                <Link href="/study-sessions/create" className="cm-btn cm-btn-primary">+ New Session</Link>
            </div>
            <div className="mb-6 flex flex-wrap gap-2">
                {['all', 'offline', 'online', 'hybrid', 'archive'].map((t) => (
                    <button key={t} type="button" onClick={() => { setType(t); update({ session_type: t === 'all' ? '' : t }); }} className={`cm-btn px-4 py-2 text-sm ${type === t ? 'cm-btn-primary' : 'cm-btn-ghost'}`}>{t}</button>
                ))}
            </div>
            <div className="grid gap-4">
                {sessions.length ? sessions.map((session) => <SessionCard key={session.id} session={session} />) : (
                    <div className="cm-card cm-panel text-center text-[var(--cm-muted)]">Ga ada session yang cocok. Buat Sendiri, jangan nunggu yang ga pasti.</div>
                )}
            </div>
        </CampusLayout>
    );
}
