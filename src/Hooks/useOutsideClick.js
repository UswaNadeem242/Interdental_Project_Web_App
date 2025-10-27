import { useEffect, useRef } from 'react';

/**
 * Custom hook to detect clicks outside of a referenced element or data attribute selector
 * @param {Function} handler - Function to call when outside click is detected
 * @param {boolean} enabled - Whether the hook should be active (default: true)
 * @param {string} dataAttribute - Optional data attribute selector (e.g., 'data-filter-sidebar')
 * @returns {Object} - Ref object to attach to the element you want to monitor
 */
const useOutsideClick = (handler, enabled = true, dataAttribute = null) => {
  const ref = useRef(null);

  useEffect(() => {
    if (!enabled) return;

    const handleClickOutside = (event) => {
      let isOutside = true;
      
      // Check if the click is outside the referenced element
      if (ref.current && ref.current.contains(event.target)) {
        isOutside = false;
      }
      
      // Check if the click is outside the data attribute element
      if (dataAttribute) {
        const dataElement = document.querySelector(`[${dataAttribute}]`);
        if (dataElement && dataElement.contains(event.target)) {
          isOutside = false;
        }
      }
      
      if (isOutside) {
        handler(event);
      }
    };

    // Add event listener when component mounts
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside);

    // Cleanup event listener when component unmounts or dependencies change
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, [handler, enabled, dataAttribute]);

  return ref;
};

export default useOutsideClick;
