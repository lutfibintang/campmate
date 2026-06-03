import React from 'react';
import { Link, router, useForm } from '@inertiajs/react';
import CampusLayout from '../../layouts/CampusLayout';
import { Field, TextInput } from '../../components/TextInput';
import { TimeField } from '../../components/ReactDateTimeFields';
import DayPicker from '@/components/forms/DayPicker';

const days = [
    ['monday', 'Senin'],
    ['tuesday', 'Selasa'],
    ['wednesday', 'Rabu'],
    ['thursday', 'Kamis'],
    ['friday', 'Jumat'],
    ['saturday', 'Sabtu'],
    ['sunday', 'Minggu'],
];

export default function Index({ schedules = [] }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        code: '',
        lecturer: '',
        color: '#c8d889',
        day_of_week: '',
        start_time: '',
        end_time: '',
        room: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post('/schedule', { onSuccess: () => reset() });
    };

    const dayOptions = days.map(([value, label]) => ({
        value,
        label,
        caption: `Jadwal hari ${label}`,
        icon: label.slice(0, 1),
    }));

    return (
        <CampusLayout title="Semester Schedule" subtitle="Masukin jadwal mata kuliah semester ini biar CampusMate bisa warning kalau sesi bentrok.">
            <form onSubmit={submit} className="cm-card cm-panel mb-7 grid gap-4 lg:grid-cols-3">
                <Field label="Mata Kuliah" error={errors.name}>
                    <TextInput value={data.name} onChange={(e) => setData('name', e.target.value)} placeholder="Masukan Nama Mata Kuliah" />
                </Field>
                <Field label="Kode" error={errors.code}>
                    <TextInput value={data.code} onChange={(e) => setData('code', e.target.value)} placeholder="Masukan Kode Mata Kuliah" />
                </Field>
                <Field label="Dosen" error={errors.lecturer}>
                    <TextInput value={data.lecturer} onChange={(e) => setData('lecturer', e.target.value)} placeholder="Masukan Nama Dosen" />
                </Field>

                <DayPicker
                    name="day_of_week"
                    label="Hari"
                    placeholder="Pilih hari"
                    value={data.day_of_week}
                    defaultValue={data.day_of_week}
                    onChange={(value) => setData('day_of_week', value)}
                    options={dayOptions}
                />

                <TimeField label="Jam Mulai" value={data.start_time} onChange={(value) => setData('start_time', value)} error={errors.start_time} />
                <TimeField label="Jam Selesai" value={data.end_time} onChange={(value) => setData('end_time', value)} error={errors.end_time} />
                <Field label="Ruangan" error={errors.room}>
                    <TextInput value={data.room} onChange={(e) => setData('room', e.target.value)} placeholder="A2.3" />
                </Field>

                <div className="lg:col-span-2 flex items-end justify-end">
                    <button disabled={processing} className="cm-btn cm-btn-primary">Tambah Jadwal</button>
                </div>
            </form>

            <section className="cm-card cm-panel">
                <div className="flex flex-wrap items-end justify-between gap-3">
                    <div>
                        <p className="text-xs font-black uppercase tracking-[0.22em] text-[var(--cm-subtle)]">Schedule</p>
                        <h2 className="text-2xl font-black tracking-[-0.05em]">Weekly Timetable</h2>
                    </div>
                    <span className="rounded-full border border-[var(--cm-border)] px-4 py-2 text-xs font-black text-[var(--cm-muted)]">
                        {schedules.length} jadwal
                    </span>
                </div>

                <div className="mt-5 overflow-x-auto">
                    <table className="w-full min-w-[760px] text-left text-sm">
                        <thead className="text-[var(--cm-muted)]">
                            <tr>
                                <th className="p-3">Hari</th>
                                <th className="p-3">Jam</th>
                                <th className="p-3">Mata Kuliah</th>
                                <th className="p-3">Ruangan</th>
                                <th className="p-3 text-right">Aksi</th>
                            </tr>
                        </thead>
                        <tbody>
                            {schedules.map((schedule) => (
                                <tr key={schedule.id} className="border-t border-[var(--cm-border)]">
                                    <td className="p-3 font-bold">{schedule.day_label || schedule.day_of_week}</td>
                                    <td className="p-3 text-[var(--cm-muted)]">{schedule.start_time} - {schedule.end_time}</td>
                                    <td className="p-3">
                                        <b>{schedule.course?.name || schedule.name}</b>
                                        <p className="text-xs text-[var(--cm-muted)]">{schedule.course?.code || schedule.code || '-'}</p>
                                    </td>
                                    <td className="p-3 text-[var(--cm-muted)]">{schedule.room || '-'}</td>
                                    <td className="p-3 text-right">
                                        <div className="flex justify-end gap-3">
                                            <Link href={`/schedule/${schedule.id}/edit`} className="font-bold text-[var(--cm-primary)]">
                                                Edit
                                            </Link>
                                            <button onClick={() => router.delete(`/schedule/${schedule.id}`)} className="font-bold text-[var(--cm-danger)]" type="button">
                                                Delete
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </section>
        </CampusLayout>
    );
}
