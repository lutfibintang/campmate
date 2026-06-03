import React, { useEffect, useId, useRef, useState } from 'react';

function pad(value) {
    return String(value).padStart(2, '0');
}

function clamp(number, min, max) {
    return Math.min(max, Math.max(min, number));
}

function parseTime(value) {
    const [rawHour, rawMinute] = String(value || '').split(':').map(Number);
    const hasHour = Number.isFinite(rawHour);
    const hasMinute = Number.isFinite(rawMinute);
    const hour24 = hasHour ? clamp(rawHour, 0, 23) : null;
    const minute = hasMinute ? clamp(rawMinute, 0, 59) : null;

    if (hour24 === null) {
        return {
            hour24: null,
            hour12: null,
            minute: minute === null ? null : pad(minute),
            period: 'AM',
        };
    }

    const period = hour24 >= 12 ? 'PM' : 'AM';
    const hour12Number = hour24 % 12 || 12;

    return {
        hour24: pad(hour24),
        hour12: String(hour12Number),
        minute: minute === null ? '00' : pad(minute),
        period,
    };
}

function buildTime(hour12, minute, period) {
    if (!hour12 || minute === null || minute === '' || !period) return '';

    const hourNumber = clamp(Number(hour12), 1, 12);
    const minuteNumber = clamp(Number(minute), 0, 59);
    let hour24 = hourNumber % 12;

    if (period === 'PM') hour24 += 12;

    return `${pad(hour24)}:${pad(minuteNumber)}`;
}

function formatTime(value) {
    const parsed = parseTime(value);
    if (!parsed.hour12 || parsed.minute === null) return '';
    return `${parsed.hour12}:${parsed.minute} ${parsed.period}`;
}

const HOURS_12 = Array.from({ length: 12 }, (_, index) => String(index + 1));
const MINUTES = Array.from({ length: 60 }, (_, index) => pad(index));
const PERIODS = ['AM', 'PM'];

export default function TimePicker({
    name = 'time',
    id,
    label = 'Jam',
    value,
    defaultValue = '',
    placeholder = 'Pilih jam',
    required = false,
    onChange,
}) {
    const reactId = useId();
    const inputId = id || `cm-time-${reactId}`;
    const rootRef = useRef(null);
    const [open, setOpen] = useState(false);
    const [internalValue, setInternalValue] = useState(defaultValue || value || '');
    const selectedValue = value ?? internalValue;
    const hasSelectedValue = selectedValue !== null && selectedValue !== undefined && String(selectedValue).trim() !== '';
    const parsed = parseTime(selectedValue);
    const [draftHour, setDraftHour] = useState(parsed.hour12 ?? '8');
    const [draftMinute, setDraftMinute] = useState(parsed.minute ?? '00');
    const [draftPeriod, setDraftPeriod] = useState(parsed.period ?? 'AM');

    useEffect(() => {
        const current = parseTime(selectedValue);
        if (current.hour12 !== null) setDraftHour(current.hour12);
        if (current.minute !== null) setDraftMinute(current.minute);
        if (current.period) setDraftPeriod(current.period);
    }, [selectedValue]);

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

    const commitTime = (nextHour = draftHour, nextMinute = draftMinute, nextPeriod = draftPeriod, shouldClose = false) => {
        const nextValue = buildTime(nextHour, nextMinute, nextPeriod);
        setInternalValue(nextValue);
        onChange?.(nextValue);
        if (shouldClose) setOpen(false);
    };

    const chooseHour = (hour) => {
        setDraftHour(hour);
        commitTime(hour, draftMinute, draftPeriod, false);
    };

    const chooseMinute = (minute) => {
        setDraftMinute(minute);
        commitTime(draftHour, minute, draftPeriod, false);
    };

    const choosePeriod = (period) => {
        setDraftPeriod(period);
        commitTime(draftHour, draftMinute, period, false);
    };

    const previewValue = `${draftHour}:${pad(draftMinute)} ${draftPeriod}`;

    return (
        <div ref={rootRef} className="cm-react-field cm-field-dropdown">
            <label htmlFor={inputId} className="cm-label">{label}</label>

            <button
                id={inputId}
                type="button"
                onClick={() => setOpen((current) => !current)}
                className={`cm-fancy-input ${open ? 'cm-fancy-input-open' : ''}`}
                aria-haspopup="dialog"
                aria-expanded={open}
            >
                <span className="cm-picker-icon" aria-hidden="true">⏱</span>
                <span className="min-w-0 flex-1 text-left">
                    <span className={`block truncate font-black ${hasSelectedValue ? 'text-[var(--cm-text)]' : 'text-[var(--cm-muted)]'}`}>
                            {hasSelectedValue ? formatTime(selectedValue) : placeholder}
                        </span>
                        <span className="mt-0.5 block truncate text-xs font-bold text-[var(--cm-subtle)]">
                            {hasSelectedValue ? 'Jam sudah dipilih' : 'Pilih jam mulai/selesai'}
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

            <div className={`cm-time-popover cm-time-popover-wheel ${open ? 'cm-time-popover-open' : ''}`} role="dialog" aria-label="Pilih jam, menit, dan AM PM">
                <div className="cm-time-preview">
                    <span>Jam terpilih</span>
                    <b>{previewValue}</b>
                </div>

                <div className="cm-time-wheel-grid cm-time-wheel-grid-ampm">
                    <div>
                        <p className="cm-time-wheel-label">Jam</p>
                        <div className="cm-time-wheel-column cm-time-wheel-column-single cm-scrollbar-hidden" role="listbox" aria-label="Pilih jam">
                            {HOURS_12.map((hour) => (
                                <button
                                    key={hour}
                                    type="button"
                                    onClick={() => chooseHour(hour)}
                                    className={`cm-time-wheel-option ${draftHour === hour ? 'cm-time-wheel-option-active' : ''}`}
                                    role="option"
                                    aria-selected={draftHour === hour}
                                >
                                    {hour}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div>
                        <p className="cm-time-wheel-label">Menit</p>
                        <div className="cm-time-wheel-column cm-time-wheel-column-single cm-scrollbar-hidden" role="listbox" aria-label="Pilih menit">
                            {MINUTES.map((minute) => (
                                <button
                                    key={minute}
                                    type="button"
                                    onClick={() => chooseMinute(minute)}
                                    className={`cm-time-wheel-option ${draftMinute === minute ? 'cm-time-wheel-option-active' : ''}`}
                                    role="option"
                                    aria-selected={draftMinute === minute}
                                >
                                    {minute}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div>
                        <p className="cm-time-wheel-label">AM/PM</p>
                        <div className="cm-time-wheel-column cm-time-period-column" role="listbox" aria-label="Pilih AM atau PM">
                            {PERIODS.map((period) => (
                                <button
                                    key={period}
                                    type="button"
                                    onClick={() => choosePeriod(period)}
                                    className={`cm-time-wheel-option cm-time-period-option ${draftPeriod === period ? 'cm-time-wheel-option-active' : ''}`}
                                    role="option"
                                    aria-selected={draftPeriod === period}
                                >
                                    {period}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                <button type="button" onClick={() => commitTime(draftHour, draftMinute, draftPeriod, true)} className="cm-time-done">
                    Submit
                </button>
            </div>
        </div>
    );
}
