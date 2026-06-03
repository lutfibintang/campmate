import React from 'react';
import CampusLayout from '../../Layouts/CampusLayout';

const days = ['Monday','Tuesday','Wednesday','Thursday','Friday'];
const hours = ['07:00','08:00','09:00','10:00','11:00','12:00','13:00','14:00','15:00','16:00'];

export default function Index({ events = [] }) {
    const byDay = Object.groupBy ? Object.groupBy(events, e => e.day) : events.reduce((a,e)=>((a[e.day] ||= []).push(e),a),{});
    return (
        <CampusLayout title="Calendar View" subtitle="Gabungan jadwal mata kuliah dan study session. Satu layar biar ga tabrakan kayak jadwal hidup mahasiswa.">
            <div className="cm-card overflow-x-auto p-6">
                <div className="grid min-w-[920px] grid-cols-[80px_repeat(5,1fr)] gap-px rounded-3xl border border-[var(--cm-border)] bg-[var(--cm-border)] p-px">
                    <div className="bg-[var(--cm-surface)] p-3 text-xs font-black text-[var(--cm-muted)]">Time</div>
                    {days.map(d => <div key={d} className="bg-[var(--cm-surface)] p-3 text-center text-xs font-black text-[var(--cm-muted)]">{d}</div>)}
                    {hours.map(hour => (
                        <React.Fragment key={hour}>
                            <div className="min-h-20 bg-[var(--cm-surface)] p-3 text-xs font-black text-[var(--cm-muted)]">{hour}</div>
                            {days.map(day => <div key={day+hour} className="min-h-20 bg-[var(--cm-surface)] p-2">{(byDay[day] || []).filter(e => e.start_time?.startsWith(hour.slice(0,2))).map(e => <div key={e.id+e.type} className={`rounded-2xl p-3 text-xs font-bold ${e.type === 'class' ? 'bg-[var(--cm-primary-soft)] text-[var(--cm-primary-strong)]' : 'bg-[rgba(214,168,93,.14)] text-[var(--cm-accent)]'}`}><b>{e.title}</b><p className="mt-1 opacity-80">{e.start_time} - {e.end_time}</p></div>)}</div>)}
                        </React.Fragment>
                    ))}
                </div>
            </div>
        </CampusLayout>
    );
}
