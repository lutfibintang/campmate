import React from 'react';
import { Link } from '@inertiajs/react';
import CampusLayout from '../layouts/CampusLayout';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBook } from '@fortawesome/free-solid-svg-icons';
import { faCalendar } from '@fortawesome/free-solid-svg-icons';

const techStack = [
    'Laravel',
    'React',
    'Inertia.js',
    'Tailwind CSS',
    'Vite',
    'MySQL',
];

const features = [
    {
        title: 'Study Sessions',
        description: 'User bisa bikin sesi belajar, join session, dan cek bentrok dengan jadwal kuliah.',
        icon: <FontAwesomeIcon icon={faBook} />,
    },
    {
        title: 'Schedule Manager',
        description: 'User bisa nyusun jadwal kuliah pribadi tanpa ikut kebaca user lain.',
        icon: <FontAwesomeIcon icon={faCalendar} />,
    },
    {
        title: 'Calendar View',
        description: 'Kalender mingguan buat mantau jadwal dan sesi belajar biar hidup ga chaos.',
        icon: <FontAwesomeIcon icon={faCalendar} />,
    },
];

export default function DevelopBy() {
    return (
        <CampusLayout
            title="Develop By"
            subtitle="Halaman informasi developer dan teknologi yang digunakan di CampusMate."
        >
            <section className="grid gap-6 lg:grid-cols-[1.1fr_.9fr]">
                <div className="cm-card cm-panel cm-spotlight">
                    <span className="cm-badge">CampusMate Project</span>

                    <h1 className="mt-6 text-5xl font-black tracking-[-0.07em] text-[var(--cm-text)] md:text-6xl">
                        Built by Lutfi Bintang
                    </h1>

                    <p className="mt-4 max-w-2xl text-lg leading-8 text-[var(--cm-muted)]">
                        CampusMate dibuat sebagai aplikasi companion kampus untuk bantu mahasiswa
                        ngatur jadwal kuliah, bikin study session, dan join sesi
                        belajar dengan UI yang lebih niat daripada CRUD polos menyedihkan.
                    </p>
                </div>

                <div className="cm-card cm-panel">
                    <p className="text-xs font-black uppercase tracking-[.32em] text-[var(--cm-subtle)]">
                        Developer
                    </p>

                    <div className="mt-5 flex items-center gap-4">
                        <div className="grid h-20 w-20 place-items-center rounded-3xl border border-[var(--cm-border)] bg-[var(--cm-primary)]/15 text-3xl font-black text-[var(--cm-primary)]">
                            Pi
                        </div>

                        <div>
                            <h2 className="text-2xl font-black tracking-[-0.04em] text-[var(--cm-text)]">
                                Lutfi Bintang
                            </h2>
                            <p className="text-sm font-bold text-[var(--cm-muted)]">
                                Full-Stack Developer
                            </p>
                        </div>
                    </div>

                    <div className="mt-7">
                        <p className="text-xs font-black uppercase tracking-[.28em] text-[var(--cm-subtle)]">
                            Tech Stack
                        </p>

                        <div className="mt-4 flex flex-wrap gap-2">
                            {techStack.map((item) => (
                                <span
                                    key={item}
                                    className="rounded-full border border-[var(--cm-border)] bg-[var(--cm-card-soft)] px-4 py-2 text-sm font-black text-[var(--cm-text)]"
                                >
                                    {item}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            <section className="mt-6 grid gap-5 md:grid-cols-3">
                {features.map((feature) => (
                    <article key={feature.title} className="cm-card cm-panel">
                        <div className="grid h-14 w-14 place-items-center rounded-2xl bg-[var(--cm-primary)]/15 text-2xl">
                            {feature.icon}
                        </div>

                        <h3 className="mt-5 text-2xl font-black tracking-[-0.05em] text-[var(--cm-text)]">
                            {feature.title}
                        </h3>

                        <p className="mt-3 text-sm leading-6 text-[var(--cm-muted)]">
                            {feature.description}
                        </p>
                    </article>
                ))}
            </section>
        </CampusLayout>
    );
}
