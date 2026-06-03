import React from 'react';
import { Field, TextInput } from './TextInput';

export function DateField({ label = 'Pilih Tanggal', value, onChange, error }) {
    return (
        <Field label={label} error={error}>
            <TextInput type="date" value={value || ''} onChange={(e) => onChange(e.target.value)} />
        </Field>
    );
}

export function TimeField({ label = 'Jam', value, onChange, error }) {
    return (
        <Field label={label} error={error}>
            <TextInput type="time" value={value || ''} onChange={(e) => onChange(e.target.value)} />
        </Field>
    );
}

export function PhotoPicker({ label = 'Insert Photo', name = 'photo', onChange, preview, error }) {
    return (
        <Field label={label} error={error}>
            <label className="flex min-h-36 cursor-pointer flex-col items-center justify-center gap-3 rounded-3xl border border-dashed border-[var(--cm-border)] bg-[var(--cm-primary-soft)] p-5 text-center text-sm font-bold text-[var(--cm-muted)] transition hover:border-[var(--cm-primary)] hover:text-[var(--cm-primary)]">
                {preview ? <img src={preview} alt="Preview" className="h-32 w-full rounded-2xl object-cover" /> : <span>Upload / drag photo<br /><small>PNG, JPG, max 2MB</small></span>}
                <input type="file" name={name} accept="image/*" className="hidden" onChange={onChange} />
            </label>
        </Field>
    );
}
