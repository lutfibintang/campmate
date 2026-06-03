import React from 'react';
import { useForm } from '@inertiajs/react';
import CampusLayout from '../../Layouts/CampusLayout';
import { Field, SelectInput, TextArea, TextInput } from '../../Components/TextInput';
import { DateField, TimeField, PhotoPicker } from '../../Components/ReactDateTimeFields';
import BackButton from '../../Components/BackButton';

export default function Create({ subjects = [] }) {
    const { data, setData, post, processing, errors } = useForm({
        subject_id: subjects[0]?.id || '', title: '', description: '', session_type: 'offline', location: '', meeting_platform: '', meeting_link: '', session_date: '', start_time: '', end_time: '', max_participants: 5, photo: null,
    });
    const [preview, setPreview] = React.useState(null);

    const submit = (e) => { e.preventDefault(); post('/study-sessions'); };
    const choosePhoto = (e) => { const f = e.target.files?.[0]; setData('photo', f); setPreview(f ? URL.createObjectURL(f) : null); };

    return (
        <CampusLayout title="Create Study Session" subtitle="Bikin sesi belajar yang jelas: topik, waktu, tempat/link, dan kuota.">
            <BackButton />
            <form onSubmit={submit} className="cm-card mt-5 grid gap-5 p-6 lg:grid-cols-2" encType="multipart/form-data">
                <Field label="Judul Sesi" error={errors.title}><TextInput value={data.title} onChange={(e) => setData('title', e.target.value)} placeholder="Contoh: Belajar Laravel Eloquent" /></Field>
                <Field label="Subject" error={errors.subject_id}><SelectInput value={data.subject_id} onChange={(e) => setData('subject_id', e.target.value)}>{subjects.map((s) => <option key={s.id} value={s.id}>{s.name}</option>)}</SelectInput></Field>
                <Field label="Mode" error={errors.session_type}><SelectInput value={data.session_type} onChange={(e) => setData('session_type', e.target.value)}><option value="offline">Offline</option><option value="online">Online</option><option value="hybrid">Hybrid</option></SelectInput></Field>
                <Field label="Lokasi / Link" error={errors.location || errors.meeting_link}><TextInput value={data.location} onChange={(e) => setData('location', e.target.value)} placeholder="Perpustakaan FMIPA / Lab / Ruangan" /></Field>
                <DateField value={data.session_date} onChange={(v) => setData('session_date', v)} error={errors.session_date} />
                <div className="grid grid-cols-2 gap-4"><TimeField label="Jam Mulai" value={data.start_time} onChange={(v) => setData('start_time', v)} error={errors.start_time} /><TimeField label="Jam Selesai" value={data.end_time} onChange={(v) => setData('end_time', v)} error={errors.end_time} /></div>
                <Field label="Meeting Platform"><TextInput value={data.meeting_platform} onChange={(e) => setData('meeting_platform', e.target.value)} placeholder="Google Meet / Zoom / Discord" /></Field>
                <Field label="Meeting Link"><TextInput value={data.meeting_link} onChange={(e) => setData('meeting_link', e.target.value)} placeholder="https://meet.google.com/..." /></Field>
                <Field label="Max Peserta" error={errors.max_participants}><TextInput type="number" min="2" max="50" value={data.max_participants} onChange={(e) => setData('max_participants', e.target.value)} /></Field>
                <PhotoPicker preview={preview} onChange={choosePhoto} error={errors.photo} />
                <Field label="Deskripsi" error={errors.description}><TextArea value={data.description} onChange={(e) => setData('description', e.target.value)} placeholder="Jelaskan materi yang mau dibahas..." /></Field>
                <div className="lg:col-span-2"><button disabled={processing} className="cm-btn cm-btn-primary">Create Session</button></div>
            </form>
        </CampusLayout>
    );
}
