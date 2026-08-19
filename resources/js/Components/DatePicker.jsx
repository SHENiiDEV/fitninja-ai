import React, { forwardRef } from 'react';
import ReactDatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const CustomInput = forwardRef(({ value, onClick, placeholder }, ref) => (
    <button
        type="button"
        onClick={onClick}
        ref={ref}
        className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-white text-sm focus:border-emerald-500 focus:outline-none flex items-center justify-between text-left cursor-pointer hover:border-slate-700 transition"
    >
        <span className={value ? 'text-white' : 'text-slate-500'}>
            {value || placeholder || 'Select Date of Birth'}
        </span>
        <svg className="w-4 h-4 text-slate-400 shrink-0 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
    </button>
));

export default function DatePicker({ value, onChange, placeholder, error, className }) {
    const selectedDate = value ? new Date(value) : null;

    const handleDateChange = (date) => {
        if (!date) {
            onChange('');
            return;
        }
        // Format date to standard ISO string YYYY-MM-DD
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        onChange(`${year}-${month}-${day}`);
    };

    return (
        <div className={className}>
            <ReactDatePicker
                selected={selectedDate}
                onChange={handleDateChange}
                customInput={<CustomInput placeholder={placeholder} />}
                showMonthDropdown
                showYearDropdown
                dropdownMode="select"
                maxDate={new Date()}
                dateFormat="yyyy-MM-dd"
            />
        </div>
    );
}
