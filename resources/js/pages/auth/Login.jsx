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
                    <label className="group flex cursor-pointer items-center gap-3">
                    <div className="relative">
                        <input
                            type="checkbox"
                            name="remember"
                            checked={data.remember}
                            onChange={(e) => setData('remember', e.target.checked)}
                            className="peer sr-only"
                        />

                        <div className="flex h-6 w-6 items-center justify-center rounded-lg border border-[var(--cm-border)] bg-[var(--cm-card-soft)] transition-all duration-200 peer-checked:border-[var(--cm-primary)] peer-checked:bg-[var(--cm-primary)]">
                            {data.remember && (
                                <svg
                                    className="h-3.5 w-3.5 text-black"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M16.704 5.29a1 1 0 010 1.42l-7.25 7.25a1 1 0 01-1.414 0l-3.25-3.25a1 1 0 111.414-1.42l2.543 2.544 6.543-6.544a1 1 0 011.414 0z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                            )}
                        </div>
                    </div>

                    <span className="text-sm font-semibold text-[var(--cm-muted)] transition group-hover:text-[var(--cm-text)]">
                        Remember me
                    </span>
                </label>

                    <button disabled={processing} className="cm-btn cm-btn-primary w-full">Login</button>
                </form>
                <p className="mt-6 text-center text-sm text-[var(--cm-muted)]">Belum punya akun? <Link href="/register" className="font-bold text-[var(--cm-primary)]">Register</Link></p>
            </div>
        </div>
    );
}
