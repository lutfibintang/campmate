import React from 'react';
import { Link, useForm } from '@inertiajs/react';

export default function Login() {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const submit = (event) => {
        event.preventDefault();
        post('/login', {
            onFinish: () => reset('password'),
        });
    };

    return (
        <AuthShell title="Masuk CampusMate" subtitle="Login sebagai user biasa atau admin.">
            <form onSubmit={submit} className="space-y-4">
                <Field label="Email" error={errors.email}>
                    <input
                        type="email"
                        value={data.email}
                        onChange={(e) => setData('email', e.target.value)}
                        className="w-full rounded-2xl border border-[var(--border)] bg-[var(--surface)] px-4 py-3 outline-none focus:ring-2 focus:ring-[var(--primary-soft)]"
                        autoFocus
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

                <label className="flex items-center gap-3 text-sm text-[var(--muted)]">
                    <input
                        type="checkbox"
                        checked={data.remember}
                        onChange={(e) => setData('remember', e.target.checked)}
                    />
                    Remember me
                </label>

                <button
                    disabled={processing}
                    className="w-full rounded-2xl bg-[var(--primary)] px-5 py-3 font-black text-white disabled:opacity-60"
                >
                    {processing ? 'Masuk...' : 'Login'}
                </button>

                <p className="text-center text-sm text-[var(--muted)]">
                    Belum punya akun?{' '}
                    <Link href="/register" className="font-black text-[var(--primary)]">
                        Register
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
