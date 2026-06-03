import React from 'react';
import { Link, useForm } from '@inertiajs/react';
import Brand from '../../components/Brand';
import { Field, TextInput } from '../../components/TextInput';

export default function Login({ status }) {
    const { data, setData, post, processing, errors } = useForm({ email: '', password: '', remember: false });
    const submit = (e) => { e.preventDefault(); post('/login'); };
    return (
        <div className="cm-page grid min-h-screen place-items-center p-4">
            <div className="cm-card cm-panel w-full max-w-md">
                <div className="mb-8 flex justify-center"><Brand href="/" /></div>
                <h1 className="text-center text-3xl font-black tracking-[-0.06em]">Masuk CampusMate</h1>
                <p className="mt-2 text-center text-[var(--cm-muted)]">Login sebagai user atau admin.</p>
                {status && <div className="mt-4 rounded-2xl bg-[var(--cm-primary-soft)] p-3 text-sm text-[var(--cm-primary)]">{status}</div>}
                <form onSubmit={submit} className="mt-7 grid gap-4">
                    <Field label="Email" error={errors.email}><TextInput type="email" value={data.email} onChange={(e) => setData('email', e.target.value)} autoFocus /></Field>
                    <Field label="Password" error={errors.password}><TextInput type="password" value={data.password} onChange={(e) => setData('password', e.target.value)} /></Field>
                    <label className="flex items-center gap-2 text-sm text-[var(--cm-muted)]"><input type="checkbox" checked={data.remember} onChange={(e) => setData('remember', e.target.checked)} /> Remember me</label>
                    <button disabled={processing} className="cm-btn cm-btn-primary w-full">Login</button>
                </form>
                <p className="mt-6 text-center text-sm text-[var(--cm-muted)]">Belum punya akun? <Link href="/register" className="font-bold text-[var(--cm-primary)]">Register</Link></p>
            </div>
        </div>
    );
}
