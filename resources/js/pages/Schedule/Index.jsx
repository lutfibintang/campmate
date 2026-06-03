import React from 'react';
import { router, useForm } from '@inertiajs/react';
import CampusLayout from '../../layouts/CampusLayout';
import { Field, SelectInput, TextInput } from '../../components/TextInput';
import { TimeField } from '../../components/ReactDateTimeFields';

const days = [
    ['monday', 'Senin'], ['tuesday', 'Selasa'], ['wednesday', 'Rabu'], ['thursday', 'Kamis'], ['friday', 'Jumat'], ['saturday', 'Sabtu'], ['sunday', 'Minggu'],
];

export default function Index({ schedules = [] }) {
    const { data, setData, post, processing, errors, reset } = useForm({ name: '', code: '', lecturer: '', color: '#c8d889', day_of_week: 'monday', start_time: '', end_time: '', room: '' });
    const submit = (e) => { e.preventDefault(); post('/schedule', { onSuccess: () => reset() }); };
    return (
        <CampusLayout title="Semester Schedule" subtitle="Masukin jadwal mata kuliah semester ini biar CampusMate bisa warning kalau sesi bentrok.">
            <form onSubmit={submit} className="cm-card cm-panel mb-7 grid gap-4 lg:grid-cols-3">
                <Field label="Mata Kuliah" error={errors.name}><TextInput value={data.name} onChange={(e) => setData('name', e.target.value)} placeholder="Basis Data" /></Field>
                <Field label="Kode"><TextInput value={data.code} onChange={(e) => setData('code', e.target.value)} placeholder="INF-203" /></Field>
                <Field label="Dosen"><TextInput value={data.lecturer} onChange={(e) => setData('lecturer', e.target.value)} placeholder="Nama dosen" /></Field>
                <Field label="Hari"><SelectInput value={data.day_of_week} onChange={(e) => setData('day_of_week', e.target.value)}>{days.map(([v, l]) => <option key={v} value={v}>{l}</option>)}</SelectInput></Field>
                <TimeField label="Jam Mulai" value={data.start_time} onChange={(v) => setData('start_time', v)} error={errors.start_time} />
                <TimeField label="Jam Selesai" value={data.end_time} onChange={(v) => setData('end_time', v)} error={errors.end_time} />
                <Field label="Ruangan"><TextInput value={data.room} onChange={(e) => setData('room', e.target.value)} placeholder="A2.3" /></Field>
                <div className="lg:col-span-2 flex items-end justify-end"><button disabled={processing} className="cm-btn cm-btn-primary">Tambah Jadwal</button></div>
            </form>
            <section className="cm-card cm-panel"><h2 className="text-2xl font-black tracking-[-0.05em]">Weekly Timetable</h2><div className="mt-5 overflow-x-auto"><table className="w-full min-w-[720px] text-left text-sm"><thead className="text-[var(--cm-muted)]"><tr><th className="p-3">Hari</th><th className="p-3">Jam</th><th className="p-3">Mata Kuliah</th><th className="p-3">Ruangan</th><th className="p-3"></th></tr></thead><tbody>{schedules.map((s) => <tr key={s.id} className="border-t border-[var(--cm-border)]"><td className="p-3 font-bold">{s.day_label || s.day_of_week}</td><td className="p-3 text-[var(--cm-muted)]">{s.start_time} - {s.end_time}</td><td className="p-3"><b>{s.course?.name || s.name}</b><p className="text-xs text-[var(--cm-muted)]">{s.course?.code || s.code || '-'}</p></td><td className="p-3 text-[var(--cm-muted)]">{s.room || '-'}</td><td className="p-3 text-right"><button onClick={() => router.delete(`/schedule/${s.id}`)} className="font-bold text-[var(--cm-danger)]">Delete</button></td></tr>)}</tbody></table></div></section>
        </CampusLayout>
    );
}
