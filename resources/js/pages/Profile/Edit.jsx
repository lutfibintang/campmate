import React, { useRef, useState } from 'react';
import { useForm, usePage } from '@inertiajs/react';
import CampusLayout from '../../layouts/CampusLayout';
import { Field, TextInput } from '../../components/TextInput';

export default function Edit({ user: propUser }) {
    const { auth } = usePage().props;
    const user = propUser || auth?.user || {};
    const inputRef = useRef(null);
    const [preview, setPreview] = useState(user.profile_photo_url || null);

    const profileForm = useForm({
        name: user.name || '',
        email: user.email || '',
        profile_photo: null,
        _method: 'patch',
    });

    const passwordForm = useForm({
        current_password: '',
        password: '',
        password_confirmation: '',
    });

    const choose = (file) => {
        profileForm.setData('profile_photo', file);
        if (file) setPreview(URL.createObjectURL(file));
    };

    const submitProfile = (e) => {
        e.preventDefault();
        profileForm.post('/profile', {
            preserveScroll: true,
            forceFormData: true,
        });
    };

    const submitPassword = (e) => {
        e.preventDefault();
        passwordForm.put('/profile/password', {
            preserveScroll: true,
            onSuccess: () => passwordForm.reset('current_password', 'password', 'password_confirmation'),
        });
    };

    return (
        <CampusLayout title="Profile" subtitle="Atur identitas akun dan ganti password. Jangan pakai password 'password123', itu bukan keamanan, itu undangan terbuka.">
            <div className="grid gap-7 lg:grid-cols-[.95fr_1.05fr]">
                <form onSubmit={submitProfile} className="cm-card cm-panel">
                    <div className="flex flex-col items-center text-center">
                        <button
                            type="button"
                            onClick={() => inputRef.current?.click()}
                            className="grid h-32 w-32 place-items-center overflow-hidden rounded-full border border-[var(--cm-border)] bg-[var(--cm-primary-soft)] text-5xl shadow-[0_18px_45px_rgba(0,0,0,0.16)]"
                        >
                            {preview ? <img src={preview} alt="Profile preview" className="h-full w-full object-cover" /> : '👤'}
                        </button>
                        <input
                            ref={inputRef}
                            type="file"
                            className="hidden"
                            accept="image/*"
                            onChange={(e) => choose(e.target.files?.[0])}
                        />
                        <p className="mt-4 text-sm font-bold text-[var(--cm-muted)]">Klik foto buat ganti avatar.</p>
                        {profileForm.errors.profile_photo && <p className="mt-2 text-sm font-bold text-[var(--cm-danger)]">{profileForm.errors.profile_photo}</p>}
                    </div>

                    <div className="mt-6 grid gap-4">
                        <Field label="Nama" error={profileForm.errors.name}>
                            <TextInput value={profileForm.data.name} onChange={(e) => profileForm.setData('name', e.target.value)} />
                        </Field>
                        <Field label="Email" error={profileForm.errors.email}>
                            <TextInput type="email" value={profileForm.data.email} onChange={(e) => profileForm.setData('email', e.target.value)} />
                        </Field>
                    </div>

                    <div className="mt-6 flex justify-end">
                        <button disabled={profileForm.processing} className="cm-btn cm-btn-primary">Save Profile</button>
                    </div>
                </form>

                <form onSubmit={submitPassword} className="cm-card cm-panel">
                    <div className="mb-6">
                        <p className="text-xs font-black uppercase tracking-[0.22em] text-[var(--cm-primary)]">Security</p>
                        <h2 className="mt-1 text-2xl font-black tracking-[-0.05em] text-[var(--cm-text)]">Ganti Password</h2>
                        <p className="mt-2 text-sm font-semibold leading-6 text-[var(--cm-muted)]">
                            Masukkan password lama, lalu password baru. Setelah berhasil, form ini auto kosong lagi.
                        </p>
                    </div>

                    <div className="grid gap-4">
                        <Field label="Current Password" error={passwordForm.errors.current_password}>
                            <TextInput
                                type="password"
                                value={passwordForm.data.current_password}
                                onChange={(e) => passwordForm.setData('current_password', e.target.value)}
                                placeholder="Password sekarang"
                                autoComplete="current-password"
                            />
                        </Field>
                        <Field label="New Password" error={passwordForm.errors.password}>
                            <TextInput
                                type="password"
                                value={passwordForm.data.password}
                                onChange={(e) => passwordForm.setData('password', e.target.value)}
                                placeholder="Password baru"
                                autoComplete="new-password"
                            />
                        </Field>
                        <Field label="Confirm Password" error={passwordForm.errors.password_confirmation}>
                            <TextInput
                                type="password"
                                value={passwordForm.data.password_confirmation}
                                onChange={(e) => passwordForm.setData('password_confirmation', e.target.value)}
                                placeholder="Ulangi password baru"
                                autoComplete="new-password"
                            />
                        </Field>
                    </div>

                    <div className="mt-6 flex justify-end">
                        <button disabled={passwordForm.processing} className="cm-btn cm-btn-primary">Update Password</button>
                    </div>
                </form>
            </div>
        </CampusLayout>
    );
}
