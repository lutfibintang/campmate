import React, { useRef, useState } from 'react';
import { useForm, usePage } from '@inertiajs/react';
import CampusLayout from '../../layouts/CampusLayout';
import { Field, TextInput } from '../../components/TextInput';

export default function Edit({ user: propUser }) {
    const { auth } = usePage().props;
    const user = propUser || auth?.user || {};
    const inputRef = useRef(null);
    const [preview, setPreview] = useState(user.profile_photo_url || null);
    const { data, setData, post, processing, errors } = useForm({ name: user.name || '', email: user.email || '', profile_photo: null, _method: 'patch' });
    const choose = (file) => { setData('profile_photo', file); if (file) setPreview(URL.createObjectURL(file)); };
    return (
        <CampusLayout title="Profile" subtitle="Kelola nama, email, dan foto profil lu.">
            <form onSubmit={(e) => { e.preventDefault(); post('/profile'); }} className="cm-card cm-panel mx-auto max-w-2xl">
                <div className="mb-8 flex flex-col items-center text-center">
                    <button type="button" onClick={() => inputRef.current?.click()} className="grid h-32 w-32 place-items-center overflow-hidden rounded-full border border-[var(--cm-border)] bg-[var(--cm-primary-soft)] text-5xl">
                        {preview ? <img src={preview} className="h-full w-full object-cover" /> : '👤'}
                    </button>
                    <input ref={inputRef} type="file" accept="image/*" className="hidden" onChange={(e) => choose(e.target.files?.[0])} />
                    <p className="mt-3 text-sm text-[var(--cm-muted)]">Klik foto buat ganti avatar.</p>
                    {errors.profile_photo && <p className="mt-1 text-xs font-bold text-[var(--cm-danger)]">{errors.profile_photo}</p>}
                </div>
                <div className="grid gap-4">
                    <Field label="Nama" error={errors.name}><TextInput value={data.name} onChange={(e) => setData('name', e.target.value)} /></Field>
                    <Field label="Email" error={errors.email}><TextInput type="email" value={data.email} onChange={(e) => setData('email', e.target.value)} /></Field>
                    <button disabled={processing} className="cm-btn cm-btn-primary justify-self-end">Save Profile</button>
                </div>
            </form>
        </CampusLayout>
    );
}
