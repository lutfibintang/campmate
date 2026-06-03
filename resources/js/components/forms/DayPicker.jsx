import React from 'react';
import SelectDropdown from './SelectDropdown';

const DEFAULT_DAY_OPTIONS = [
    { value: 'Senin', label: 'Senin', caption: 'Hari pertama jadwal mingguan', icon: 'M' },
    { value: 'Selasa', label: 'Selasa', caption: 'Hari kedua jadwal mingguan', icon: 'T' },
    { value: 'Rabu', label: 'Rabu', caption: 'Hari ketiga jadwal mingguan', icon: 'W' },
    { value: 'Kamis', label: 'Kamis', caption: 'Hari keempat jadwal mingguan', icon: 'T' },
    { value: 'Jumat', label: 'Jumat', caption: 'Hari kelima jadwal mingguan', icon: 'F' },
    { value: 'Sabtu', label: 'Sabtu', caption: 'Akhir pekan', icon: 'S' },
];

export default function DayPicker({
    name = 'day',
    label = 'Hari',
    placeholder = 'Pilih hari',
    options = DEFAULT_DAY_OPTIONS,
    ...props
}) {
    return (
        <SelectDropdown
            {...props}
            name={name}
            label={label}
            placeholder={placeholder}
            options={options}
        />
    );
}
