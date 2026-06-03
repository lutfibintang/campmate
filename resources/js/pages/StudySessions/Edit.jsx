import React from 'react';
import { Link, useForm } from '@inertiajs/react';
import CampusLayout from '../../layouts/CampusLayout';
import { Field, TextArea, TextInput } from '../../components/TextInput';
import { DateField, TimeField } from '../../components/ReactDateTimeFields';

const types = [
    ['offline', 'Offline'],
    ['online', 'Online'],
    ['hybrid', 'Hybrid'],
];

export default function Edit({ session }) {
    const { data, setData, patch, processing, errors } = useForm({
        subject: session.subject || '',
        title: session.title || '',
        description: session.description || '',
        session_type: session.session_type || 'offline',
        location: session.location || '',
        meeting_platform: session.meeting_platform || '',
        meeting_link: session.meeting_link || '',
        session_date: session.session_date || '',
        start_time: session.start_time || '',
        end_time: session.end_time || '',
        max_participants: session.max_participants || 5,
    });

    const submit = (event) => {
        event.preventDefault();
        patch(`/study-sessions/${session.id}`);
    };

    return (
        <CampusLayout title="Edit Study Session" subtitle="Owner dan admin bisa update sesi ini.">
            <form onSubmit={submit} className="cm-card cm-panel grid gap-4 lg:grid-cols-2">
                <Field label="Judul" error={errors.title}>
                    <TextInput value={data.title} onChange={(event) => setData('title', event.target.value)} placeholder="Belajar Laravel bareng" />
                </Field>

                <Field label="Subject" error={errors.subject}>
                    <TextInput value={data.subject} onChange={(event) => setData('subject', event.target.value)} placeholder="PBW / Basis Data / RPL" />
                </Field>

                <Field label="Mode" error={errors.session_type}>
                    <select
                        value={data.session_type}
                        onChange={(event) => setData('session_type', event.target.value)}
                        className="cm-input"
                    >
                        {types.map(([value, label]) => (
                            <option key={value} value={value}>{label}</option>
                        ))}
                    </select>
                </Field>

                <Field label="Lokasi" error={errors.location}>
                    <TextInput value={data.location} onChange={(event) => setData('location', event.target.value)} placeholder="Cafe / Perpustakaan / Lab" />
                </Field>

                <DateField label="Tanggal" value={data.session_date} onChange={(value) => setData('session_date', value)} error={errors.session_date} />
                <TimeField label="Jam Mulai" value={data.start_time} onChange={(value) => setData('start_time', value)} error={errors.start_time} />
                <TimeField label="Jam Selesai" value={data.end_time} onChange={(value) => setData('end_time', value)} error={errors.end_time} />

                <Field label="Maks Peserta" error={errors.max_participants}>
                    <TextInput type="number" min="2" max="50" value={data.max_participants} onChange={(event) => setData('max_participants', event.target.value)} />
                </Field>

                <Field label="Platform Meeting" error={errors.meeting_platform}>
                    <TextInput value={data.meeting_platform} onChange={(event) => setData('meeting_platform', event.target.value)} placeholder="Google Meet / Zoom / Discord" />
                </Field>

                <Field label="Link Meeting" error={errors.meeting_link}>
                    <TextInput value={data.meeting_link} onChange={(event) => setData('meeting_link', event.target.value)} placeholder="https://..." />
                </Field>

                <Field label="Deskripsi" error={errors.description} className="lg:col-span-2">
                    <TextArea value={data.description} onChange={(event) => setData('description', event.target.value)} placeholder="Bahas apa aja di sesi ini?" />
                </Field>

                <div className="lg:col-span-2 flex flex-wrap justify-end gap-3">
                    <Link href={`/study-sessions/${session.id}`} className="cm-btn cm-btn-ghost">
                        Cancel
                    </Link>
                    <button disabled={processing} className="cm-btn cm-btn-primary">
                        Save Changes
                    </button>
                </div>
            </form>
        </CampusLayout>
    );
}
