import React, { useEffect, useId, useMemo, useRef, useState } from 'react';

const DAYS = ['Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab', 'Min'];

function pad(value) {
    return String(value).padStart(2, '0');
}

function toISO(date) {
    return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
}

function parseISO(value) {
    if (!value) return null;
    const [year, month, day] = String(value).split('-').map(Number);
    if (!year || !month || !day) return null;
    return new Date(year, month - 1, day);
}

function formatDisplay(value) {
    const date = parseISO(value);
    if (!date) return '';
    return date.toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' });
}

function monthTitle(date) {
    return date.toLocaleDateString('id-ID', { month: 'long', year: 'numeric' });
}

function buildMonthDays(viewDate) {
    const year = viewDate.getFullYear();
    const month = viewDate.getMonth();
    const firstDay = new Date(year, month, 1);
    const mondayIndex = (firstDay.getDay() + 6) % 7;
    const start = new Date(year, month, 1 - mondayIndex);

    return Array.from({ length: 42 }, (_, index) => {
        const date = new Date(start);
        date.setDate(start.getDate() + index);
        return date;
    });
}

function isBeforeMin(date, min) {
    const minDate = parseISO(min);
    return minDate ? toISO(date) < toISO(minDate) : false;
}

function isAfterMax(date, max) {
    const maxDate = parseISO(max);
    return maxDate ? toISO(date) > toISO(maxDate) : false;
}

export default function DatePicker({
    name = 'date',
    id,
    label = 'Tanggal',
    value,
    defaultValue = '',
    placeholder = 'Pilih tanggal',
    required = false,
    min,
    max,
    onChange,
}) {
    const reactId = useId();
    const inputId = id || `cm-date-${reactId}`;
    const rootRef = useRef(null);
    const [open, setOpen] = useState(false);
    const [internalValue, setInternalValue] = useState(defaultValue || value || '');
    const selectedValue = value ?? internalValue;
    const hasSelectedValue = selectedValue !== null && selectedValue !== undefined && String(selectedValue).trim() !== '';
    const selectedDate = parseISO(selectedValue);
    const [viewDate, setViewDate] = useState(selectedDate || new Date());

    const days = useMemo(() => buildMonthDays(viewDate), [viewDate]);
    const todayIso = toISO(new Date());

    useEffect(() => {
        const handlePointerDown = (event) => {
            if (!rootRef.current?.contains(event.target)) setOpen(false);
        };

        const handleKeyDown = (event) => {
            if (event.key === 'Escape') setOpen(false);
        };

        document.addEventListener('pointerdown', handlePointerDown);
        document.addEventListener('keydown', handleKeyDown);

        return () => {
            document.removeEventListener('pointerdown', handlePointerDown);
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, []);

    const moveMonth = (amount) => {
        setViewDate((current) => new Date(current.getFullYear(), current.getMonth() + amount, 1));
    };

    const selectDate = (date) => {
        const nextValue = toISO(date);
        setInternalValue(nextValue);
        setViewDate(date);
        setOpen(false);
        onChange?.(nextValue, date);
    };

    return (
        <div ref={rootRef} className="cm-react-field cm-field-dropdown">
            <label htmlFor={inputId} className="cm-label">{label}</label>

            <button
                id={inputId}
                type="button"
                onClick={() => setOpen((value) => !value)}
                className={`cm-fancy-input ${open ? 'cm-fancy-input-open' : ''}`}
                aria-haspopup="dialog"
                aria-expanded={open}
            >
                <span className="cm-picker-icon" aria-hidden="true">📅</span>
                <span className="min-w-0 flex-1 text-left">
                    <span className={`block truncate font-black ${hasSelectedValue ? 'text-[var(--cm-text)]' : 'text-[var(--cm-muted)]'}`}>
                        {hasSelectedValue ? formatDisplay(selectedValue) : placeholder}
                    </span>
                    <span className="mt-0.5 block truncate text-xs font-bold text-[var(--cm-subtle)]">
                        {hasSelectedValue ? 'Tanggal sudah dipilih' : 'Klik untuk pilih tanggal'}
                    </span>
                </span>
                <span className="cm-dropdown-chev" aria-hidden="true">
                    <svg viewBox="0 0 20 20" fill="none">
                        <path d="M5.5 7.5L10 12l4.5-4.5" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </span>
            </button>

            <input type="hidden" name={name} value={selectedValue} />
            {required && (
                <input tabIndex={-1} aria-hidden="true" required value={selectedValue} onChange={() => {}} className="cm-validation-proxy" />
            )}

            <div className={`cm-picker-popover ${open ? 'cm-picker-popover-open' : ''}`} role="dialog" aria-label="Pilih tanggal">
                <div className="mb-3 flex items-center justify-between gap-3">
                    <button type="button" onClick={() => moveMonth(-1)} className="cm-mini-button">‹</button>
                    <b className="text-sm capitalize text-[var(--cm-text)]">{monthTitle(viewDate)}</b>
                    <button type="button" onClick={() => moveMonth(1)} className="cm-mini-button">›</button>
                </div>

                <div className="grid grid-cols-7 gap-1.5 text-center text-[11px] font-black uppercase tracking-[0.16em] text-[var(--cm-subtle)]">
                    {DAYS.map((day) => <span key={day}>{day}</span>)}
                </div>

                <div className="mt-2 grid grid-cols-7 gap-1.5">
                    {days.map((date) => {
                        const iso = toISO(date);
                        const isCurrentMonth = date.getMonth() === viewDate.getMonth();
                        const disabled = isBeforeMin(date, min) || isAfterMax(date, max);
                        const active = iso === selectedValue;
                        const today = iso === todayIso;

                        return (
                            <button
                                key={iso}
                                type="button"
                                disabled={disabled}
                                onClick={() => selectDate(date)}
                                className={`cm-calendar-day ${!isCurrentMonth ? 'cm-calendar-day-muted' : ''} ${today ? 'cm-calendar-day-today' : ''} ${active ? 'cm-calendar-day-active' : ''}`}
                            >
                                {date.getDate()}
                            </button>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
