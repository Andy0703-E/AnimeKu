import { useEffect, useState } from 'react';

/**
 * Custom hook untuk debouncing nilai
 * @param {any} value - Nilai yang akan di-debounce
 * @param {number} delay - Delay dalam milliseconds (default: 500ms)
 * @returns {any} Nilai yang sudah di-debounce
 */
export function useDebounce(value, delay = 500) {
    const [debouncedValue, setDebouncedValue] = useState(value);

    useEffect(() => {
        // Set timeout untuk update nilai setelah delay
        const handler = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);

        // Cleanup function untuk cancel timeout jika value berubah sebelum delay selesai
        return () => {
            clearTimeout(handler);
        };
    }, [value, delay]);

    return debouncedValue;
}
