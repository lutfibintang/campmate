import React from 'react';
import { Link, useForm } from '@inertiajs/react';
import Brand from '../../components/Brand';
import { Field, TextInput } from '../../components/TextInput';

export default function Register() {
    const { data, setData, post, processing, errors } = useForm({ name: '', email: '', password: '', password_confirmation: '' });
    const submit = (e) => { e.preventDefault(); post('/register'); };
    return (
        <div className="cm-page grid min-h-screen place-items-center p-4">
            <div className="cm-card cm-panel w-full max-w-md">
                <div className="mb-8 flex justify-center"><Brand href="/" /></div>
                <h1 className="text-center text-3xl font-black tracking-[-0.06em]">Bikin Akun</h1>
                <p className="mt-2 text-center text-[var(--cm-muted)]">Akun baru otomatis jadi user biasa.</p>
                <form onSubmit={submit} className="mt-7 grid gap-4">
                    <Field label="Nama" error={errors.name}><TextInput value={data.name} onChange={(e) => setData('name', e.target.value)} autoFocus /></Field>
                    <Field label="Email" error={errors.email}><TextInput type="email" value={data.email} onChange={(e) => setData('email', e.target.value)} /></Field>
                    <Field label="Password" error={errors.password}><TextInput type="password" value={data.password} onChange={(e) => setData('password', e.target.value)} /></Field>
                    <Field label="Confirm Password" error={errors.password_confirmation}><TextInput type="password" value={data.password_confirmation} onChange={(e) => setData('password_confirmation', e.target.value)} /></Field>
                    <button disabled={processing} className="cm-btn cm-btn-primary w-full">Register</button>
                </form>
                <p className="mt-6 text-center text-sm text-[var(--cm-muted)]">Udah punya akun? <Link href="/login" className="font-bold text-[var(--cm-primary)]">Login</Link></p>
            </div>
        </div>
    );
}
