import React from 'react';
import { useForm } from '@inertiajs/react';
import CampusLayout from '../../layouts/CampusLayout';
import { Field, SelectInput, TextArea, TextInput } from '../../components/TextInput';
import { DateField, TimeField } from '../../components/ReactDateTimeFields';

export default function Create({ subjects = [] }) {
    const { data, setData, post, processing, errors } = useForm({
        title: '', subject_id: '', description: '', location: '', meeting_platform: '', meeting_link: '', session_type: 'offline', session_date: '', start_time: '', end_time: '', max_participants: 5,
    });
    const submit = (e) => { e.preventDefault(); post('/study-sessions'); };
    return (
        <CampusLayout title="Create Study Session" subtitle="Bikin sesi offline, online, atau hybrid. Jangan lupa cek bentrok jadwal.">
            <form onSubmit={submit} className="cm-card cm-panel grid gap-5 lg:grid-cols-2">
                <Field label="Judul Sesi" error={errors.title}><TextInput value={data.title} onChange={(e) => setData('title', e.target.value)} placeholder="Belajar Laravel eloquent" /></Field>
                <Field label="Subject" error={errors.subject_id}><SelectInput value={data.subject_id} onChange={(e) => setData('subject_id', e.target.value)}><option value="">Pilih subject</option>{subjects.map((s) => <option key={s.id} value={s.id}>{s.name}</option>)}</SelectInput></Field>
                <Field label="Mode"><SelectInput value={data.session_type} onChange={(e) => setData('session_type', e.target.value)}><option value="offline">Offline</option><option value="online">Online</option><option value="hybrid">Hybrid</option></SelectInput></Field>
                <Field label="Lokasi / Link" error={errors.location}><TextInput value={data.location} onChange={(e) => setData('location', e.target.value)} placeholder="Perpustakaan / Google Meet" /></Field>
                <DateField value={data.session_date} onChange={(v) => setData('session_date', v)} error={errors.session_date} />
                <div className="grid gap-4 sm:grid-cols-2"><TimeField label="Jam Mulai" value={data.start_time} onChange={(v) => setData('start_time', v)} error={errors.start_time} /><TimeField label="Jam Selesai" value={data.end_time} onChange={(v) => setData('end_time', v)} error={errors.end_time} /></div>
                <Field label="Max Peserta"><TextInput type="number" min="2" value={data.max_participants} onChange={(e) => setData('max_participants', e.target.value)} /></Field>
                <Field label="Meeting Platform"><TextInput value={data.meeting_platform} onChange={(e) => setData('meeting_platform', e.target.value)} placeholder="Google Meet / Zoom / Discord" /></Field>
                <div className="lg:col-span-2"><Field label="Deskripsi"><TextArea value={data.description} onChange={(e) => setData('description', e.target.value)} placeholder="Bahas apa aja di sesi ini?" /></Field></div>
                <div className="lg:col-span-2 flex justify-end"><button disabled={processing} className="cm-btn cm-btn-primary">Create Session</button></div>
            </form>
        </CampusLayout>
    );
}
