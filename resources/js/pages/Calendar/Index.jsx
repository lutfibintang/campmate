import React from 'react';
import CampusLayout from '../../layouts/CampusLayout';

const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
const hours = ['07:00','08:00','09:00','10:00','11:00','12:00','13:00','14:00','15:00','16:00'];

export default function Index({ events = [] }) {
    const grouped = events.reduce((acc, event) => { (acc[event.day] ||= []).push(event); return acc; }, {});
    return (
        <CampusLayout title="Calendar View" subtitle="Gabungan jadwal kuliah dan study session biar hidup lu ga tabrakan terus.">
            <div className="cm-card cm-panel overflow-x-auto">
                <div className="grid min-w-[920px] grid-cols-[90px_repeat(5,1fr)] rounded-3xl border border-[var(--cm-border)]">
                    <div className="border-b border-r border-[var(--cm-border)] p-3 font-black text-[var(--cm-muted)]">Time</div>
                    {days.map((d) => <div key={d} className="border-b border-r border-[var(--cm-border)] p-3 text-center font-black">{d}</div>)}
                    {hours.map((hour) => <React.Fragment key={hour}><div className="min-h-[72px] border-r border-t border-[var(--cm-border)] p-3 text-sm font-bold text-[var(--cm-muted)]">{hour}</div>{days.map((day) => <div key={`${day}-${hour}`} className="min-h-[72px] border-r border-t border-[var(--cm-border)] p-2">{(grouped[day] || []).filter((e) => e.start_time?.startsWith(hour.slice(0,2))).map((e) => <div key={e.id || `${e.title}-${e.start_time}`} className="rounded-2xl bg-[var(--cm-primary-soft)] p-2 text-xs"><b>{e.title}</b><p className="text-[var(--cm-muted)]">{e.start_time} - {e.end_time}</p></div>)}</div>)}</React.Fragment>)}
                </div>
            </div>
        </CampusLayout>
    );
}
