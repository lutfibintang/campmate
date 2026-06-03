import React from 'react';
import CampusLayout from '../../layouts/CampusLayout';

const fallbackWeekDays = [
    { key: 'monday', label: 'Senin', date_label: '' },
    { key: 'tuesday', label: 'Selasa', date_label: '' },
    { key: 'wednesday', label: 'Rabu', date_label: '' },
    { key: 'thursday', label: 'Kamis', date_label: '' },
    { key: 'friday', label: 'Jumat', date_label: '' },
    { key: 'saturday', label: 'Sabtu', date_label: '' },
    { key: 'sunday', label: 'Minggu', date_label: '' },
];

const hours = ['07:00', '08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00'];

function EventCard({ event }) {
    return (
        <div className={`rounded-2xl border p-3 text-xs shadow-sm ${event.type === 'session' ? 'border-[var(--cm-primary)] bg-[var(--cm-primary-soft)]' : 'border-[var(--cm-border)] bg-[var(--cm-surface)]/80'}`}>
            <div className="flex items-center justify-between gap-2">
                <span className="rounded-full bg-[var(--cm-bg)]/60 px-2 py-1 text-[9px] font-black uppercase tracking-[0.18em] text-[var(--cm-muted)]">
                    {event.type === 'session' ? 'Study' : 'Class'}
                </span>
                <span className="font-black text-[var(--cm-primary)]">{event.start_time.slice(0, 5)}</span>
            </div>
            <p className="mt-2 font-black leading-4 text-[var(--cm-text)]">{event.title}</p>
            <p className="mt-1 font-semibold text-[var(--cm-muted)]">{event.subtitle || event.room || '-'}</p>
            <p className="mt-2 font-black text-[var(--cm-muted)]">{event.start_time.slice(0, 5)} - {event.end_time.slice(0, 5)}</p>
        </div>
    );
}

export default function Index({ events = [], weekDays = fallbackWeekDays }) {
    const days = weekDays.length === 7 ? weekDays : fallbackWeekDays;

    const grouped = events.reduce((acc, event) => {
        const key = String(event.day || '').toLowerCase();
        (acc[key] ||= []).push(event);
        return acc;
    }, {});

    return (
        <CampusLayout title="Calendar" subtitle="Kalender mingguan sekarang lengkap Senin sampai Minggu. Weekend juga dihitung, karena tugas kampus ga kenal belas kasih.">
            <section className="cm-card cm-panel overflow-hidden">
                <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
                    <div>
                        <p className="text-xs font-black uppercase tracking-[0.22em] text-[var(--cm-subtle)]">This Week</p>
                        <h2 className="text-2xl font-black tracking-[-0.05em] text-[var(--cm-text)]">Weekly Calendar</h2>
                    </div>
                    <span className="rounded-full border border-[var(--cm-border)] px-4 py-2 text-xs font-black text-[var(--cm-muted)]">
                        {events.length} events
                    </span>
                </div>

                <div className="overflow-x-auto">
                    <div className="grid min-w-[1120px] grid-cols-[88px_repeat(7,minmax(130px,1fr))] gap-3">
                        <div className="rounded-2xl border border-transparent p-3 text-xs font-black uppercase tracking-[0.18em] text-[var(--cm-muted)]">
                            Time
                        </div>

                        {days.map((day) => (
                            <div key={day.key} className="rounded-2xl border border-[var(--cm-border)] bg-[var(--cm-surface)]/70 p-3 text-center">
                                <p className="font-black text-[var(--cm-text)]">{day.label}</p>
                                <p className="mt-1 text-xs font-bold text-[var(--cm-primary)]">{day.date_label}</p>
                            </div>
                        ))}

                        {hours.map((hour) => (
                            <React.Fragment key={hour}>
                                <div className="rounded-2xl border border-[var(--cm-border)] bg-[var(--cm-surface)]/60 p-3 text-center text-xs font-black text-[var(--cm-muted)]">
                                    {hour}
                                </div>

                                {days.map((day) => {
                                    const dayEvents = (grouped[day.key] || []).filter((event) => event.start_time?.startsWith(hour.slice(0, 2)));

                                    return (
                                        <div key={`${day.key}-${hour}`} className="min-h-[96px] rounded-2xl border border-[var(--cm-border)] bg-[var(--cm-bg)]/35 p-2">
                                            <div className="space-y-2">
                                                {dayEvents.map((event) => (
                                                    <EventCard key={event.id} event={event} />
                                                ))}
                                            </div>
                                        </div>
                                    );
                                })}
                            </React.Fragment>
                        ))}
                    </div>
                </div>
            </section>
        </CampusLayout>
    );
}
