import React, { useState } from 'react';
import { Link, router } from '@inertiajs/react';
import CampusLayout from '../../Layouts/CampusLayout';
import DebouncedSearch from '../../Components/DebouncedSearch';
import SessionCard from '../../Components/SessionCard';

export default function Index({ sessions = [], filters = {}, subjects = [] }) {
    const [type, setType] = useState(filters.session_type || 'all');
    const update = (payload) => router.get('/study-sessions', { ...filters, ...payload }, { preserveState: true, replace: true });

    return (
        <CampusLayout title="Study Sessions" subtitle="Cari sesi belajar yang cocok sama jadwal dan topik lu.">
            <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                <div className="w-full md:max-w-md"><DebouncedSearch value={filters.search || ''} placeholder="Cari Laravel, Basis Data, UI/UX..." onChange={(search) => update({ search })} /></div>
                <div className="flex flex-wrap gap-2">
                    {['all', 'offline', 'online', 'hybrid', 'archive'].map((t) => (
                        <button key={t} onClick={() => { setType(t); update({ session_type: t === 'all' ? '' : t }); }} className={`cm-btn px-4 py-2 text-sm ${type === t ? 'cm-btn-primary' : 'cm-btn-ghost'}`}>{t}</button>
                    ))}
                    <Link href="/study-sessions/create" className="cm-btn cm-btn-primary px-4 py-2 text-sm">+ New Session</Link>
                </div>
            </div>
            <div className="grid gap-5 lg:grid-cols-2">
                {sessions.length ? sessions.map((session) => <SessionCard key={session.id} session={session} />) : <div className="cm-card p-8 text-[var(--cm-muted)]">Ga ada session yang cocok. Bikin sendiri aja, jangan nunggu semesta.</div>}
            </div>
        </CampusLayout>
    );
}
