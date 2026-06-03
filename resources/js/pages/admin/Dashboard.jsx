import React from 'react';
import CampusLayout from '../../Layouts/CampusLayout';

export default function AdminDashboard({ stats = {} }) {
    return (
        <CampusLayout title="Admin Dashboard">
            <div className="grid gap-5 md:grid-cols-4">
                <Stat title="Users" value={stats.users ?? 0} />
                <Stat title="Admins" value={stats.admins ?? 0} />
                <Stat title="Study Sessions" value={stats.sessions ?? 0} />
                <Stat title="Class Schedules" value={stats.classes ?? 0} />
            </div>

            <section className="mt-8 rounded-[2rem] border border-[var(--border)] bg-[var(--card)] p-6">
                <h2 className="text-xl font-black">Control Room</h2>
                <p className="mt-2 max-w-2xl text-sm leading-6 text-[var(--muted)]">
                    Akun admin berhasil jalan. Dari sini nanti bisa lu tambah fitur manajemen user, subject, badge, dan study session.
                </p>
            </section>
        </CampusLayout>
    );
}

function Stat({ title, value }) {
    return (
        <div className="rounded-[2rem] border border-[var(--border)] bg-[var(--card)] p-6">
            <div className="text-4xl font-black text-[var(--primary)]">{value}</div>
            <div className="mt-2 text-sm font-black text-[var(--muted)]">{title}</div>
        </div>
    );
}
