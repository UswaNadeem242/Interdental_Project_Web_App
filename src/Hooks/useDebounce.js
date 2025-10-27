import { useEffect, useRef, useState } from "react";

/**
 * useDebounce
 * Returns a debounced version of a value that updates only after the specified delay,
 * or a debounced callback (function mode).
 * 
 * @param {any|Function} value - The value to debounce or callback function to debounce
 * @param {number} delay - Delay in ms
 * @returns {any|Function} - Debounced value or debounced callback function
 */
export function useDebounce(value, delay) {
    // Always call useState to avoid conditional hook calls
    const [debouncedValue, setDebouncedValue] = useState(value);
    
    // Callback-debounce mode
    const isFunc = typeof value === "function";
    const callbackRef = useRef();
    callbackRef.current = value;

    const timeout = useRef();

    // Function mode
    function debouncedFunction(...args) {
        if (timeout.current) clearTimeout(timeout.current);
        timeout.current = setTimeout(() => {
            callbackRef.current(...args);
        }, delay);
    }

    useEffect(() => {
        if (!isFunc) {
            if (timeout.current) clearTimeout(timeout.current);
            timeout.current = setTimeout(() => {
                setDebouncedValue(value);
            }, delay);

            return () => {
                if (timeout.current) clearTimeout(timeout.current);
            };
        }
        // eslint-disable-next-line
    }, [value, delay]); // re-run when value changes for value-mode

    useEffect(() => {
        return () => {
            if (timeout.current) clearTimeout(timeout.current);
        };
    }, []);

    return isFunc ? debouncedFunction : debouncedValue;
}