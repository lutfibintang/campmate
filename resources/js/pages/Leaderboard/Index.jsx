import React from 'react';
import CampusLayout from '../../Layouts/CampusLayout';

export default function Index({ leaders = [], myBadges = [] }) {
    return (
        <CampusLayout title="Leaderboard & Badges" subtitle="Gamifikasi ringan: biar rajin belajar, bukan cuma rajin ganti tema VS Code.">
            <div className="grid gap-6 lg:grid-cols-[.9fr_1.1fr]">
                <section className="cm-card p-6">
                    <h2 className="text-xl font-black">Leaderboard</h2>
                    <div className="mt-5 grid gap-3">
                        {leaders.map((u, i) => (
                            <div key={u.id} className="cm-card-compact flex items-center justify-between p-4">
                                <div className="flex items-center gap-4"><span className="grid h-10 w-10 place-items-center rounded-2xl bg-[var(--cm-primary-soft)] font-black text-[var(--cm-primary)]">{i+1}</span><div><b>{u.name}</b><p className="text-sm text-[var(--cm-muted)]">{u.sessions_count} sessions joined</p></div></div>
                                <b className="text-[var(--cm-primary)]">{u.xp} XP</b>
                            </div>
                        ))}
                    </div>
                </section>
                <section className="cm-card p-6">
                    <h2 className="text-xl font-black">My Badges</h2>
                    <div className="mt-5 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                        {myBadges.map((badge) => <div key={badge.name} className={`cm-card-compact p-5 ${badge.locked ? 'opacity-45' : ''}`}><div className="text-4xl">{badge.icon}</div><b className="mt-4 block">{badge.name}</b><p className="mt-2 text-sm text-[var(--cm-muted)]">{badge.description}</p></div>)}
                    </div>
                </section>
            </div>
        </CampusLayout>
    );
}
