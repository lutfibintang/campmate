import React from 'react';
import { Link, useForm } from '@inertiajs/react';
import CampusLayout from '../../layouts/CampusLayout';
import { Field, SelectInput, TextArea, TextInput } from '../../components/TextInput';
import { DateField, TimeField } from '../../components/ReactDateTimeFields';

export default function Create() {
    const { data, setData, post, processing, errors } = useForm({
        title: '',
        subject: '',
        description: '',
        location: '',
        meeting_platform: '',
        meeting_link: '',
        session_type: 'offline',
        session_date: '',
        start_time: '',
        end_time: '',
        max_participants: 5,
    });

    const submit = (e) => {
        e.preventDefault();
        post('/study-sessions');
    };

    return (
        <CampusLayout
            title="Create Study Session"
            subtitle="Bikin sesi belajar baru. Subject sekarang bebas diketik, bukan dropdown kaku yang isinya suka kurang niat."
        >
            <form onSubmit={submit} className="cm-card cm-panel grid gap-4 lg:grid-cols-2">
                <Field label="Judul Session" error={errors.title}>
                    <TextInput
                        value={data.title}
                        onChange={(e) => setData('title', e.target.value)}
                        placeholder="Belajar Laravel Eloquent"
                    />
                </Field>

                <Field label="Subject" error={errors.subject}>
                    <TextInput
                        value={data.subject}
                        onChange={(e) => setData('subject', e.target.value)}
                        placeholder="Basis Data / Laravel / Struktur Data"
                    />
                </Field>

                <Field label="Mode" error={errors.session_type}>
                    <SelectInput value={data.session_type} onChange={(e) => setData('session_type', e.target.value)}>
                        <option value="offline">Offline</option>
                        <option value="online">Online</option>
                        <option value="hybrid">Hybrid</option>
                    </SelectInput>
                </Field>

                <Field label="Lokasi" error={errors.location}>
                    <TextInput
                        value={data.location}
                        onChange={(e) => setData('location', e.target.value)}
                        placeholder="Perpustakaan / Ruang kelas / Cafe"
                    />
                </Field>

                <DateField
                    label="Tanggal"
                    value={data.session_date}
                    onChange={(value) => setData('session_date', value)}
                    error={errors.session_date}
                />

                <div className="grid gap-4 sm:grid-cols-2">
                    <TimeField
                        label="Jam Mulai"
                        value={data.start_time}
                        onChange={(value) => setData('start_time', value)}
                        error={errors.start_time}
                    />
                    <TimeField
                        label="Jam Selesai"
                        value={data.end_time}
                        onChange={(value) => setData('end_time', value)}
                        error={errors.end_time}
                    />
                </div>

                <Field label="Max Participants" error={errors.max_participants}>
                    <TextInput
                        type="number"
                        min="2"
                        max="50"
                        value={data.max_participants}
                        onChange={(e) => setData('max_participants', e.target.value)}
                    />
                </Field>

                <Field label="Platform Meeting" error={errors.meeting_platform}>
                    <TextInput
                        value={data.meeting_platform}
                        onChange={(e) => setData('meeting_platform', e.target.value)}
                        placeholder="Google Meet / Zoom / Discord"
                    />
                </Field>

                <Field label="Link Meeting" error={errors.meeting_link}>
                    <TextInput
                        value={data.meeting_link}
                        onChange={(e) => setData('meeting_link', e.target.value)}
                        placeholder="https://meet.google.com/..."
                    />
                </Field>

                <div className="lg:col-span-2">
                    <Field label="Deskripsi" error={errors.description}>
                        <TextArea
                            value={data.description}
                            onChange={(e) => setData('description', e.target.value)}
                            placeholder="Bahas apa aja di sesi ini?"
                        />
                    </Field>
                </div>

                <div className="lg:col-span-2 flex flex-wrap items-center justify-end gap-3">
                    <Link href="/study-sessions" className="cm-btn cm-btn-ghost">Batal</Link>
                    <button disabled={processing} className="cm-btn cm-btn-primary">
                        Create Session
                    </button>
                </div>
            </form>
        </CampusLayout>
    );
}
