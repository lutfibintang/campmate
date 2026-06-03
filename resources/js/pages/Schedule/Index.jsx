import React from 'react';
import { useForm, router } from '@inertiajs/react';
import CampusLayout from '../../Layouts/CampusLayout';
import { Field, SelectInput, TextInput } from '../../Components/TextInput';
import { TimeField } from '../../Components/ReactDateTimeFields';

const days = [
    ['monday', 'Senin'], ['tuesday', 'Selasa'], ['wednesday', 'Rabu'], ['thursday', 'Kamis'], ['friday', 'Jumat'], ['saturday', 'Sabtu'], ['sunday', 'Minggu'],
];

export default function Index({ schedules = [] }) {
    const { data, setData, post, processing, errors, reset } = useForm({ name: '', code: '', lecturer: '', color: '#c9d68b', day_of_week: 'monday', start_time: '', end_time: '', room: '' });
    const submit = (e) => { e.preventDefault(); post('/schedule', { onSuccess: () => reset() }); };

    return (
        <CampusLayout title="Semester Schedule" subtitle="Masukin jadwal mata kuliah semester ini. Nanti CampusMate bisa warning kalau study session bentrok.">
            <div className="grid gap-6 lg:grid-cols-[380px_1fr]">
                <form onSubmit={submit} className="cm-card grid gap-4 p-6">
                    <Field label="Mata Kuliah" error={errors.name}><TextInput value={data.name} onChange={(e) => setData('name', e.target.value)} placeholder="Basis Data" /></Field>
                    <Field label="Kode" error={errors.code}><TextInput value={data.code} onChange={(e) => setData('code', e.target.value)} placeholder="INF-203" /></Field>
                    <Field label="Dosen" error={errors.lecturer}><TextInput value={data.lecturer} onChange={(e) => setData('lecturer', e.target.value)} placeholder="Nama dosen" /></Field>
                    <Field label="Hari" error={errors.day_of_week}><SelectInput value={data.day_of_week} onChange={(e) => setData('day_of_week', e.target.value)}>{days.map(([v,l]) => <option value={v} key={v}>{l}</option>)}</SelectInput></Field>
                    <div className="grid grid-cols-2 gap-4"><TimeField label="Jam Mulai" value={data.start_time} onChange={(v) => setData('start_time', v)} error={errors.start_time} /><TimeField label="Jam Selesai" value={data.end_time} onChange={(v) => setData('end_time', v)} error={errors.end_time} /></div>
                    <Field label="Ruangan"><TextInput value={data.room} onChange={(e) => setData('room', e.target.value)} placeholder="A2.3" /></Field>
                    <button disabled={processing} className="cm-btn cm-btn-primary">Tambah Jadwal</button>
                </form>
                <section className="cm-card p-6">
                    <h2 className="text-xl font-black">Weekly Timetable</h2>
                    <div className="mt-5 overflow-x-auto">
                        <table className="w-full min-w-[720px] border-separate border-spacing-2 text-left text-sm">
                            <thead>{days.slice(0,5).map(([d,l]) => null)}<tr><th className="p-3 text-[var(--cm-muted)]">Hari</th><th className="p-3 text-[var(--cm-muted)]">Jam</th><th className="p-3 text-[var(--cm-muted)]">Mata Kuliah</th><th className="p-3 text-[var(--cm-muted)]">Ruangan</th><th /></tr></thead>
                            <tbody>{schedules.map((s) => <tr key={s.id} className="cm-card-compact"><td className="p-3 font-black">{s.day_label}</td><td className="p-3 text-[var(--cm-muted)]">{s.start_time} - {s.end_time}</td><td className="p-3"><b>{s.course.name}</b><p className="text-xs text-[var(--cm-muted)]">{s.course.code || '-'}</p></td><td className="p-3 text-[var(--cm-muted)]">{s.room || '-'}</td><td className="p-3 text-right"><button onClick={() => router.delete(`/schedule/${s.id}`)} className="text-[var(--cm-danger)] font-bold">Delete</button></td></tr>)}</tbody>
                        </table>
                    </div>
                </section>
            </div>
        </CampusLayout>
    );
}
