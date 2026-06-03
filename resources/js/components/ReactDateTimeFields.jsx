import React from 'react';
import { Field, TextInput } from './TextInput';

export function DateField({ label = 'Tanggal', value, onChange, error }) {
    return (
        <Field label={label} error={error}>
            <TextInput type="date" value={value || ''} onChange={(e) => onChange?.(e.target.value)} />
        </Field>
    );
}

export function TimeField({ label = 'Jam', value, onChange, error }) {
    return (
        <Field label={label} error={error}>
            <TextInput type="time" value={value || ''} onChange={(e) => onChange?.(e.target.value)} />
        </Field>
    );
}
