import React from 'react';
import { Link, useForm } from '@inertiajs/react';
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

export default function Edit({ schedule }) {
    const { data, setData, patch, processing, errors } = useForm({
        name: schedule?.course?.name || '',
        code: schedule?.course?.code || '',
        lecturer: schedule?.course?.lecturer || '',
        color: schedule?.course?.color || '#c8d889',
        day_of_week: schedule?.day_of_week || '',
        start_time: schedule?.start_time || '',
        end_time: schedule?.end_time || '',
        room: schedule?.room || '',
    });

    const submit = (e) => {
        e.preventDefault();
        patch(`/schedule/${schedule.id}`);
    };

    const dayOptions = days.map(([value, label]) => ({
        value,
        label,
        caption: `Jadwal hari ${label}`,
        icon: label.slice(0, 1),
    }));

    return (
        <CampusLayout title="Edit Schedule" subtitle="Ubah data jadwal yang sudah dibuat. Akhirnya bisa edit, bukan delete-create kayak manusia barbar UI.">
            <form onSubmit={submit} className="cm-card cm-panel mx-auto grid max-w-5xl gap-4 lg:grid-cols-2">
                <Field label="Mata Kuliah" error={errors.name}>
                    <TextInput value={data.name} onChange={(e) => setData('name', e.target.value)} placeholder="Basis Data" />
                </Field>
                <Field label="Kode" error={errors.code}>
                    <TextInput value={data.code} onChange={(e) => setData('code', e.target.value)} placeholder="INF-203" />
                </Field>
                <Field label="Dosen" error={errors.lecturer}>
                    <TextInput value={data.lecturer} onChange={(e) => setData('lecturer', e.target.value)} placeholder="Nama dosen" />
                </Field>
                <Field label="Ruangan" error={errors.room}>
                    <TextInput value={data.room} onChange={(e) => setData('room', e.target.value)} placeholder="A2.3" />
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
                <div className="grid gap-4 sm:grid-cols-2">
                    <TimeField label="Jam Mulai" value={data.start_time} onChange={(value) => setData('start_time', value)} error={errors.start_time} />
                    <TimeField label="Jam Selesai" value={data.end_time} onChange={(value) => setData('end_time', value)} error={errors.end_time} />
                </div>

                <div className="lg:col-span-2 flex flex-wrap items-center justify-end gap-3">
                    <Link href="/schedule" className="cm-btn cm-btn-ghost">Batal</Link>
                    <button disabled={processing} className="cm-btn cm-btn-primary">Simpan Perubahan</button>
                </div>
            </form>
        </CampusLayout>
    );
}
