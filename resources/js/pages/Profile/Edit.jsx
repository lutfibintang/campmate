import React, { useRef, useState } from 'react';
import { useForm } from '@inertiajs/react';
import CampusLayout from '../../Layouts/CampusLayout';
import { Field, TextInput } from '../../Components/TextInput';

export default function Edit({ user }) {
    const input = useRef(null);
    const { data, setData, post, processing, errors } = useForm({ name: user.name || '', email: user.email || '', profile_photo: null, _method: 'patch' });
    const [preview, setPreview] = useState(user.profile_photo_url || null);
    const pick = (e) => { const f = e.target.files?.[0]; setData('profile_photo', f); setPreview(f ? URL.createObjectURL(f) : preview); };
    const submit = (e) => { e.preventDefault(); post('/profile'); };

    return (
        <CampusLayout title="Profile" subtitle="Ubah identitas akun dan foto profil.">
            <form onSubmit={submit} encType="multipart/form-data" className="cm-card mx-auto max-w-2xl p-7">
                <div className="flex flex-col items-center text-center">
                    <button type="button" onClick={() => input.current?.click()} className="group relative h-32 w-32 overflow-hidden rounded-full border-4 border-[var(--cm-border)] bg-[var(--cm-primary-soft)]">
                        {preview ? <img src={preview} className="h-full w-full object-cover" /> : <span className="text-4xl font-black text-[var(--cm-primary)]">{user.name?.[0]}</span>}
                        <span className="absolute inset-x-0 bottom-0 bg-black/55 py-2 text-xs font-black text-white opacity-0 transition group-hover:opacity-100">Change</span>
                    </button>
                    <input ref={input} type="file" className="hidden" accept="image/*" onChange={pick} />
                    <p className="mt-3 text-sm text-[var(--cm-muted)]">Klik foto buat upload gambar baru.</p>
                </div>
                <div className="mt-8 grid gap-4">
                    <Field label="Name" error={errors.name}><TextInput value={data.name} onChange={(e) => setData('name', e.target.value)} /></Field>
                    <Field label="Email" error={errors.email}><TextInput type="email" value={data.email} onChange={(e) => setData('email', e.target.value)} /></Field>
                    <button disabled={processing} className="cm-btn cm-btn-primary w-fit">Save Profile</button>
                </div>
            </form>
        </CampusLayout>
    );
}
