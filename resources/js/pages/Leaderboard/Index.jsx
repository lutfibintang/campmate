import React from 'react';
import CampusLayout from '../../layouts/CampusLayout';

export default function Index({ leaderboard = [], badges = [] }) {
    const demo = leaderboard.length ? leaderboard : [
        { name: 'Dinda R.', xp: 1250 }, { name: 'Kevin L.', xp: 980 }, { name: 'Bima A.', xp: 870 }, { name: 'Lutfi B.', xp: 760 },
    ];
    const demoBadges = badges.length ? badges : [
        ['🌱', 'Fresh Learner'], ['🦉', 'Night Owl'], ['🤝', 'Helpful Host'], ['🧠', 'Problem Solver'],
    ];
    return (
        <CampusLayout title="Leaderboard & Badges" subtitle="Kumpulin XP dari bikin sesi, join sesi, share materi, dan hadir tepat waktu.">
            <div className="grid gap-6 lg:grid-cols-[1fr_1.2fr]">
                <section className="cm-card cm-panel"><h2 className="text-2xl font-black">Leaderboard</h2><div className="mt-5 grid gap-3">{demo.map((u, i) => <div key={u.name} className="cm-card-compact flex items-center justify-between p-4"><div className="flex items-center gap-3"><span className="grid h-9 w-9 place-items-center rounded-2xl bg-[var(--cm-primary-soft)] font-black">{i+1}</span><b>{u.name}</b></div><span className="font-black text-[var(--cm-primary)]">{u.xp} XP</span></div>)}</div></section>
                <section className="cm-card cm-panel"><h2 className="text-2xl font-black">My Badges</h2><div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{demoBadges.map((b) => <div key={b[1]} className="cm-card-compact p-5 text-center"><div className="text-4xl">{b[0]}</div><b className="mt-3 block">{b[1]}</b></div>)}</div></section>
            </div>
        </CampusLayout>
    );
}
