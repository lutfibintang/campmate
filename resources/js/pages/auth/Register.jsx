import React from 'react';
import { Link, useForm } from '@inertiajs/react';

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    const submit = (event) => {
        event.preventDefault();
        post('/register', {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    return (
        <AuthShell title="Buat Akun" subtitle="Register otomatis jadi user biasa.">
            <form onSubmit={submit} className="space-y-4">
                <Field label="Nama" error={errors.name}>
                    <input
                        type="text"
                        value={data.name}
                        onChange={(e) => setData('name', e.target.value)}
                        className="w-full rounded-2xl border border-[var(--border)] bg-[var(--surface)] px-4 py-3 outline-none focus:ring-2 focus:ring-[var(--primary-soft)]"
                        autoFocus
                    />
                </Field>

                <Field label="Email" error={errors.email}>
                    <input
                        type="email"
                        value={data.email}
                        onChange={(e) => setData('email', e.target.value)}
                        className="w-full rounded-2xl border border-[var(--border)] bg-[var(--surface)] px-4 py-3 outline-none focus:ring-2 focus:ring-[var(--primary-soft)]"
                    />
                </Field>

                <Field label="Password" error={errors.password}>
                    <input
                        type="password"
                        value={data.password}
                        onChange={(e) => setData('password', e.target.value)}
                        className="w-full rounded-2xl border border-[var(--border)] bg-[var(--surface)] px-4 py-3 outline-none focus:ring-2 focus:ring-[var(--primary-soft)]"
                    />
                </Field>

                <Field label="Konfirmasi Password">
                    <input
                        type="password"
                        value={data.password_confirmation}
                        onChange={(e) => setData('password_confirmation', e.target.value)}
                        className="w-full rounded-2xl border border-[var(--border)] bg-[var(--surface)] px-4 py-3 outline-none focus:ring-2 focus:ring-[var(--primary-soft)]"
                    />
                </Field>

                <button
                    disabled={processing}
                    className="w-full rounded-2xl bg-[var(--primary)] px-5 py-3 font-black text-white disabled:opacity-60"
                >
                    {processing ? 'Membuat akun...' : 'Register'}
                </button>

                <p className="text-center text-sm text-[var(--muted)]">
                    Udah punya akun?{' '}
                    <Link href="/login" className="font-black text-[var(--primary)]">
                        Login
                    </Link>
                </p>
            </form>
        </AuthShell>
    );
}

function Field({ label, error, children }) {
    return (
        <label className="block space-y-2">
            <span className="text-sm font-black">{label}</span>
            {children}
            {error && <p className="text-sm font-bold text-red-500">{error}</p>}
        </label>
    );
}

function AuthShell({ title, subtitle, children }) {
    return (
        <div className="grid min-h-screen place-items-center bg-[var(--bg)] px-4 text-[var(--text)]">
            <div className="w-full max-w-md rounded-[2rem] border border-[var(--border)] bg-[var(--card)] p-8 shadow-xl shadow-black/10">
                <Link href="/" className="mb-8 block text-center text-2xl font-black">
                    CampusMate
                </Link>
                <div className="mb-6 text-center">
                    <h1 className="text-3xl font-black">{title}</h1>
                    <p className="mt-2 text-sm text-[var(--muted)]">{subtitle}</p>
                </div>
                {children}
            </div>
        </div>
    );
}
